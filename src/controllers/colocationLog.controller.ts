import { Request, Response } from "express";
import { ColocationLogModel } from "../databases/mongodb/colocationLog.model";
import { SuccessResponse } from "../utils/success.utils";
import { ErrorResponse } from "../utils/errorSimple.utils";

export class ColocationLogController {
    async getColocationLogs(req: Request, res: Response): Promise<void> {
        try {
            const logs = await ColocationLogModel.find().sort({ timestamp: -1 });
            res.status(200).json(new SuccessResponse(200, "Colocation logs fetched successfully", logs));
        } catch (error: any) {
            res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Failed to fetch colocation logs"));
        }
    }
}