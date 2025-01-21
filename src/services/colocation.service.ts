import { ColocationRepository } from "../repositories/colocation.repository";
import { IColocation } from "../databases/mongodb/colocation.model";
import { ErrorResponse } from "../utils/errorSimple.utils";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { ColocationLogModel } from "../databases/mongodb/colocationLog.model";

export class ColocationService {
    private colocationRepository = new ColocationRepository();


    async listAllColocations(): Promise<IColocation[]> {
        return await this.colocationRepository.getAllColocations();
    }


    async listUserColocations(userId: string): Promise<IColocation[]> {
        return await this.colocationRepository.getUserColocations(userId);
    }


    async createColocation(data: ColocationToCreateDTO): Promise<IColocation> {
        const existingColocation = await this.colocationRepository.findByName(ColocationToCreateDTO.name);
        if (existingColocation) {
            throw new Error("Colocation already exists.");
        }
        const createdColocation = this.colocationRepository.createColocation(data);
        const savedColocation = await this.colocationRepository.save(createdColocation);

        const log = new ColocationLogModel({ name: savedColocation.name, action: "COLOCATION_CREATED", timestamp: new Date()} );
        await log.save();
        return savedColocation;
    }


    async getColocationById(colocationId: string): Promise<IColocation | null> {
        return await this.colocationRepository.getColocationInfo(colocationId);
    }


    async deactivateColocation(colocationId: string): Promise<IColocation | null> {
        try {
            const deletedColocation = await this.colocationRepository.deleteColocation(colocationId);
            if (!deletedColocation) {
                throw new ErrorResponse(404, "COLOCATION_NOT_FOUND", `Colocation with ID ${colocationId} not found.`);
            }
            return deletedColocation;
        } catch (error: any) {
            if (error.message.includes("Invalid ID format")) {
                throw new ErrorResponse(400, "INVALID_ID", "The provided colocation ID is not valid.");
            }
            throw error;
        }
    }
}