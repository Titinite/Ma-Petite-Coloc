import { IUser } from "../databases/mongodb/user.model";
import { UserLogModel } from "../databases/mongodb/userLog.model";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from "bcrypt";
import { ErrorResponse } from "../utils/errorSimple.utils";

export class UserService {
  private userRepository = new UserRepository();


  async getUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }


  async registerUser(userToCreate: UserToCreateDTO): Promise<IUser> {
    // ON CHECK SI L'UTILISATEUR EXISTE DÉJÀ DANS LE REPOSITORY
    const existingUser = await this.userRepository.findByEmail(userToCreate.email);
    if (existingUser) {
      throw new Error("Email already in use.");
    }

    // ON HASH LE MOT DE PASSE
    const password_hash = await bcrypt.hash(userToCreate.password, 10);

    // ON CRÉE L'UTILISATEUR
    const createdUser = this.userRepository.create({
      ...userToCreate,
      password: password_hash,
    });

    // ON SAUVEGARDE L'UTILISATEUR
    const savedUser = await this.userRepository.save(createdUser);

    // APPELER LE EMAIL SERVICE POUR ENVOYER UNE NOTIFICATION DE CREATION DE COMPTE A L'UTILISATEUR NOUVELLEMENT CRÉÉ
    const log = new UserLogModel({ email: savedUser.email, action: "USER_CREATED", timestamp: new Date()} );
    await log.save();

    // ON RETOURNE L'UTILISATEUR CRÉÉ
    return savedUser;
  }


  async deleteUser(userId: string): Promise<IUser | null> {
    try {
      const deletedUser = await this.userRepository.delete(userId);
      if (!deletedUser) {
        throw new ErrorResponse(404, "USER_NOT_FOUND", `User with ID ${userId} not found.`);
      }

      const log = new UserLogModel({ email: deletedUser.email, action: "USER_DELETED", timestamp: new Date()} );
      await log.save();

      return deletedUser;
    } catch (error: any) {
      if (error.message.includes("Invalid ID format")) {
        throw new ErrorResponse(400, "INVALID_ID", "The provided user ID is not valid.");
      }
      throw error;
    }
  }
}