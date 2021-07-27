const express = require("express");
const issueRouter = express.Router();
const User = require("../models/user");
const Issue = require("../models/issue");

// Get All Issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get issues by user id
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.user._id }, (err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Add new issue
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

// Delete issue
issueRouter.delete("/:issueId", (req, res, next) => {
  issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.user._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted issue: ${deletedIssue.title}`)
    }
  )
})

// Update issue
issueRouter.put("/:issueId", (req, res, next) => {
  console.log(req.body)
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, userId: req.body.userId },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      console.log(updatedIssue)
      return res.status(201).send(updatedIssue)
    }
  )
})

module.exports = issueRouter;