import express, { Request, Response, Router } from 'express';
import verifyTokenMiddleware from '../middleware/authVerification';
import { register, login, changePassword } from '../controllers/auth';
import { deleteUser, getUserData, getUsers, updateUser } from '../controllers/user';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blog";


const router: Router = express.Router();

// Auth Routes
router.post('/api/auth/signup', async (req: Request, res: Response) => {
  await register(req, res);
});
router.post('/api/auth/signin', async (req: Request, res: Response) => {
  await login(req, res);
});
router.post('/api/auth/resetpassword', verifyTokenMiddleware, async (req: Request, res: Response) => {
  await changePassword(req, res);
});

// User Routes
router.get('/api/user/get', verifyTokenMiddleware, async (req: Request, res: Response) => {
  await getUsers(req, res)
});
router.get('/api/user/me', verifyTokenMiddleware, async (req: Request, res: Response) => {
  await getUserData(req, res)
});
router.put('/api/user/update/:id', verifyTokenMiddleware, async (req: Request, res: Response) => {
  await updateUser(req, res)
});
router.delete('/api/user/delete/:id', verifyTokenMiddleware, async (req: Request, res: Response) => {
  await deleteUser(req, res)
});

// Blog Routes
router.post("/api/blog", verifyTokenMiddleware, async (req: Request, res: Response) => {
  await createBlog(req, res);
});

router.get("/api/blogs", async (req: Request, res: Response) => {
  await getBlogs(req, res);
});

router.get("/api/blog/:id", async (req: Request, res: Response) => {
  await getBlogById(req, res);
});

router.put("/api/blog/:id", verifyTokenMiddleware, async (req: Request, res: Response) => {
  await updateBlog(req, res);
});

router.delete("/api/blog/:id", verifyTokenMiddleware, async (req: Request, res: Response) => {
  await deleteBlog(req, res);
});

export default router;
