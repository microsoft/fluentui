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
 * @param {{ scenario: string; logfile: string}} loginfo
 */
function generateFlamegraph(loginfo) {
  const flamebearerBin = require.resolve('flamebearer/bin/flamebearer');

  const { scenario, logfile } = loginfo;
  const preprocessProc = cp.spawn(process.execPath, ['--prof-process', '--preprocess', '-j', logfile]);

  const flamebearerPromise = new Promise((resolve, reject) => {
    const concatStream = concat(preprocessed => {
      const src = flamebearer(preprocessed);
      // TODO: write by scenario name or scenario dir? how will this be deployed?
      fs.writeFileSync(path.join(path.dirname(logfile), loginfo.scenario + '.html'), src);
      resolve();
    });

    preprocessProc.stdout.pipe(jsonCleanUp()).pipe(concatStream);
  });

  return flamebearerPromise;
}

module.exports = generateFlamegraph;

if (require.main === module) {
  generateFlamegraph({
    scenario: 'test',
    logfile: path.join(__dirname, './fixtures/sample.log')
  });
}
