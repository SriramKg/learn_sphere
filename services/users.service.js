const userModel = require("../database/Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerNewUser(body) {
    try {
        console.log(body);
      const { email, password_hash, profile_data, role } = body;
      if (!email || !password_hash || !profile_data || !role){ 
        return {
          message: "Please provide all required fields",
          status: 400,
        };
      }
      const existingUser = await userModel.findOne({ email });
      console.log(existingUser);
      if (existingUser) {
        return {
          message: "User already exists. Please login",
          status: 400,
        };
      }
      const hashedPassword = await bcrypt.hash(password_hash, 10);
      console.log(hashedPassword);
      const newUser = new userModel({
        email,
        password_hash: hashedPassword,
        profile_data,
        role,
      });
      console.log(newUser);
      await newUser.save();
      return {
        message:
          "User registered successfully " +
          newUser._id +
          ". Welcome " +newUser.profile_data.first_name+
          " you have successfully registered to the LearnSphere App",
        status: 201,
      };
    } catch (error) {
      throw new Error("User did not register ! " + error);
    }
  }

  async function loginAUser(body) {
    try {
      const secret = process.env.JWT_SECRET;
      const { email, password } = body;
      if (!email || !password) {
        return {
          message: "Please provide your email and password",
          status: 400,
        };
      }
      const findUser = await userModel.findOne({ email });
      if (!findUser) {
        return {
          message: "User does not exist. Please try again",
          status: 404,
        };
      }
      const validPassword = await bcrypt.compare(password, findUser.password_hash);
      if (!validPassword) {
        return {
          message: "Invalid password. Please try again",
          status: 401,
        };
      } else {
        const payload = {
          id: findUser._id,
          email: findUser.email,
          profile_data: findUser.profile_data,
          role: findUser.role,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "2h" });
        return {
          message:
            "User logged in successfully " +
            findUser._id +
            ". Welcome back " +
            findUser.profile_data.first_name,
          status: 200,
          token: token,
          role: findUser.role,
          id: findUser._id
        };
      }
    } catch (error) {
      throw new Error("User did not login ! " + error);
    }
  }
  

  module.exports = {registerNewUser,loginAUser};
  