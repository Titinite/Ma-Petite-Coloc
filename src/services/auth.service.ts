import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../databases/mongodb/user.model";
import { UserLogModel } from "../databases/mongodb/userLog.model";

export class AuthService {
    private userRepository = new UserRepository();

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: IUser }> {

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

        const log = new UserLogModel({ email: user.email, action: "USER_LOGED", timestamp: new Date()} );
        await log.save();

        return { accessToken, refreshToken, user };
    }


    async verifyRefreshToken(token: string): Promise<string> {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
            const user = await this.userRepository.findById(decoded.userId);
            if (!user) {
                throw new Error("User not found.");
        }
            return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        } catch (error) {
            throw new Error("Invalid or expired refresh token.");
        }
    }
}