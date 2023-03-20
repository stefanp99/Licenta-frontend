import { Supplier } from "../suppliers/supplier";

export interface Tolerance {
    id: number,
    supplier: Supplier,
    materialCode: string,
    qtyUpperLimit: number,
    qtyLowerLimit: number,
    dayUpperLimit: number,
    dayLowerLimit: number,
    plantId: string
}