const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const generateFlamegraph = require('./flamegraph/generateFlamegraph');

const componentCount = 1000;
const iterations = 100;
const sampleSize = 50;

// "C:\Program Files (x86)\Google\Chrome\Application\chrome" --no-sandbox --js-flags=" --logfile=C:\git\perf\output\chrome.log --prof --jitless --no-opt" --user-data-dir="C:\git\perf\user" http://localhost:4322

// Current commands to run:
//    npm i -g flamebearer
//    rush build --to perf-test
//    apps/perf-test: npm start
//    npm run just perf-test

// TODO:
//  - ITERATE
//  - Verify results are repeatable and consistent
//    - 1 tab vs. 100 tabs simulateneously
//    - Eliminate or account for variance!
//    - Minimize scenarios.
//  - Tick Processing
//      - Flags:" https://github.com/v8/v8/blob/master/tools/tickprocessor.js"
//      - Use same version of V8 in Puppeteer to process ticks, somehow
//        - If not, need to remove "Testing v8 version different from logging version" from processed logs
//  - How will pass/fail be determined?
//  - What will be presented to PRs?
//    - Figure out tools to use for analysis (below)
//    - FlameBearer
//      - At least provide means to generate results locally
//      - Way to translate DLL calls to JS calls (kebabRules replace() for example)
//      - Unminify stack, at least OUFR portion.
//      - How to pipe log files to Flamebearer in Node?
//        - Do dependencies get installed in a way they can run on commandline on server?
//  - Use debug version of React to make results more readable? (Where time in React is being spent?)
//  - How will reference be run? Will have to host scenarios in deploy site somehow to run
//  - What role should React measurements play in results?
//  - Further ideas:
//    - Resizing page to determine reflow
//    - React cascading updates on initial component render.
//    - Monomorphic vs. Megamorphic Analysis:
//      - Sean Larkin said that switching from polymorphic to monomorphic was a webpack optimization.
//      - https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
//      - https://dzone.com/articles/impact-of-polymorphism-on-component-based-framewor

// TODO: tools?
// ProfView
//  https://github.com/v8/v8/tree/master/tools/profview
// ProfViz
//  https://thlorenz.com/v8-profiling/demos/profviz/profviz/profviz.html
// FlameBearer
//  https://github.com/mapbox/flamebearer
//  node --prof-process --preprocess -j isolate*.log | flamebearer
//  --preprocess: deliver JSON data
//  -j: Include JS VM ticks only

// TODO: other args?
// https://github.com/v8/v8/blob/master/src/flags/flag-definitions.h
//  --log-timer-events
//  --log-source-code

const urlFromDeployJob = process.env.BUILD_SOURCEBRANCH
  ? `http://fabricweb.z5.web.core.windows.net/pr-deploy-site/${process.env.BUILD_SOURCEBRANCH}/perf-test/`
  : // : 'http://localhost:4322/#/PrimaryButton';
    'http://localhost:4322/#/';
// const urlForMaster = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/perf-test/';
const urlForMaster = 'file:///C:/git/oufr-jg-issues/apps/pr-deploy-site/dist/perf-test/index.html';

const resultsPath = path.join(__dirname, '../../../apps/perf-test/dist');
const logPath = path.join(__dirname, '../../../apps/perf-test/logfiles');
const logFilePath = path.join(logPath, '/puppeteer.log');

module.exports = async function getPerfRegressions() {
  console.log('logFilePath: ' + logFilePath);
  if (!fs.existsSync(logPath)) {
    console.log('Making logfile directory...');
    fs.mkdirSync(logPath);
  }

  const logfileContents = fs.readdirSync(logPath);

  if (logfileContents.length > 0) {
    // TODO: keep error?
    // throw new Error(`Unexpected logfiles already present in ${logPath}`);
    console.log(`Unexpected logfiles already present in ${logPath}`);
    logfileContents.forEach(logFile => {
      const logFilePath = path.join(logPath, logFile);
      console.log(`Deleting ${logFilePath}`);
      fs.unlinkSync(logFilePath);
    });
  }

  const scenarios = fs
    .readdirSync('../src/scenarios')
    .filter(name => name.indexOf('scenarioList') < 0)
    .map(name => path.basename(name, '.tsx'));

  // TODO: need to find a way to associate logs with tabs/scenarios.
  // const extraV8Flags = '--log-source-code --log-timer-events';
  // const extraV8Flags = '--log-source-code';
  const extraV8Flags = '';
  const browser = await require('puppeteer').launch({
    headless: true,
    args: [
      '--flag-switches-begin',
      '--no-sandbox',
      '--prof',
      '--js-flags=--logfile=' + logFilePath + ' --prof --jitless --no-opt ' + extraV8Flags,
      '--flag-switches-end'
    ]
  });

  let nowPage = await browser.newPage();

  // TODO: need to decide whether it's ok to run tests in parallel. Variance from results seems to indicate
  // not, but then again other things outside of our control will also affect CPU load and results.
  // Run tests sequentially for now, at least as a chance of getting consistent results when run locally.
  const testResults = [];

  for (const scenario of scenarios) {
    const testResult = await runTest(browser, urlFromDeployJob, scenario, logPath);
    console.log(`testResult: ${testResult}`);
    testResults.push(testResult);
  }

  console.log('testResults: ' + JSON.stringify(testResults));

  // Clean up
  await browser.close();

  const logFiles = fs.readdirSync(logPath);

  // Serialize a bunch of async generation of flamegraphs
  for (const result of testResults) {
    await generateFlamegraph(result);
  }
};

async function runTest(browser, baseUrl, scenarioName, logPath) {
  const testUrl = baseUrl + scenarioName;
  const logFilesBefore = fs.readdirSync(logPath);

  const page = await browser.newPage();

  const logFilesAfter = fs.readdirSync(logPath);

  const testLogFile = arr_diff(logFilesBefore, logFilesAfter);

  console.log('testUrl: ' + testUrl);
  console.log('testLogFileName: ' + testLogFile);
  console.log('logFilesBefore: ' + logFilesBefore);
  console.log('logFilesAfter: ' + logFilesAfter);
  console.log('diff: ' + testLogFile);

  if (testLogFile.length !== 1) {
    // Is it safe to assume log file will always be present right after new page is created? throw error if not.
    throw new Error(`Could not determine log file for ${baseUrl}. Log files detected: [ ${testLogFile} ]`);
  }

  await page.goto(testUrl);

  await page.close();

  return {
    scenario: scenarioName,
    logfile: path.join(logPath, testLogFile[0])
  };
}

function processLogFile(logFile, outFile, generateFlamegraph, options = []) {
  console.log(`Processing ${logFile} -> ${outFile}`);

  var output = fs.createWriteStream(outFile);

  output.on('open', () => {
    cp.spawnSync('node', ['--prof-process', ...options, logFile], {
      cwd: path.dirname(logFile),
      stdio: ['pipe', output, 'pipe']
    });
  });
}

function arr_diff(a1, a2) {
  var a = [],
    diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
}
