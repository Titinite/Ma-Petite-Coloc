import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/user.repository";
import { ErrorResponse } from "../utils/error.utils";

const userRepository = new UserRepository();

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json(new ErrorResponse(401, "AUTH_ERROR", "No token provided"));
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "viscabarca");
        const user = await userRepository.findById(decoded.userId);
    
        if (!user) {
            return res.status(401).json(new ErrorResponse(401, "USER_NOT_FOUND", "User not found"))
        }
    
        const { password, ...userWithoutPassword } = user;
        (req as any).user = userWithoutPassword; 
        next();

    } catch (error) {
        return res.status(401).json(new ErrorResponse(401, "INVALID_TOKEN", "Invalid or expired token"))
    }
};