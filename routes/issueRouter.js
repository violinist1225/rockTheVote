const express = require("express");
const issueRouter = express.Router();
const User = require("../models/user");
const Issue = require("../models/issue");
const { update } = require("../models/user");

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
  req.body.userId = req.user._id
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
  Issue.findOneAndDelete(
    { _id: req.params.issueId, userId: req.user._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted issue!`)
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

//Likes
issueRouter.put("/likes/:issueId", (req, res, next) => {
 console.log(req.user._id)
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, userId: req.body.userId },
     //look up $inc mongo method, look up populate
    { new: false},
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      
      !updatedIssue.likers.includes(req.user._id)?
      Issue.findOneAndUpdate(
        { _id: req.params.issueId, userId: req.body.userId },
        {$inc: {likes: 1}, $push: {likers: req.user._id }  }, //look up $inc mongo method, look up populate
        { new: true },
        (err, updatedIssue) => {
          if(err){
            res.status(500)
            return next(err)
          } 
            return  res.status(201).send(updatedIssue)

        }
      ): 
       next(new Error("You already liked this issue sorry!"))
      
    }
  )
})


//Dislike
issueRouter.put("/dislikes/:issueId", (req, res, next) => {
 
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, userId: req.body.userId },
     //look up $inc mongo method
    { new: false },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      console.log(updatedIssue)
       

      !updatedIssue.dislikers.includes(req.user._id)?

      Issue.findOneAndUpdate(
        { _id: req.params.issueId, userId: req.body.userId },
        {$inc: {dislikes: 1}, $push: {dislikers: req.user._id }  }, // $inc mongo method. dislikers array is a property of Issue. $push is pushing req.user_id into dislikers array for this specific issue.
        { new: true },
        (err, updatedIssue) => {
          if(err){
            res.status(500)
            return next(err)
          } 
            return  res.status(201).send(updatedIssue)

        }
      )
      :
       next(new Error("You already liked this issue sorry!"))

    }
  )
})



module.exports = issueRouter;
