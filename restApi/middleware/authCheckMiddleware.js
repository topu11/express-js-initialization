const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const Secret = process.env.Secret;


const authCheckMiddleware = async (req, res, next) => {
    try {
        const token = await req.headers.authorization;
        //console.log(token);
        if (!token) {
            res.status(401).json({
                messge: "Auth token is required"
            })
        } else {
            const parsedToken = token.split(" ")[1];
            const decoded_data = jwt.verify(parsedToken, Secret)
            const userbyUserID = await UserModel.findOne({ "_id": decoded_data._id })
            //console.log(userbyUserID);
            if (userbyUserID) {
                next();
            } else {
                res.status(401).json({
                    messge: "Invalid Token"
                })
            }
        }

    } catch (error) {

        console.log(error)
        res.status(401).json({
            messge: "Something went wrong",
            error: error
        })
    }
}

module.exports = { authCheckMiddleware }