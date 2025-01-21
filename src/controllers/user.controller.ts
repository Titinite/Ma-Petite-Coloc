import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";
import { ErrorResponse } from "../utils/errorSimple.utils";
import { SuccessResponse } from "../utils/success.utils";

export class UserController {

  private userService = new UserService();
  private authService = new AuthService();


  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(new SuccessResponse(200, "Users fetched successfully", users));
    } catch (error: any) {
      res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Something went wrong while fetching users."));
    }
  };


  getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = (req as any).user;
      res.status(200).json(new SuccessResponse(200, "User profile fetched successfully", user._doc));
    } catch (error: any) {
      res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Something went wrong while fetching user profile."));
    }
  };


  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      await this.userService.deleteUser(userId);
      res.status(200).json(new SuccessResponse(200, `User with ID ${userId} successfully deleted`));
    } catch (error: any) {
      res.status(error.statusCode || 500).json(new ErrorResponse(error.statusCode || 500, error.errorCode || "INTERNAL_SERVER_ERROR", error.message || "Something went wrong while deleting user."));
    }
  };


  registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, { excludeExtraneousValues: true });
      const dtoErrors = await validate(userToCreateDTO);
      
      if (dtoErrors.length > 0) {
        console.log(dtoErrors);
        throw new Error("Invalid fields");
      }
    
    const user = await this.userService.registerUser(req.body);
    // appeler le logger service pour enregistrer QUI a créer un utilisateur (peut être un admin ou l'utilisateur lui même (?)  )

    const createdUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    
    res.status(201).json(new SuccessResponse(201, "User profile created successfully", [createdUser]));
    } catch (error: any) {
      res.status(400).json(new ErrorResponse(400, "REGISTER_FAILED", error.message));
    }
  };


  loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await this.authService.login(email, password);
      const loggedInUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });

      res.status(200).json({ accessToken, refreshToken, loggedInUser });
    } catch (error: any) {
      res.status(400).json(new ErrorResponse(400, "LOGIN_FAILED", error.message));
    }
  };


  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new Error("Refresh token is required.");
      }

      const newAccessToken = await this.authService.verifyRefreshToken(refreshToken);
      res.status(200).json(new SuccessResponse(200, "Token refreshed successfully", { accessToken: newAccessToken }));
    } catch (error: any) {
      res.status(401).json(new ErrorResponse(401, "INVALID_REFRESH_TOKEN", error.message));
    }
  }
}