const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }

const signupUser = async (req, res) => {
    const {firstName, lastName, email, password, role } = req.body

  try {
    const user = await User.signup(firstName, lastName, email, password, role )

    // create a token
    const token = createToken(user._id)

    res.status(200).json({lastName, email, token, role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

const signinUser = async (req, res) => {
    const {email, password} = req.body

    try {
      const user = await User.signin(email, password)
  
      // create a token
      const token = createToken(user._id)
      const lastName = user.lastName
      const role = user.role

      res.status(200).json({lastName, email, token, role})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
};

module.exports = {
  signupUser,
  signinUser,
};
