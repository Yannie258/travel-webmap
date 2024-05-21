const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// register
router.post('/register', async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //create new user
      const newUser = new User({
          userName: req.body.userName,
          email: req.body.email,
          password:  hashedPassword,
      })

      //save user and send response
      const user = await newUser.save();
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json('Register error: ' + err);
  }
})

// login
router.post('/login', async (req, res) => {
    try {
        //find user
        const user = await User.findOne({ userName: req.body.userName })
        if (!user) return res.status(400).json('User not found or Password is wrong');

        //validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json('User not found or Password is wrong');

        //send res
        res.status(200).json(user);
    
  } catch (err) {
    res.status(500).json('Login error', err)
  }
})

module.exports = router
