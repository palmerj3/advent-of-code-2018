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

const stringToHash = (boxId: string): Object => {
  const hash = {};
  boxId.split("").forEach(c => {
    if (!hash.hasOwnProperty(c)) {
      hash[c] = 0;
    }

    hash[c]++;
  });

  return hash;
};

const filterForTwoOrThree = (boxId: string): Boolean => {
  const hash = stringToHash(boxId);

  let hasTwoOrThree = false;
  Object.keys(hash).forEach(k => {
    if (hash[k] === 2 || hash[k] === 3) {
      hasTwoOrThree = true;
    }
  });

  return hasTwoOrThree;
};

const collectionOfTwoAndThree = INPUT_DATA.filter(filterForTwoOrThree);

const getAnswer = (input: Array<string>): String => {
  let answer = "";

  for (let i = 0; i < input.length; i++) {
    const string1 = input[i];
    let strArray1 = string1.split("");

    for (let x = 1; x < input.length; x++) {
      const string2 = input[x];
      const strArray2 = string2.split("");

      let numMismatch = 0;
      let misMatchIndex = 0;
      strArray1.forEach((c, i) => {
        if (numMismatch <= 1) {
          if (strArray2[i] !== c) {
            numMismatch++;
            misMatchIndex = i;
          }
        }
      });

      if (numMismatch === 1) {
        strArray1.splice(misMatchIndex, 1);
        answer = strArray1.join("");
        return answer;
      }
    }
  }

  return answer;
};

console.log(`Day 2 answer: ${getAnswer(collectionOfTwoAndThree)}`);
