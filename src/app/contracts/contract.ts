import { Plant } from "../plants/plant";
import { Supplier } from "../suppliers/supplier";

export interface Contract {
    id: number,
    supplier: Supplier,
    materialCode: string,
    pricePerUnit: number,
    plant: Plant
}