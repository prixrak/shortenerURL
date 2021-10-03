import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {check, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
const authRouter = Router();

// api/auth/register
authRouter.post("/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimum password length 4 characters").isLength({ min: 4 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data"
        });
      }
      const {email, password} = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "This user already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({email, password: hashedPassword});

      await user.save();

      res.status(201).json({ message: "User created" });

    } catch(e) {
      res.status(500).json({message: "Something went wrong, please try again"})
    }
  }
);

// api/auth/login
authRouter.post("/login",  
  [
    check("email", "Please enter a valid email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data"
        });
      }

      const {email, password} = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }
      console.log("Finded");
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password, please try again" });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get("jwtSecret"),
        { expiresIn: "1h" } // lifetime of token - 1 hour
      );

      res.json({ token, userId: user.id });

    } catch (e) {
      res.status(500).json({ message: "Something went wrong, please try again" });
    }
  }
);
export default authRouter;