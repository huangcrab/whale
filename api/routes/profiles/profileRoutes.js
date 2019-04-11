"use strict";

const express = require("express");
const router = express.Router();

const profileService = require("./profileService");
const roleCheck = require("../../middleware/roleCheck");
const auth = require("../../middleware/auth");

//@route     GET api/profile/
//@desc      get current users profile
//@access    PRIVATE
router.get("/", auth, async (req, res) => {
  const errs = {};
  const profile = await profileService.findProfileById(req.user.id);

  if (!profile) {
    errs.noprofile = "There is no profile for this user";
    return res.status(404).json(errs);
  }
  res.json(profile);
});

//@route     GET api/profiles/
//@desc      get all profiles
//@access    PRIVATE AGENT ADMIN
router.get("/all", auth, roleCheck(["agent", "admin"]), async (req, res) => {
  try {
    const profiles = await profileService.findAllProfiles();
    if (!profiles) {
      errs.noprofile = "There are no profiles";
      return res.status(404).json(errs);
    }
    res.json(profiles);
  } catch (e) {
    console.log(e);
    throw e;
  }
});

exports.router = router;
