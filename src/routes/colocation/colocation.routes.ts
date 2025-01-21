import { Router } from "express";
import { ColocationController } from "../../controllers/colocation.controller";

const colocationController = new ColocationController();

const routes = Router();

// Route pour lister les colocations
routes.get("/", (req, res) => colocationController.getColocations(req, res));

// Route pour créer une colocation
routes.post("/", (req, res) => colocationController.createColocation(req, res));

// Route pour lister les colocations d'un utilisateur
routes.get("/user/:userId/colocations", (req, res) => colocationController.getUserColocations(req, res));

// Route pour obtenir les informations d'une colocation
routes.get("/:colocationId", (req, res) => colocationController.getColocationInfo(req, res));

// Route pour supprimer une colocation (en la désactivant)
routes.delete("/:colocationId", (req, res) => colocationController.deleteColocation(req, res));

// Route pour mettre à jour les informations d'une colocation
routes.put("/:colocationId", (req, res) => colocationController.updateColocation(req, res));

export default routes;