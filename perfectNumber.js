const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isPerfect(n){
    let sum=0;
    for(let i=1;i<n;i++){
        if(n%i==0){
            sum+=i;
        }
    }
    if(sum==n){
        return "Perfect Number";
    }
    else if(sum>n){
        return "Abundant";
    }
    else{
        return "Deficient";
    }
}

rl.question("Enter a number: ", function (input) {
    const inputNumber = parseInt(input);
  
    if (inputNumber <= 0) {
      console.log("Invalid input. Please enter a valid number.");
    } else {
      const result = isPerfect(inputNumber);
      console.log(`The number ${inputNumber} is ${result}`);
    }
  
    rl.close();
  });

