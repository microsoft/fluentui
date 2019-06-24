// @ts-check

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const concat = require('concat-stream');
const flamebearer = require('./flamebearer');
const { Transform } = require('stream');

function jsonCleanUp() {
  return new Transform({
    transform: (data, _, next) => {
      if (data.indexOf('Testing v8 version different from logging version') > -1) {
        next();
        return;
      }
      next(null, data);
    }
  });
}

/**
 * Takes in a v8 or node generated profile log and turn into flamegraph with flamebearer
 *
 * @param {string} logfile Log file input.
 * @param {string} outfile Flamegraph output.
 */
function generateFlamegraph(logfile, outfile) {
  const preprocessProc = cp.spawn(process.execPath, ['--prof-process', '--preprocess', '-j', logfile]);

  const flamebearerPromise = new Promise((resolve, reject) => {
    const concatStream = concat(preprocessed => {
      const src = flamebearer(preprocessed);
      fs.writeFileSync(outfile, src);
      resolve();
    });

    preprocessProc.stdout.pipe(jsonCleanUp()).pipe(concatStream);
  });

  return flamebearerPromise;
}

module.exports = generateFlamegraph;

if (require.main === module) {
  generateFlamegraph(path.join(__dirname, './fixtures/sample.log'), 'test.html');
}
