import { Router } from "express";
import { ColocationLogController } from "../../controllers/colocationLog.controller";

const routes = Router();

const colocationLogController = new ColocationLogController();

// Route pour afficher les logs concernant les colocations
routes.get("/", (req, res) => colocationLogController.getColocationLogs(req, res));

export default routes;