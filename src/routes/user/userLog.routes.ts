import { Router } from "express";
import { UserLogController } from "../../controllers/userLog.controller";

const router = Router();

const userLogController = new UserLogController();

router.get("/", (req, res) => userLogController.getUserLogs(req, res));

export default router;