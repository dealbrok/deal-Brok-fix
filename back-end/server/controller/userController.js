const { compare } = require('../helper/bcrypt')
const { User } = require('../models')
const { signToken, verifiedToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');
const { where } = require('sequelize');


class userController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body

      if (!username || !password) throw { name: 'InvalidLogin' }

      const loginUser = await User.findOne({
        where: {
          username
        }
      })

      if (!compare(password, loginUser.password)) throw { name: 'LoginError' }

      const payload = {
        id: loginUser.id,
        email: loginUser.email
      }

      const access_token = signToken(payload)
      res.status(200).json({
        access_token
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController