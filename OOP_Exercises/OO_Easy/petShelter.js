// Write the classes and methods that will be necessary to make this code run, and log the following output:

class Pet {
  constructor(speices, name) {
    this.speices = speices;
    this.name = name;
  }
  info() {
    return `a ${this.speices} named ${this.name}`;
  }
}
class Owner {
  constructor(name){
    this.name = name;
    this.pets = [];
  }
  addPet(pet) {
    this.pets.push(pet);
  }
  numberOfPets(){
    return this.pets.length;
  }
  printPets() {
    this.pets.forEach(pet => console.log(pet.info()));
  }
}
class Shelter {
  constructor() {
    this.owners = {};
  }

  adopt(owner, pet){
    owner.addPet(pet);
    if(!(this.owners.hasOwnProperty(owner.name))){
      this.owners[owner.name] = owner;
    }
  }
  printAdoptions(){
    for (let name in this.owners) {
      console.log(`${name} has adopted the following pets:`);
      this.owners[name].printPets();
      console.log("");
    }
  }
}


let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);



// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.

// The order of the output does not matter, so long as all of the information is presented.