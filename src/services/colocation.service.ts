import { ColocationRepository } from "../repositories/colocation.repository";
import { IColocation } from "../databases/mongodb/colocation.model";
import { ErrorResponse } from "../utils/error.utils";

export class ColocationService {
    private colocationRepository = new ColocationRepository();

    async listUserColocations(userId: string): Promise<IColocation[]> {
        return await this.colocationRepository.getUserColocations(userId);
    }


    async createColocation(data: Partial<IColocation>): Promise<IColocation> {
        try {
            const createdColocation = this.colocationRepository.createColocation(data);
            const savedColocation = await this.colocationRepository.save(createdColocation);
            return savedColocation;
        } catch (error) {
            throw new ErrorResponse(400, "COLLOCATION_CREATION_FAILED", "Failed to create colocation");
        }
    }


    async getColocationById(colocationId: string): Promise<IColocation | null> {
        return await this.colocationRepository.getColocationInfo(colocationId);
    }


    async deactivateColocation(colocationId: string): Promise<IColocation | null> {
        return await this.colocationRepository.deleteColocation(colocationId);
    }
}