import { Delivery } from "../deliveries/delivery"

export interface Deviation {
    id: number,
    type: string,
    delivery: Delivery,
    quantityDiff: number,
    timeDiff: number
}