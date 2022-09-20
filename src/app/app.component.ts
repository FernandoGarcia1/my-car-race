import { Component } from '@angular/core';
import { Car } from './models/car.models';
import { Driver } from './models/driver.models';
import { Race } from './models/race.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-car-race';

  getRandom () : number{
    return  Math.round(Math.random() * (50 - 1) + 1);
  }  

  createCar(numberCar : number, color: string,driver? : Driver): Car{    
    return {numberCar,
      color,
      driver, 
      distance :0,
      status: 'stop',
      
      start(distanceStart:number): void{
        this.status = 'running';
        this.updateDistance(distanceStart);
      },

      stop(): void {
          this.status = 'stop';
      },

      updateDistance(distance: number):void {
          this.distance += distance
      },
    }
  }

  startRacing (race: Race): Race {
    const {cars, status} = race
    if (status != 'new'){        
        return race;
    }else{
      cars.forEach(car =>{
        const RANDOM = this.getRandom()                 
        car.start(RANDOM)        
      })
      race.status = 'in_process';
      return race;
    }
    
  }

  update(race: Race) : Race{
    const{distance: distanceRace, cars, laps} = race; 
      
    let carFinishedCount: number = 0;
    const totalDistance:number = distanceRace * laps;

    if(race.status != 'in_process'){      
      return race;
    }
    else{
      //actualizar distancia de los autos
      cars.forEach((car,index) => {

        const {distance:distanceCar} = car        
        if(distanceCar >= totalDistance){
          car.stop()          
          carFinishedCount++;
          car.updateDistance(50)
        }
        else{
          car.updateDistance(this.getRandom())
          if(car.distance > totalDistance)
            car.stop()
        }      
        cars[index] = car;
      });      
      if (carFinishedCount == cars.length){        
        race.status = 'finish'
      }
      return race;
    }
  }

  orderCars(cars: Car[]): Car[] {    
    cars.sort((a,b) => b.distance - a.distance)
    return cars;
  }

  showPosition(race: Race){    
    let {cars} = race;
    cars = this.orderCars(cars)  
    const podium :any = []
    cars.forEach((car, index) =>{
      podium.push({
        position: index+1,
        nationality: car.driver?.nationality,
        name: `${car.driver?.name} ${car.driver?.lastName}`,
        number_Car: car.numberCar,
        distance:`${car.distance}`
    })
    })        
   console.table(podium)
  }

  constructor(){    
    const ferDriver : Driver ={
      ID: 1,
      name : 'Fernando',
      lastName:'Garcia',
      nationality: 'Mexican'
    }
    const luisDriver : Driver ={
      ID: 1,
      name : 'Luis',
      lastName:'Dolores',
      nationality: 'USA'
    }
    const marioDriver : Driver ={
      ID: 1,
      name : 'Mario',
      lastName:'Medellin',
      nationality: 'Colombian'
    }
    const angelDriver : Driver ={
      ID: 1,
      name : 'Angel',
      lastName:'Rodriguez',
      nationality: 'Argentinian'
    }
    
    const car1 : Car= this.createCar(112,'red', ferDriver)
    const car2 : Car= this.createCar(134,'bue', luisDriver)
    const car3 : Car= this.createCar(621,'green', marioDriver)
    const car4 : Car= this.createCar(165,'white')
    const car5 : Car= this.createCar(887,'black', angelDriver)

    const CARS : Car[] = [car1, car2, car3, car4,car5]
    let carsInCompetition: Car[] = [];

    CARS.forEach(car =>{
      if(car.driver != null){
        carsInCompetition.push(car)
      }
    });
    
    
    let race : Race={
      cars: carsInCompetition,
      distance: 200,
      laps: 3,
      status:'new'
    }

    race = this.startRacing(race);
        
    
    let i=0;

    do{      
      this.showPosition(race);
      race=this.update(race);
      i++
    }while(race.status != 'finish')    
  
    const carsPodium : Car [] = this.orderCars(race.cars);
    console.log(
      `Ganador: ${carsPodium[0].driver?.name} ${carsPodium[0].driver?.lastName} Carro: ${carsPodium[0].numberCar}`
      )
    
  }
}


