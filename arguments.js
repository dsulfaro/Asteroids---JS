//
// function sum(){
//   let array = Array.from(arguments);
//   let sum = 0;
//   array.forEach((num) => {
//     sum += num;
//   });
//   return sum;
// }
//
// // console.log(sum(...[1, 2, 3]));
//
// Function.prototype.myBind = function(){
//   let that = this;
//   let bind_args = Array.from(arguments);
//   return function(...extra_args){
//     let args = bind_args.concat(extra_args);
//     that.call(...args);
//   }
// }
//
//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// markov.says.myBind(breakfast)("meow", "a tree");
// // Breakfast says meow to a tree!
// // true
//
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true



// Cat.prototype.test = function() {
//   console.log(this);
//   return () => {
//     console.log(this);
//   }
// }
//
// const newCat = new Cat("newcat")
// let newcatfunction = newCat.test();
// newcatfunction();



function curriedSum(numArgs) {
  let numbers = [];

  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      let total = 0;
      numbers.forEach( (num) => {
        total += num
      })
      return total;
    } else {
      return _curriedSum;
    }
  }
}

// const sum = curriedSum(2);
// console.log(sum(5)(5));
// sum(5)(30)(20)(1); // => 56


Function.prototype.curry = function(numArgs){
  let collection1 = [];
  let that = this

  return function _curriedSum(num) {
    collection1.push(num);
    if (collection1.length === numArgs) {

      return that.apply(that, collection1);
    } else {
      return _curriedSum;
    }
  }
}

function sumThree(num1, num2, num3) {

  return num1 + num2 + num3;
}


// console.log(sumThree.curry(3)(4)(20)(6) ); // == 30
