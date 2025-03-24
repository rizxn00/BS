import { Request, Response } from "express";
import BlogModel from "../models/blogs";

/**
 * Create a new blog post
 */
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user?.id;

    if (!title || !content) {
      return res.status(400).json({ status: "error", message: "Title and content are required." });
    }

    const newBlog = await BlogModel.create({ title, content, authorId });

    return res.status(201).json({ status: "success", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

/**
 * Get all blog posts
 */
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogModel.find().populate("authorId", "username firstname lastname email");
    return res.status(200).json({ status: "success", blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

/**
 * Get a single blog post by ID
 */
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id).populate("authorId", "username firstname lastname email");

    if (!blog) {
      return res.status(404).json({ status: "error", message: "Blog not found" });
    }

    return res.status(200).json({ status: "success", blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

/**
 * Update a blog post by ID
 */
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const authorId = req.user?.id;

    const blog = await BlogModel.findOne({ _id: id, authorId });

    if (!blog) {
      return res.status(404).json({ status: "error", message: "Blog not found or unauthorized" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();

    return res.status(200).json({ status: "success", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

/**
 * Delete a blog post by ID
 */
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authorId = req.user?.id;

    const blog = await BlogModel.findOneAndDelete({ _id: id, authorId });

    if (!blog) {
      return res.status(404).json({ status: "error", message: "Blog not found or unauthorized" });
    }

    return res.status(200).json({ status: "success", message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
