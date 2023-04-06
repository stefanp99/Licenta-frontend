import { Contract } from "../contracts/contract";

export interface Delivery {
    id: number,
    expectedQuantity: number,
    status: string,
    dispatchDate: Date,
    deliveryDate: Date,
    contract: Contract,
    expectedDeliveryDate: Date,
    realQuantity: number,
    addDeliveryDate: Date
}