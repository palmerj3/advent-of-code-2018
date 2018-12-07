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

interface ShapeInSpace {
  id: number;
  left: number;
  width: number;
  top: number;
  height: number;
  valid: Boolean;
}

//#22 @ 510,93: 9x5
const INPUT_REGEX = /\#([0-9]+) \@ ([0-9]+),([0-9]+)\: ([0-9]+)x([0-9]+)/;

const inputDataTransformed: Array<ShapeInSpace> = INPUT_DATA.map(
  (line): ShapeInSpace => {
    const groups = line.match(INPUT_REGEX);

    if (!groups) {
      // return default invalid record
      return {
        id: 0,
        left: 0,
        width: 0,
        top: 0,
        height: 0,
        valid: false
      };
    }

    const id = parseInt(groups[1], 10);
    const left = parseInt(groups[2], 10);
    const top = parseInt(groups[3], 10);
    const width = parseInt(groups[4], 10);
    const height = parseInt(groups[5], 10);

    return {
      id,
      left: left + 1,
      width,
      top: top + 1,
      height,
      valid: true
    };
  }
).filter((line: ShapeInSpace) => line.valid); // filter out any invalid records

const coordinates = {};

// Plot shapes in space
inputDataTransformed.forEach((shape: ShapeInSpace) => {
  // Fill in all the coordinates this shape encompasses.

  for (let x = shape.left; x <= shape.left + shape.width - 1; x++) {
    for (let y = shape.top; y <= shape.top + shape.height - 1; y++) {
      const key = `${x},${y}`;

      if (!coordinates.hasOwnProperty(key)) {
        coordinates[key] = [shape.id];
      } else {
        coordinates[key].push(shape.id);
      }
    }
  }
});

// Iterate through shapes to see which do not overlap at all
let shapeIdWithNoOverlap = 0;
for (let i = 0; i < inputDataTransformed.length; i++) {
  const shape = inputDataTransformed[i];

  let hasOverlap = false;
  for (let x = shape.left; x <= shape.left + shape.width - 1; x++) {
    for (let y = shape.top; y <= shape.top + shape.height - 1; y++) {
      const key = `${x},${y}`;

      if (coordinates[key] && coordinates[key].length > 1) {
        hasOverlap = true;
      }
    }
  }

  if (hasOverlap === false) {
    shapeIdWithNoOverlap = shape.id;
    break;
  }
}

console.log(`Day 3-2 Answer: ${shapeIdWithNoOverlap}`);
