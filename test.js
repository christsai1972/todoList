let language = [
  { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
  { name: "Java", rating: 8.6, popularity: 8.2, trending: "same" },
  { name: "C++", rating: 6.6, popularity: 7.7, trending: "same" },
  { name: "PHP", rating: 2.5, popularity: 4.7, trending: "decreasing" },
  { name: "JavaScript", rating: 8.5, popularity: 8.1, trending: "same" },
];

for (let i in language) {
  console.log(language[i].popularity);
}

let myName = "Chris Tsai";

for (let n of myName) {
  console.log(n);
}

for (let i in myName) {
  console.log(myName[i]);
}

function Person(name, age, height, weight) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.weight = weight;
  this.SayHi = function () {
    console.log(this.name + " says hi.");
  };
}

class CPerson {
  constructor(name, height, weight) {
    this.height = height;
    this.weight = weight;
    this.name = name;
  }
  sayHi() {
    console.log(this.name + " says hi.");
  }
}

class CSuperman extends CPerson {
  constructor(skill, weapon) {
    super("Superman", 190, 85);
    this.skill = skill;
    this.weapon = weapon;
  }
  ability() {
    console.log("I am " + this.skill);
  }

  attack() {
    console.log(this.weapon + " is fired.");
  }
}
let xPerson = new CPerson("Chris", 50, 189, 84);
xPerson.sayHi();

let xSuperman = new CSuperman("flying", "laser");

xSuperman.ability();
xSuperman.attack();
xSuperman.sayHi();
console.log(xSuperman);
