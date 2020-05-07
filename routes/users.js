const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')


// @route    POST api/users
// @desc     Register a user
// @access  Public
router.post('/', [
     check('name', ' Please, enter name').not().isEmpty(),
     check('email', 'Please, enter a valid email'),
     check('password', 'Please, enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
     const errors = validationResult(req)
     if (!errors.isEmpty()) {
          return res.status(400).json({  errors: errors.array() })
     }

     const {name, email, password } = req.body;

     try {

          // check if the user exisit by the email
          let user = await User.findOne({ email: email })

          // if the user exsist
          if ( user ) {
               return res.status(400).json({ msg: 'User already exists'})
          }

          user = new User({
               name,
               email,
               password
          })

          // hash the password
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(password, salt)

          // save to DB
          await user.save();
          
          const paylod = {
               user: {
                    id: user.id
               }
          }

          // Generate a token to send it to the user once he register and login 
          jwt.sign(paylod, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token ) => {
               if ( err ) { throw err } 
               res.json({ token })
          })

     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error')
     }
})

// Create a model 

module.exports = router;