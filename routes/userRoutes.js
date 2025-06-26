const express = require('express')
const router = express.Router();
const User = require('../models/user')
const { jwtAuthMiddleWare, generateToken } = require('../jwt')


router.post('/signup', async (req, res ) => {
try {
  const data = req.body
  const newUser = new User(data)
  const response = await newUser.save()
  console.log('data saved')


  const payload = {
    id: response.id
  }
  const token = generateToken(payload)
  

  res.status(201).json({
    message: 'User signed up successfully',
    token: token
  })
} catch(err){
    res.status(500).json({error: 'singup failed'})
  }
})


router.post('/login', async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email : email});

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    const payload = {
      id: user.id
    }

    const token = generateToken(payload)

    res.status(200).json({
      message: 'login successful',
      token: token
    })
  } catch(err){
    res.status(500).json({error: 'Internal Server Error'})
  }
})

router.get('/profile', jwtAuthMiddleWare, async(req, res)=> {
  try{
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')

     if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({user});
  } catch(err){
    res.status(500).json({error: 'Internal server error'})
  }
})


router.put('/profile/password', jwtAuthMiddleWare, async (req, res) => {
  try{
  const userId = req.user.id;
  const {currentPassword, newPassword} = req.body

  const user = await User.findById(userId)

  if(!(await user.comparePassword(currentPassword))){
    return res.status(401).json({error: 'Invalid username or password'})
  }

  user.password = newPassword
  await user.save()

  return res.status(200).json({message: 'password updated', newPassword: newPassword})
} catch(err){
  console.log(err)
  res.status(500).json({error: 'Internal Server Error'})
}
})


module.exports = router;