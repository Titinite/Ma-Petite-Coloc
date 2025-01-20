import { Router } from 'express';
import { authenticateJWT } from "../../middlewares/auth.middleware";
import { UserController } from "../../controllers/user.controller";

const userController = new UserController();

const routes = Router();

routes.get("/", userController.getUsers);

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Route pour la connexion d'un utilisateur
routes.post("/login", userController.loginUser);

// Route pour la récupération du token d'authentification
routes.post("/refresh", (req, res) => userController.refreshToken(req, res));

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", authenticateJWT, userController.getUserProfile);

// Route pour supprimer un utilisateur
routes.delete("/delete/:userId", authenticateJWT, (req, res) => userController.deleteUser(req, res));

export default routes;