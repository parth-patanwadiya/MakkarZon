class Car{
  brand;
  model;
  speed;
  isTrunkOpen;

  constructor(brand, model){
    this.brand = brand;
    this.model = model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo(){
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${ this.isTrunkOpen ? 'Open' : 'close' }`);
  }

  go(){
    if(this.speed === 200){
      return;
    }
    if(this.isTrunkOpen){
      return;
    }
    this.speed += 5;
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${ this.isTrunkOpen ? 'Open' : 'close' }`);
  }

  brake(){
    if(this.speed === 0){
      return;
    }
    this.speed -= 5;
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${ this.isTrunkOpen ? 'Open' : 'close' }`);
  }

  openTrunk(){
    if(this.speed > 0){
      console.log('car is moving, cannot open the trunk');
      return;
    }

    this.isTrunkOpen = true;
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${ this.isTrunkOpen ? 'Open' : 'close' }`);
  }

  closeTrunk(){
    this.isTrunkOpen = false;
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk: ${ this.isTrunkOpen ? 'Open' : 'close' }`);
  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

car1.displayInfo();
car1.openTrunk();
car1.closeTrunk();

class Racecar extends Car{

  acceleration;

  constructor(brand, model){
    super(brand, model);
    this.acceleration = 20;
  }

  go(){
    if(this.speed === 300){
      return;
    }
    this.speed += this.acceleration;
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
  }

  openTrunk(){
    console.log(`Race car does not have a trunk`);
  }

  closeTrunk(){
    console.log(`Race car does not have a trunk`);
  }
}


const car3 = new Racecar('McLaren', 'F1');

car3.go();
car3.openTrunk();