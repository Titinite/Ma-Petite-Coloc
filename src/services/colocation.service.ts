import { ColocationModel } from "../databases/mongodb/colocation.model";
import { IColocation } from "../databases/mongodb/colocation.model";
import { ErrorResponse } from "../utils/error.utils";

export class ColocationService {


async getUserColocations(userId: string): Promise<IColocation[]> {
    return ColocationModel.find({ members: userId });
}


async createColocation(colocationData: any): Promise<IColocation> {
    const newColocation = new ColocationModel({ colocationData });
    return newColocation.save();
}


async getColocationInfo(colocationId: string): Promise<IColocation | null> {
    return ColocationModel.findById(colocationId);
}


async deleteColocation(colocationId: string): Promise<IColocation | null> {
    const colocation = await ColocationModel.findByIdAndUpdate(colocationId, { status: "inactive" }, { new: true });
    if (!colocation) {
    throw new ErrorResponse(404, "COLLOCATION_NOT_FOUND", "Colocation not found.");
    }
    return colocation;
}
}