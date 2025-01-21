import { Request, Response } from "express";
import { UserLogModel } from "../databases/mongodb/userLog.model";
import { SuccessResponse } from "../utils/success.utils";
import { ErrorResponse } from "../utils/errorSimple.utils";

export class UserLogController {
    async getUserLogs(req: Request, res: Response): Promise<void> {
        try {
            const logs = await UserLogModel.find().sort({ timestamp: -1 });
            res.status(200).json(new SuccessResponse(200, "Users logs fetched successfully", logs));
        } catch (error: any) {
            res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Failed to fetch users logs"));
        }
    }
}