import { ColocationRepository } from "../repositories/colocation.repository";
import { IColocation } from "../databases/mongodb/colocation.model";
import { ErrorResponse } from "../utils/error.utils";

export class ColocationService {
    private colocationRepository = new ColocationRepository();

    async listUserColocations(userId: string): Promise<IColocation[]> {
        return await this.colocationRepository.getUserColocations(userId);
    }


    async createColocation(data: Partial<IColocation>): Promise<IColocation> {
        const createdColocation = this.colocationRepository.createColocation(data);
        const savedColocation = await this.colocationRepository.save(createdColocation);
        return savedColocation;
    }


    async getColocationById(colocationId: string): Promise<IColocation | null> {
        return await this.colocationRepository.getColocationInfo(colocationId);
    }


    async deactivateColocation(colocationId: string): Promise<IColocation | null> {
        return await this.colocationRepository.deleteColocation(colocationId);
    }
}