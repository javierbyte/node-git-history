const { spawn } = require("child_process");

const kSplitString = "&!!&";

const validArgs = [
  "H",
  "h",
  "T",
  "t",
  "P",
  "p",
  "an",
  "ae",
  "ad",
  "ar",
  "cn",
  "ce",
  "cd",
  "cr",
  "s"
];

function getCommits(path = ".", options) {
  return new Promise((resolve, reject) => {
    if (!options || !options.length || typeof options.constructor === Array) {
      reject("Options is required and must be an array");
      return;
    }

    const invalidArg = options.find(option => {
      return validArgs.indexOf(option) === -1;
    });

    if (invalidArg) {
      reject(`"${invalidArg}" is not a valid argument`);
    }

    try {
      process.chdir(path);
    } catch (err) {
      reject(err);
      return;
    }

    const gitProcess = spawn("git", [
      `log`,
      `--pretty=format:${options
        .map(option => "%" + option)
        .join(kSplitString)}`
    ]);

    let results = [];
    gitProcess.stdout.on("data", data => {
      const resultsToAppend = `${data}`
        .split("\n")
        .filter(resultRow => resultRow.length)
        .map(resultRow => {
          const splittedResultRow = resultRow.split(kSplitString);

          return options.reduce((res, option, optionIdx) => {
            res[option] = splittedResultRow[optionIdx];
            return res;
          }, {});
        });

      results = results.concat(resultsToAppend);
    });

    gitProcess.stderr.on("data", errMessage => {
      reject(`${errMessage}`);
      gitProcess.stdin.pause();
      gitProcess.kill();
    });

    gitProcess.on("close", code => {
      if (`${code}` !== "0") {
        reject(`Error on git ${code}`);
        return;
      }

      resolve(results);
    });
  });
}

module.exports = getCommits;
