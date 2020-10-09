const db = require('../configs/mongo')
const User = db.collection('users')
const {ObjectId} = require('mongodb')

class UserModel {
  static findAll = () => {
    return User.find().toArray()
  }

  static insertOne = (newUser) => {
    return User.insertOne(newUser)
  }

  static findById = (id) => {
    return User.findOne({_id: ObjectId(id)})
  }
}

module.exports = UserModel
