import { Request, Response } from "express";
import { ColocationService } from "../services/colocation.service";
import { ErrorResponse } from "../utils/errorSimple.utils";
import { ErrorFormResponse } from "../utils/errorForm.utils";
import { SuccessResponse } from "../utils/success.utils";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { ColocationPresenter } from "../types/colocation/presenters";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class ColocationController {

    private colocationService = new ColocationService();


    async getColocations(req: Request, res: Response): Promise<void> {
        try {
            const colocations = await this.colocationService.listAllColocations();
            res.status(200).json(new SuccessResponse(200, "Colocations fetched successfully", colocations));
        } catch (error: any) {
            res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", error.message || "Failed to fetch colocations"));
        }
    }


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
            const colocationToCreateDTO = plainToInstance(ColocationToCreateDTO, req.body, { excludeExtraneousValues: true });
            const dtoErrors = await validate(colocationToCreateDTO);

            if (dtoErrors.length > 0) {
                console.error(dtoErrors);
                throw new ErrorFormResponse("Create Colocation", dtoErrors, "Invalid fields");
            }

            const colocation = await this.colocationService.createColocation(req.body);
            const createdColocation = plainToInstance(ColocationPresenter, colocation, { excludeExtraneousValues: true });

            return res.status(201).json(new SuccessResponse(201, "Colocation created successfully", createdColocation));
        } catch (error: any) {
            return res.status(400).json(new ErrorResponse(400, "COLLOCATION_CREATION_FAILED", error.message || "Failed to create colocation"));
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


    async deleteColocation(req: Request, res: Response): Promise<any> {
        try {
            const colocationId = req.params.colocationId;
            const deletedColocation = await this.colocationService.deactivateColocation(colocationId);
            if (!deletedColocation) {
                return res.status(404).json(new ErrorResponse(404, "COLLOCATION_NOT_FOUND", "Colocation not found"));
            }
            res.status(200).json(new SuccessResponse(200, "Colocation deactivated successfully", deletedColocation));
        } catch (error: any) {
            res.status(500).json(new ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Failed to deactivate colocation"));
        }
    }
}