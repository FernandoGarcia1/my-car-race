import { Car } from "./car.models";

export interface Race { 
    cars: Car[],
    laps: number,
    distance: number,
    status: string
}
