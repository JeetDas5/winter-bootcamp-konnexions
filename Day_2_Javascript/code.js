// Today is Day 2 of learning JavaScript!

// function demo() {
//   if (true) {
//     let a = 10;
//     var b = 20;

//     var b = 30;
//     // let a = 40

//     console.log("Inside block");
//     console.log("a ", a);
//     console.log("b ", b);
//   }
//   console.log("Outside block");
// //   console.log("a", a);
//   console.log("b", b);
// }

// demo();

//objects

// let user = new Object();
// user.name = "John";
// user.age = 25;
// user.city = "New York";

// console.log(user);

// // delete user.age
// console.log(user.city);
// console.log(user["city"]);

//array

// let arr = [];
// let fruits = ["Apple", "Banana", "Orange", "Grapes"];
// fruits.push("Mango");

// console.log(fruits);
//add in 2nd position
// fruits.splice(2, 2, "Pineapple");
// console.log(fruits);

// let nums = [20, 30, 10, 40, 23, 4];

// console.log(nums);

// nums.sort(function (a, b) {
//   return a - b;
// });
// console.log(nums.reverse());

//function

// function greetings(name){
//     console.log("Hello " + name);
// }

// const greetings = (name) => {
//   console.log("Hello " + name);
// };

// greetings("Jeet");

// function num(n, square) {
//   return square(n);
// }

// const square = (n) => n * n;

// console.log(num(5, square));

// async function add(a, b) {
//   return a + b;
// }

// add(2, 3)
//   .then((sum) => console.log(sum))
//   .catch((err) => console.log(err));

//async await

// async function fetchData() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts/2");
//   const data = await response.json();
//   console.log(data);
// }
// fetchData();



// let a = 10;

// a = "Jeet";

// console.log(a);
