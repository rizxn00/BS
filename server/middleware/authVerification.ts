import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

interface DecodedToken {
    [key: string]: any;
    username: string;
}

const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const decoded = jwt.verify(token, 'jwt-secret-key') as DecodedToken;
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
};

export default verifyTokenMiddleware;