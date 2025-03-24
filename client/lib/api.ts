import axios from "axios"
import type { Blog, User } from "@/lib/types"

const API_URL = "http://localhost:8000/api"

// 🔹 Get token from localStorage
const getAuthToken = () => localStorage.getItem("token")

// 🔹 Axios Instance with Authorization Header
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// 🔹 Attach Authorization Token Automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 🔹 Auth API
export async function loginUser(username: string, password: string): Promise<User> {
  const response = await apiClient.post<User>("/auth/signin", { username, password })
  const token = response.data.token
  if (token) {
    localStorage.setItem("token", token) // Store token
  }
  return response.data
}

export async function registerUser(userData: User): Promise<void> {
  await apiClient.post("/auth/signup", userData)
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem("token") 
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<{status:string, user:User}>("/user/me")
  return response.data.user
}

// 🔹 User API
export async function fetchUserProfile(): Promise<User> {
  const response = await apiClient.get<{ status:string, user:User}>("/user/me")
  return response.data.user
}

export async function updateUserProfile(userId: string, userData: Partial<User>): Promise<User> {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const response = await apiClient.put<{ status:string, user:User}>(`/user/update/${userId}`, userData)
  return response.data.user
}

// 🔹 Blog API
export async function fetchBlogs(): Promise<Blog[]> {
  const response = await apiClient.get<{ status: string; blogs: Blog[] }>("/blogs")
  return response.data.blogs
}

export async function createBlog(blogData: { title: string; content: string }): Promise<Blog> {
  const response = await apiClient.post<{ status: string; blog:Blog }>("/blog", blogData)
  return response.data.blog
}
