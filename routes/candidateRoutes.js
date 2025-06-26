const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const User = require('../models/user')
const { jwtAuthMiddleWare } = require('../jwt')

const checkAdmin = async (userId) => {
   try{
    const user = await User.findById(userId);
    return user.role === 'admin';
   } catch(err){
    return false;
   }
}

//get list of all candidates
router.get('/', async(req, res) => {
  try{
    const data = await Candidate.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

//get details about a candidate : role = open for everyone
router.get('/:candidateId', async (req, res) => {
  try{
    const candidateId = req.params.candidateId;
    const candidateFound = await Candidate.findById(candidateId);

    if(!candidateFound){
      return res.status(404).json({error: 'Candidate not found'});
    }

    return res.status(200).json(candidateFound)

  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
} )

//add a new candidate : role = "admin"
router.post('/', jwtAuthMiddleWare, async (req, res) => {

 try{
  
  if(!(await checkAdmin(req.user.id))){
    return res.status(403).json({message: "Only admins are allowed"})
  }

  const data = req.body;
  const newCandidateData = new Candidate(data);
  const response = await newCandidateData.save();
  console.log("new candidate created");
  res.status(200).json({response: response})
} catch(err){
  console.log(err);
  res.status(500).json({error: "Internal Server Error"});
}
} )

//update an existing candidate : role = "admin"
router.put('/:candidateId', jwtAuthMiddleWare, async (req, res) => {
  try{
    if(!(await checkAdmin(req.user.id))){
    return res.status(403).json({message: "Only admins are allowed"})
    }

    const candidateId = req.params.candidateId;
    const updatedCandidateData = req.body;

    const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
      new: true,
      runValidators: true,
    })

    if(!response){
      return res.status(404).json({error: "Candidate not found"})
    }

    console.log('Data Updated');
    res.status(200).json(response);
  } catch(err){
    return res.status(500).json({error: 'Internal Server Error'})
  }

})

//delete an existing candidate : role = "admin"
router.delete('/:candidateId', jwtAuthMiddleWare, async (req, res) => {

  try{
     if(!(await checkAdmin(req.user.id))){
    return res.status(403).json({message: "Only admins are allowed"})
    }

    const candidateId = req.params.candidateId;

    const response = await Candidate.findByIdAndDelete(candidateId);

    if(!response){
      return res.status(404).json({error: 'Candidate not found'});
    }

    console.log("Candidate Deleted");
    res.status(200).json({message: "Candidate deleted"})
  } catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;