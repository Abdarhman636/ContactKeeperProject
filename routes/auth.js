const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const auth = require('../medilewhere/auth')
const User = require('../models/User')

// @route    GET api/auth
// @desc     Get logged in user
// @access  Private
router.get('/', auth,  async (req, res) => {
     try {
          const user = await User.findById(req.user.id).select('-password')
          res.json(user)
     } catch (err) {
          console.error(err.message)
          res.status(500).send('Server error!!!')
     }
})

// @route    POST api/auth
// @desc     Auth user and get token
// @access  Public
router.post('/', [
     check('email', 'Please, enter enter your email').isEmail(),
     check('password', 'Please, enter your password...').exists()], 
     async (req, res) => {
          const errors = validationResult(req)
          if (!errors.isEmpty()) {
               return res.status(400).json({  errors: errors.array() })
          }

          const { email, password } = req.body

          try {
               let user = await User.findOne({ email })

               // if there's mo user with this email 
               if ( !user ) {
                    return res.status(400).json({ msg: 'there is something wrong with the email'})
               }

               // compair the password 
               const isMatch = await bcrypt.compare(password, user.password) //boollian

               if (!isMatch) {
                    return res.status(400).json({ msg: 'there is something wrong with the password'})
               }
               // if the password match 
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
               res.status(500).send('Server Error!!!')
          }
     })

module.exports = router;