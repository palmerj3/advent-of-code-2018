const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.join(path.dirname(__filename), 'input');
const INPUT_DATA = fs.readFileSync(INPUT_PATH, { encoding: 'utf8' }).split('\n');

const START_VALUE = 0;
const FREQUENCIES = new Set([0]);

let CURRENT_FREQUENCY = 0;

let SATISFIED = false;

while(SATISFIED === false) {
  for(let i = 0; i < INPUT_DATA.length; i++) {
    const currentValue = INPUT_DATA[i];
    if (currentValue) {
      const int = parseInt(currentValue.slice(1), 10);
      const operator = currentValue.slice(0,1);
      const num = operator === '+' ? int : int * -1;

      console.log(int, operator, num, CURRENT_FREQUENCY);

      CURRENT_FREQUENCY += num;

      if (FREQUENCIES.has(CURRENT_FREQUENCY)) {
        console.log(`REPEATED FREQUENCY: ${CURRENT_FREQUENCY}`);
        return;
      }

      FREQUENCIES.add(CURRENT_FREQUENCY);
    }
  }
}
