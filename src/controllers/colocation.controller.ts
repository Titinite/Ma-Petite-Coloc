import { Request, Response } from "express";
import { ColocationService } from "../services/colocation.service";
import { ErrorResponse } from "../utils/error.utils";
import { SuccessResponse } from "../utils/success.utils";

export class ColocationController {

    private colocationService = new ColocationService();

    async getUserColocations(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const colocations = await this.colocationService.listUserColocations(userId);
            res.status(200).json(new SuccessResponse(200, "Colocations fetched successfully", colocations));
        } catch (error: any) {
            res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Failed to fetch colocations"));
        }
    }


    async createColocation(req: Request, res: Response): Promise<any> {
        try {
            const colocationData = req.body;
            const newColocation = await this.colocationService.createColocation(colocationData);
            console.log(newColocation);
            return res.status(201).json(new SuccessResponse(201, "Colocation created successfully", newColocation));
        } catch (error: any) {
            console.error(error); 
            return res.status(400).json(new ErrorResponse(400, "COLLOCATION_CREATION_FAILED", "Failed to create colocation"));
        }
    }


    async getColocationInfo(req: Request, res: Response): Promise<any> {
        try {
            const colocationId = req.params.colocationId;
            const colocation = await this.colocationService.getColocationById(colocationId);
            
            if (!colocation) {
                return res.status(404).json(new ErrorResponse(404, "COLLOCATION_NOT_FOUND", "Colocation not found"));
            }

            res.status(200).json(new SuccessResponse(200, "Colocation information fetched successfully", colocation));
        } catch (error: any) {
            res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Failed to fetch colocation info"));
        }
    }


    async deleteColocation(req: Request, res: Response): Promise<void> {
        try {
            const colocationId = req.params.colocationId;
            const deletedColocation = await this.colocationService.deactivateColocation(colocationId);
            res.status(200).json(new SuccessResponse(200, "Colocation deactivated successfully", deletedColocation));
        } catch (error: any) {
            res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Failed to deactivate colocation"));
        }
    }
}