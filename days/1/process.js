const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.join(path.dirname(__filename), 'input');
const INPUT_DATA = fs.readFileSync(INPUT_PATH, { encoding: 'utf8' }).split('\n');

const START_VALUE = 0;

const incrementReducer = (accumulator, currentValue) => {
  if (currentValue) {
    const int = parseInt(currentValue.slice(1), 10);
    const operator = currentValue.slice(0,1);
    const num = operator === '+' ? int : int * -1;

    return accumulator += num;
  }

  return accumulator;
}

console.log(INPUT_DATA.reduce(incrementReducer, START_VALUE));
