import { Request, Response } from "express";
import UserModel, { IUser } from "../models/users";

const sendErrorResponse = (res: Response, message: string, statusCode = 500) => {
  res.status(statusCode).json({ status: "error", message });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).json({ status: "success", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const user: IUser | null = await UserModel.findById(id).select("-password");;
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }
    return res.status(200).json({ status: "success", user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    sendErrorResponse(res, "Internal server error");
  }
};

// Update user details
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, firstname, lastname } = req.body;
  if (!id || !username || !email) {
    return sendErrorResponse(res, "Missing required fields", 400);
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username, email, firstname, lastname },
      { new: true }
    );

    if (!updatedUser) {
      return sendErrorResponse(res, "User not found", 404);
    }

    return res.status(200).json({ status: "success", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    sendErrorResponse(res, "Internal server error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return sendErrorResponse(res, "User not found", 404);
    }

    return res.status(200).json({ status: "success", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    sendErrorResponse(res, "Internal server error");
  }
};
