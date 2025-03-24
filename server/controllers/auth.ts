import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/users";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt-secret-key";

export const validateRequiredFields = (res: Response, fields: Record<string, any>, requiredFields: string[]) => {
  const missingFields = requiredFields.filter(field => !fields[field])

  if (missingFields.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
      missingFields, // Returns an array of missing fields
    })
  }

  return null
}


export const register = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, firstname, lastname, password } = req.body;

  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "User already exists" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ username, email, firstname, lastname, password: hashedPassword });

    return res.status(201).json({ status: "success", user: newUser });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Incorrect username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ status: "error", message: "Incorrect username or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    return res.status(200).json({
      status: "success",
      token,
      username: user.username,
      email: user.email,
    });

  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ status: "error", message: "Incorrect current password" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ status: "error", message: "New password cannot be the same as the current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.updateOne({ username }, { password: hashedPassword });

    return res.status(200).json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in changing password:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
