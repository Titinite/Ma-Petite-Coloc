import { Router } from "express";
import { ColocationController } from "../../controllers/colocation.controller";

const colocationController = new ColocationController();

const routes = Router();

// Route pour lister les colocations d'un utilisateur
routes.get("/user/:userId/colocations", colocationController.getUserColocations);

// Route pour créer une colocation
routes.post("/", colocationController.createColocation);

// Route pour obtenir les informations d'une colocation
routes.get("/:colocationId", colocationController.getColocationInfo);

// Route pour supprimer une colocation (en la désactivant)
routes.delete("/:colocationId", colocationController.deleteColocation);

export default routes;