"use strict";

const { model: User } = require("./userModel");

exports.findUserByEmail = async email => {
  return await User.findOne({ email });
};

exports.save = async user => {
  return await user.save();
};
