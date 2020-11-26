// Consider the following classes:
// Refactor these classes so they all use a common superclass, and inherit behavior as needed.

class Vehicle {
  constructor(make, model, Wheels) {
    this.make = make;
    this.model = model;
    this.Wheels = Wheels;
  }
  info() {
    return `${this.make} ${this.model}`
  }
  getWheels(){
    return this.Wheels;
  }
}

class Car extends Vehicle {
  constructor(make, model){
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle{
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}

let car1 = new Car('Toyota', 'Corolla');
console.log(car1.getWheels());

