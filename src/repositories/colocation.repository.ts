import { ColocationModel } from "../databases/mongodb/colocation.model";
import { IColocation } from "../databases/mongodb/colocation.model";
import { ErrorResponse } from "../utils/error.utils";

export class ColocationRepository {

    async getUserColocations(userId: string): Promise<IColocation[]> {
        return ColocationModel.find({ members: userId }).exec();
    }


    createColocation(colocationData: Partial<IColocation>): IColocation {
        return new ColocationModel(colocationData);
    }

    async save(colocation: IColocation): Promise<IColocation> {
        try {
            return await colocation.save();
        } catch (error) {
            console.error("Error saving colocation:", error);
            throw new Error("Failed to save colocation to database");
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
}