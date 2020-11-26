//What will the following code log?

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData()); 
console.log(thing.dupData());

// this code will log the following:
// 'ByeBye'
// "HelloHello"
// since first we are callind the statice method dupDate() on the class name
// then we are calling dupDate() instant method on an  instant of the class called thing