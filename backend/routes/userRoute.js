import authController from "./../controller/authController.js"
import express from "express";

const Router = express.Router();


Router.post("/signup",authController.signup);
Router.post("/login", authController.login);




export default Router;    


