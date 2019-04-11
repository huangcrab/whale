"use strict";

const { model: Profile } = require("./profileModel");

exports.findProfileById = async id => {
  return await Profile.findOne({ user: id }).populate("user", [
    "name",
    "avatar"
  ]);
};

exports.findAllProfiles = async () => {
  return await Profile.find().populate("user", ["name", "avatar"]);
};
