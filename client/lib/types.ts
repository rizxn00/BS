export interface User {
  _id: string
  username: string
  email: string
  firstname: string
  lastname: string
  createdAt: string
  token?: string
}

export interface Blog {
  _id: string
  title: string
  content: string
  author: string
  authorId: Author
  addedAt: string
  modifiedAt: string
}

interface Author {
  username: string,
  email: string,
  firstname: string,
  lastname: string
}

