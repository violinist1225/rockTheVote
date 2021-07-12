const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken')


module.exports = authRouter;