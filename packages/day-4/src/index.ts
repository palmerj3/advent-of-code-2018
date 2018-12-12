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

interface GuardEvent {
  guardId: number;
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  event: String;
  raw: String;
  valid: Boolean;
}

//[1518-09-20 00:43] falls asleep
const INPUT_REGEX = /\[([0-9]+)\-([0-9]+)\-([0-9]+) ([0-9]+)\:([0-9]+)\] ([^\n]*)/;
const GUARD_SHIFT_START_REGEX = /Guard \#([\d]*) begins shift/;

const MINUTES_ASLEEP_MAP = {};

for (let i: number = 0; i < 60; i++) {
  MINUTES_ASLEEP_MAP[i] = [];
}

let currentGuardId = 0;
let wasAsleep = false;
let sleepMinuteStart = 0;

const inputDataTransformed: Array<GuardEvent> = INPUT_DATA.map(
  (line): GuardEvent => {
    const groups = line.match(INPUT_REGEX);

    if (!groups) {
      // return default invalid record
      return {
        guardId: 0,
        date: {
          year: 0,
          month: 0,
          day: 0,
          hour: 0,
          minute: 0
        },
        event: "",
        raw: "",
        valid: false
      };
    }

    const year = parseInt(groups[1], 10);
    const month = parseInt(groups[2], 10);
    const day = parseInt(groups[3], 10);
    const hour = parseInt(groups[4], 10);
    const minute = parseInt(groups[5], 10);
    const event = String(groups[6]);

    return {
      guardId: 0, // default to 0 for now until we loop a second time
      date: {
        year,
        month,
        day,
        hour,
        minute
      },
      raw: line,
      event,
      valid: true
    };
  }
)
  .filter((line: GuardEvent) => line.valid) // filter out any invalid records
  .sort((a, b) => {
    const date1 = new Date(
      a.date.year,
      a.date.month,
      a.date.day,
      a.date.hour,
      a.date.minute
    );
    const date2 = new Date(
      b.date.year,
      b.date.month,
      b.date.day,
      b.date.hour,
      b.date.minute
    );

    // Sort chronologically by date ascending
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    }

    return 0;
  })
  .map((line: GuardEvent) => {
    // apply guard id to existing events now that list is sorted
    const groups = line.event.match(GUARD_SHIFT_START_REGEX);

    if (groups) {
      currentGuardId = parseInt(groups[1], 10);
    }

    return Object.assign(line, {
      guardId: currentGuardId
    });
  })
  .map((line: GuardEvent) => {
    if (line.event === "falls asleep") {
      wasAsleep = true;
      sleepMinuteStart = line.date.minute;
    } else {
      if (wasAsleep) {
        for (let i = sleepMinuteStart; i < line.date.minute; i++) {
          MINUTES_ASLEEP_MAP[i].push(line.guardId);
        }
        wasAsleep = false;
      }
    }

    return line;
  });

// Find guard with most minutes asleep
let guardIdsAsleep = [];
Object.keys(MINUTES_ASLEEP_MAP).forEach(m => {
  guardIdsAsleep = guardIdsAsleep.concat(MINUTES_ASLEEP_MAP[m]);
});

const GUARDS = {};
guardIdsAsleep.forEach((g: number) => {
  if (!GUARDS.hasOwnProperty(g)) {
    GUARDS[g] = 0;
  }

  GUARDS[g]++;
});

let MOST_SLEEPY_GUARD = {
  timeAsleep: 0,
  guardId: 0
};

Object.keys(GUARDS).forEach(g => {
  if (GUARDS[g] > MOST_SLEEPY_GUARD.timeAsleep) {
    MOST_SLEEPY_GUARD = {
      timeAsleep: GUARDS[g],
      guardId: Number(g)
    };
  }
});

// Determine most sleepy minute
let MOST_SLEEPY_MINUTE = {
  minute: -1,
  times: 0
};

Object.keys(MINUTES_ASLEEP_MAP).forEach(m => {
  const sleepyTimes = MINUTES_ASLEEP_MAP[m].filter(
    g => g === MOST_SLEEPY_GUARD.guardId
  ).length;

  if (sleepyTimes > MOST_SLEEPY_MINUTE.times) {
    MOST_SLEEPY_MINUTE = {
      minute: Number(m),
      times: sleepyTimes
    };
  }
});

// Print out the sorted raw lines
// inputDataTransformed.forEach(l => {
//   console.log(l.raw);
// });

console.log(MOST_SLEEPY_GUARD);
console.log(MOST_SLEEPY_MINUTE);

console.log(
  `Day 4 Answer: ${MOST_SLEEPY_GUARD.guardId * MOST_SLEEPY_MINUTE.minute}`
);
