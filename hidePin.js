const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function convertPINToTexts(pin) {
    const binaryString = pin.toString(2);
    const binaryArray = binaryString.split('').reverse();
    const texts = [];

    let reverseOutput = false;

    for (let i = 0; i < binaryArray.length; i++) {
        const binaryDigit = binaryArray[i];
        
        if (binaryDigit === '1') {
            if (i === 0) {
                texts.push('pop');
            } else if (i === 1) {
                texts.push('double rip');
            } else if (i === 2) {
                texts.push('hide your mints');
            } else if (i === 3) {
                texts.push('fall');
            } else if (i === 4) {
                reverseOutput = true;
            }
        }
    }

    if (reverseOutput) {
        texts.reverse();
    }

    return texts;
}

rl.question('Enter a PIN: ', function(pin) {
    const parsedPin = parseInt(pin);
    const texts = convertPINToTexts(parsedPin);
    console.log(texts);
    rl.close();
});
