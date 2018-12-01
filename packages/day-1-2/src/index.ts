const fs = require("fs");
const path = require("path");

const INPUT_PATH: string = path.join(process.cwd(), "data", "input");
const INPUT_DATA: string = fs
  .readFileSync(INPUT_PATH, { encoding: "utf8" })
  .split("\n");

const START_VALUE: number = 0;
const FREQUENCIES = new Set([0]);

let CURRENT_FREQUENCY: number = 0;

let SATISFIED: boolean = false;

while (SATISFIED === false) {
  for (let i = 0; i < INPUT_DATA.length; i++) {
    const currentValue = INPUT_DATA[i];
    if (currentValue) {
      const int: number = parseInt(currentValue.slice(1), 10);
      const operator: string = currentValue.slice(0, 1);
      const num: number = operator === "+" ? int : int * -1;

      CURRENT_FREQUENCY += num;

      if (FREQUENCIES.has(CURRENT_FREQUENCY)) {
        console.log(`Day 1-2 Answer: ${CURRENT_FREQUENCY}`);
        SATISFIED = true;
        break;
      }

      FREQUENCIES.add(CURRENT_FREQUENCY);
    }
  }
}
