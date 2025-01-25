import { ColocationModel } from "../databases/mongodb/colocation.model";
import { IColocation } from "../databases/mongodb/colocation.model";
import { ErrorResponse } from "../utils/errorSimple.utils";

export class ColocationRepository {


    async getAllColocations(): Promise<IColocation[]> {
        return ColocationModel.find().exec();
    }


    async getUserColocations(userId: string): Promise<IColocation[]> {
        return ColocationModel.find({ owner: userId }).exec();
    }


    createColocation(colocationData: Partial<IColocation>): IColocation {
        return new ColocationModel(colocationData);
    }

    async save(colocation: IColocation): Promise<IColocation> {
        try {
            return await colocation.save();
        } catch (error: any) {;
            throw new ErrorResponse(400, "COLLOCATION_CREATION_FAILED", error.message || "Failed to save colocation");
        }
    }


    async getColocationInfo(colocationId: string): Promise<IColocation | null> {
        return ColocationModel.findById(colocationId).exec();
    }


    async deleteColocation(colocationId: string): Promise<IColocation | null> {
        const colocation = await ColocationModel.findByIdAndUpdate(colocationId, { status: "inactive" }, { new: true }).exec();
        if (!colocation) {
        throw new ErrorResponse(404, "COLLOCATION_NOT_FOUND", "Colocation not found.");
        }
        return colocation;
    }


    async findByName(name: string): Promise<IColocation | null> {
        return ColocationModel.findOne({ name });
    }


    async update(colocationId: string, updateData: Partial<IColocation>): Promise<IColocation> {
        const colocation = await ColocationModel.findById(colocationId);
        if (!colocation) {
            throw new ErrorResponse(404, "COLLOCATION_NOT_FOUND", "Colocation not found");
        }
        if (updateData.members) colocation.members = updateData.members;
        if (updateData.owner) colocation.owner = updateData.owner;
        await colocation.save();
        return colocation;
    }    
}