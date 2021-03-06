"use strict";

const tokenService = require("../utils/tokenService");
const { model: User } = require("../routes/users/userModel");
const userService = require("../routes/users/userService");

module.exports = async (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    next(new Error("unauthorized"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await tokenService.verify(token);

    req.user = decoded;
    next();
  } catch (e) {
    next(new Error("unauthorized"));
  }
};
