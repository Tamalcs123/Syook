const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function countStepsToOne(x) {
  let steps = 0;

  while (x !== 1) {
    if (x % 2 === 0) {
      x = x / 2;
    } else {
      x = 3 * x + 1;
    }
    steps++;
  }

  return steps;
}

rl.question("Enter a number: ", function (input) {
  const inputNumber = parseInt(input);

  if (inputNumber <= 0) {
    console.log("Invalid input. Please enter a valid number.");
  } else {
    const steps = countStepsToOne(inputNumber);
    console.log(`Number of steps to reach 1 from ${inputNumber} are ${steps}`);
  }

  rl.close();
});
