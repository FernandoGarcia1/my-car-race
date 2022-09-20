import { Driver } from "./driver.models"

export interface Car {
    numberCar : number,
    color: string
    driver? : Driver,
    distance: number,    
    status: string
    start(distance:number) : void,
    updateDistance(distance : number) : void,
    stop() : void
}