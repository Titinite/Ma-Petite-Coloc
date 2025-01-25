import { Router } from "express";
import { UserLogController } from "../../controllers/userLog.controller";

const routes = Router();

const userLogController = new UserLogController();

// Route pour les logs des modifications utilisateurs
routes.get("/", (req, res) => userLogController.getUserLogs(req, res));

export default routes;