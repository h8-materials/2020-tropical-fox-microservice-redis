const db = require("../configs/mongo");
const User = db.collection("users");

class UserModel {
  static findAll = () => {
    return User.find().toArray();
  };

  static insertOne = (newUser) => {
    return User.insertOne(newUser);
  };
}

module.exports = UserModel;
