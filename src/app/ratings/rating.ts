import { Supplier } from "../suppliers/supplier";

export interface Rating {
    id: number;
    supplier: Supplier;
    materialCode: string;
    qtyPercentageRating: number;
    qtyNrDevisRating: number;
    dayPercentageRating: number;
    dayNrDevisRating: number;
    totalNumberDeliveries: number;
    correctDeliveriesPercentage: number;
    qtyDeviationCurveRating: number;
    dayDeviationCurveRating: number;
    priceDeviationPercentage: number;
    averageNumberOfHoursToDeliver: number;
    distanceToPlant: number;
    plantId: number;
    averageLeadTimeInHours: number;
}