//You have the following classes.
//You need to modify the code so that this works:
// You are only allowed to write one new method to do this
const walkMixins = {
  walk : function (){
    return  `${this.name} ${this.gait()} forward`;
  }
}
class Person {
  constructor(name) {
    this.name = name;
  }
  gait() {
    return "strolls";
  }
}
Object.assign(Person.prototype, walkMixins);

class Cat {
  constructor(name) {
    this.name = name;
  }
  gait() {
    return "saunters";
  }
}
Object.assign(Cat.prototype, walkMixins);

class Cheetah {
  constructor(name) {
    this.name = name;
  }
  gait() {
    return "runs";
  }
}
Object.assign(Cheetah.prototype, walkMixins);


let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"

