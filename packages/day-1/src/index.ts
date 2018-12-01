const fs = require("fs");
const path = require("path");

const INPUT_PATH: string = path.join(
  path.dirname(__filename),
  "..",
  "data",
  "input"
);
const INPUT_DATA: Array<string> = fs
  .readFileSync(INPUT_PATH, { encoding: "utf8" })
  .split("\n");

const START_VALUE: number = 0;

const incrementReducer = (
  accumulator: number,
  currentValue: string
): number => {
  if (currentValue) {
    const int = parseInt(currentValue.slice(1), 10);
    const operator = currentValue.slice(0, 1);
    const num = operator === "+" ? int : int * -1;

    return (accumulator += num);
  }

  return accumulator;
};

const ANSWER = INPUT_DATA.reduce(incrementReducer, START_VALUE);
console.log(`Day 1 answer: ${ANSWER}`);
