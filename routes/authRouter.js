const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken')

//signup
authRouter.post("/signup", (req, res, next) => {
    console.log("IS REQ.BODY LOGGING?", req.body)
    console.log(User)
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) =>{
        if(err) {
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("That username is already taken, sorry!"))
        }
        const newUser = new User(req.body)
        console.log("NEW USER?", newUser)
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)  
            }
            //payload and secret .sign method provides 
            //toObject is mongoose method that converts to object
            console.log(savedUser)
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
                console.log("TOKEN USER?", token)
            console.log("SAVED USER?", savedUser)
            
            return res.status(201).send({token, user: savedUser })
        })
            
    })
});


//login

authRouter.post("/login", (req, res, next) =>{
    User.findOne({username: req.body.username.toLowerCase()}, (err,user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error("Username or password are incorrect"))

        }
        if(req.body.password !== user.password){
            res.status(403)
            return next(new Error("Username or password are incorrect"))
        }
        console.log(user)
        const token = jwt.sign(user.toObject(), process.env.SECRET)
            return res.status(200).send({token, user })
    })
})


module.exports = authRouter;