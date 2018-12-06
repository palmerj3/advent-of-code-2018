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

const filterForThree = (boxId: string): Boolean => {
  const hash = {};
  boxId.split("").forEach(c => {
    if (!hash.hasOwnProperty(c)) {
      hash[c] = 0;
    }

    hash[c]++;
  });

  let hasThree = false;
  Object.keys(hash).forEach(k => {
    if (hash[k] === 3) {
      hasThree = true;
    }
  });

  return hasThree;
};

const filterForTwo = (boxId: string): Boolean => {
  const hash = {};
  boxId.split("").forEach(c => {
    if (!hash.hasOwnProperty(c)) {
      hash[c] = 0;
    }

    hash[c]++;
  });

  let hasTwo = false;
  Object.keys(hash).forEach(k => {
    if (hash[k] === 2) {
      hasTwo = true;
    }
  });

  return hasTwo;
};

const numTwo = INPUT_DATA.filter(filterForTwo).length;
const numThree = INPUT_DATA.filter(filterForThree).length;

const ANSWER = numTwo * numThree;
console.log(`Day 2 answer: ${ANSWER}`);
