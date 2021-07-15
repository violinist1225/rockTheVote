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
        //presave hook will execute first before firing newUser.save below (confirm this)
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)  
            }
            //payload and secret .sign method provides 
            //toObject is mongoose method that converts to object
            const token = jwt.sign(savedUser.withoutPassword(),process.env.SECRET)
            return res.status(200).send({token, user: savedUser.withoutPassword() })
        })
            
    })
});


//login

authRouter.post("/login", (req, res, next) =>{
    User.find((err, thing) => console.log(thing))
    User.findOne({username: req.body.username.toLowerCase()}, (err,user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error("Username or password are incorrect"))

        }
    user.checkPassword(req.body.password, (err, isMatch) =>{
         if(err){
             res.status(403)
             return next(new Error("Username or password are incorrect"))
         }
         if(!isMatch) {
             res.status(403)
             return next(new Error("Username or password are incorrect"))
         }
         const token = jwt.sign(savedUser.withoutPassword(),process.env.SECRET)
             return res.status(200).send({token, user: user.withoutPassword() })
     })
 })
        
})


module.exports = authRouter;