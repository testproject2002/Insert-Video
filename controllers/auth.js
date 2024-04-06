import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import createError from '../error.js';
import jwt from 'jsonwebtoken';


export const signupController = async (req, res, next) => {
    try {
        // Generate salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create a new user instance with hashed password
        const newUser = new User({...req.body, password: hash});

        // Save user to the database
        await newUser.save();
        
        // Send success response
        res.status(200).send('User has been created');
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
}

export const signinController = async (req, res, next) => {
    try {
        // Find user by username
        const user = await User.findOne({name: req.body.name});
        
        // If user not found, return a 404 error
        if (!user) return next(createError(404, 'User not found'));

        // Compare passwords
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        
        // If passwords don't match, return a 400 error
        if (!isCorrect) return next(createError(400, 'Wrong credentials'));

        // If passwords match, generate JWT token
        const token = jwt.sign({id: user._id}, 'secretekey'); // Replace 'secretekey' with your actual secret key
        const {password,...others}=user._doc;
        // Set token as HTTP-only cookie
        res.cookie('access_token', token, {
            httpOnly: true
        });
        
        // Send user data as JSON response
        res.status(200).json(others);
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
}



