import fs from 'fs';
import path from 'path';
import flamegrill, { CookResults, Scenarios, ScenarioConfig, CookResult } from 'flamegrill';
import scenarioIterations from '../src/scenarioIterations';
import { scenarioRenderTypes, DefaultRenderTypes } from '../src/scenarioRenderTypes';
import { argv } from '@fluentui/scripts';

// TODO: consolidate with newer version of fluent perf-test

// A high number of iterations are needed to get visualization of lower level calls that are infrequently hit by ticks.
// Wiki: https://github.com/microsoft/fluentui/wiki/Perf-Testing
const iterationsDefault = 5000;

/* eslint-disable @fluentui/max-len */
// TODO:
//  - Results Analysis
//    - If System/Framework is cutting out over half of overall time.. what is consuming the rest? How can that be identified for users?
//      - Is the case for Toggle.. but not SplitButton. Maybe it's normal for "ok" perf components?
//      - Text is not nearly as bad as Toggle with overall lower samples, though, so something in Toggle is more expensive in Framework.
//      - Even so, rationalize the time and what's consuming it, even if it's expected.
//    - Could compare percentage differences rather than absolute to negate variance. (see variance examples)
//      - Would also have to account for new or missing call hierarchies, which will affect overall percentages.
//    - Production vs. Debug Build Results
//      - Differences?
//    - System Calls
//      - Appear in CI but just appear as DLLs locally on Windows
//      - V8 bug?
//    - Ways to demonstrate improvement/regression:
//      - How could perf results of https://github.com/microsoft/fluentui/pull/9622 be more succintly seen and summarized?
//        - Some way of differing parts of the call graph that differ, from the root function (in this case filteredAssign)
//      - https://github.com/microsoft/fluentui/pull/9516
//      - https://github.com/microsoft/fluentui/pull/9548
//      - https://github.com/microsoft/fluentui/pull/9580
//      - https://github.com/microsoft/fluentui/pull/9432
//    - How will pass/fail be determined?
//      - What role should React measurements play in results?
//    - Tick Processing
//      - Flags: "https://github.com/v8/v8/blob/master/tools/tickprocessor.js"
//      - Use same version of V8 in Puppeteer to process ticks, somehow
//        - If not, need to remove "Testing v8 version different from logging version" from processed logs
//  - Results Presentation
//    - Use debug version of React to make results more readable? (Where time in React is being spent?)
//    - Add links to scenario implementations?
//    - Master trends for scenario results
//  - Perf
//    - Figure out what is causing huge PROCESSED log file size differences between Windows and Mac. (mac perf is pretty bad)
//      - Mac files have many thousands more platform functions defined.
//      - Way to remove? Any benefit to filtering out while streaming output? (Probably still as time consuming.)
//    - Single CPU usage
//      - Both perf testing and log processing seem to only use one CPU.
//      - Ways to scale / parallelize processing? Node limitation?
//      - Is already taking 10 minutes on CI. If users add scenarios it could get out of control.
//    - Options:
//      - Don't test master, just use posted results.
//        - If master has a "bad" variance, this result will be frozen. May be ok since it can happen on PRs too.
//      - Reduce default number iterations
//      - Allow varying iterations by scenario (for "problem" components like DocumentCardTitle)
//        - This may not be good if these components don't "stand out" as much with high samples.
//  - Modularize:
//    - Standard method for scenario implementation. Storybook?
//    - Would require way of delineating scenario execution, if separate logfiles can't be used for each.
//  - Options
//    - Options to run in development mode to see React stack?
//      - If nothing else should document ways that users can do it locally on wiki.
//    - Ways to test changes to packages that doesn't require rebuilding everything to perf-test?
//      - Add notes to wiki regarding requirements for changing other packages under test.
//      - Add webpack serve option with aliasing?
//    - Reference selection (local file, OUFR version, etc?)
//    - Watch mode for flamegraphs.
//      - Would require going back to webserve config mode?
//  - Variance
//    - Characterize variance
//    - Verify results are repeatable and consistent
//      - 1 tab vs. 100 tabs simulateneously
//      - Eliminate or account for variance!
//      - Minimize scenarios.
//  - Further ideas:
//    - Resizing page to determine reflow
//    - React cascading updates on initial component render.
//    - Monomorphic vs. Megamorphic Analysis:
//      - Sean Larkin said that switching from polymorphic to monomorphic was a webpack optimization.
//      - https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
//      - https://dzone.com/articles/impact-of-polymorphism-on-component-based-framewor

// TODO: other args?
// https://github.com/v8/v8/blob/master/src/flags/flag-definitions.h
//  --log-timer-events
//  --log-source-code

// Analysis
//  - Why is BaseComponent warnMutuallyExclusive appearing in flamegraphs?
//    - It appears the CPU is being consumed simply by calling warnMututallyExclusive.
//    - warnMutuallyExlusive impl is neutered but there still perf hit in setting up the args to call it.
//    - The "get" in flamegraphs is caused by "this.className" arg.
//    - makeAllSafe also consumes time just by having any component extend BaseComponent.
//    - Puppeteer.tracing
//      - Similar to using profiler in Chrome, does not show bottom-up analysis well
//      - Seems to break V8 profile logging output.
//        await page.tracing.start({ path: path.join(logPath, testLogFile[0] + '.trace') });
//        await page.goto(testUrl);
//        await page.tracing.stop();

// Hardcoded PR deploy URL for local testing
const DEPLOY_URL = 'fluentuipr.z22.web.core.windows.net';

const urlForDeployPath = process.env.DEPLOYURL
  ? `${process.env.DEPLOYURL}/perf-test`
  : 'file://' + path.resolve(__dirname, '../dist/');

// Temporarily comment out deploy site usage to speed up CI build time and support parallelization.
// At some point perf test should be broken out from CI default pipeline entirely and then can go back to using deploy site.
// For now, use local perf-test bundle so that perf-test job can run ASAP instead of waiting for the perf-test bundle to be deployed.
// const urlForDeploy = urlForDeployPath + '/index.html';
const urlForDeploy = 'file://' + path.resolve(__dirname, '../dist/') + '/index.html';

const targetPath = `heads/${process.env.SYSTEM_PULLREQUEST_TARGETBRANCH || 'master'}`;
const urlForMaster = `https://${process.env.DEPLOYHOST || DEPLOY_URL}/${targetPath}/perf-test/index.html`;

const outDir = path.join(__dirname, '../dist');
const tempDir = path.join(__dirname, '../logfiles');

export async function getPerfRegressions() {
  // For debugging, in case the environment variables used to generate these have unexpected values
  console.log(`urlForDeployPath: "${urlForDeployPath}"`);
  console.log(`urlForMaster: "${urlForMaster}"`);

  const iterationsArgv: number = argv().iterations;
  const iterationsArg = Number.isInteger(iterationsArgv) && iterationsArgv;

  const scenariosAvailable = fs
    .readdirSync(path.join(__dirname, '../src/scenarios'))
    .filter(name => name.indexOf('scenarioList') < 0)
    .map(name => path.basename(name, '.tsx'));

  const scenariosArgv: string = argv().scenarios;
  const scenariosArg = scenariosArgv?.split?.(',') || [];
  scenariosArg.forEach(scenario => {
    if (!scenariosAvailable.includes(scenario)) {
      throw new Error(`Invalid scenario: ${scenario}.`);
    }
  });

  const scenarioList = scenariosArg.length > 0 ? scenariosArg : scenariosAvailable;

  const scenarios: Scenarios = {};
  const scenarioSettings = {};
  scenarioList.forEach(scenarioName => {
    if (!scenariosAvailable.includes(scenarioName)) {
      throw new Error(`Invalid scenario: ${scenarioName}.`);
    }
    const iterations = iterationsArg || scenarioIterations[scenarioName] || iterationsDefault;
    const renderTypes = scenarioRenderTypes[scenarioName] || DefaultRenderTypes;

    renderTypes.forEach(renderType => {
      const scenarioKey = `${scenarioName}-${renderType}`;
      const testUrlParams = `?scenario=${scenarioName}&iterations=${iterations}&renderType=${renderType}`;

      scenarios[scenarioKey] = {
        baseline: `${urlForMaster}${testUrlParams}`,
        scenario: `${urlForDeploy}${testUrlParams}`,
      };

      scenarioSettings[scenarioKey] = {
        scenarioName,
        iterations,
        renderType,
      };
    });
  });

  console.log(`\nRunning scenarios:`);
  console.dir(scenarios);

  if (fs.existsSync(tempDir)) {
    const tempContents = fs.readdirSync(tempDir);

    if (tempContents.length > 0) {
      console.log(`Unexpected files already present in ${tempDir}`);
      tempContents.forEach(logFile => {
        const logFilePath = path.join(tempDir, logFile);
        console.log(`Deleting ${logFilePath}`);
        fs.unlinkSync(logFilePath);
      });
    }
  }

  const scenarioConfig: ScenarioConfig = {
    outDir,
    tempDir,
    pageActions: async (page, options) => {
      // Occasionally during our CI, page takes unexpected amount of time to navigate (unsure about the root cause).
      // Removing the timeout to avoid perf-test failures but be cautious about long test runs.
      page.setDefaultTimeout(0);

      await page.goto(options.url);
      await page.waitForSelector('#render-done');
    },
  };

  const scenarioResults: CookResults = await flamegrill.cook(scenarios, scenarioConfig);

  const comment = createReport(scenarioSettings, scenarioResults);

  // TODO: determine status according to perf numbers
  const status = 'success';

  console.log(`Perf evaluation status: ${status}`);
  console.log(`Writing comment to file:\n${comment}`);

  // Write results to file
  fs.writeFileSync(path.join(outDir, 'perfCounts.html'), comment);

  console.log(`##vso[task.setvariable variable=PerfCommentFilePath;]apps/perf-test/dist/perfCounts.html`);
  console.log(`##vso[task.setvariable variable=PerfCommentStatus;]${status}`);
}

/**
 * Create test summary based on test results.
 */
function createReport(scenarioSettings, testResults: CookResults) {
  const report = '## [Perf Analysis (`@fluentui/react`)](https://github.com/microsoft/fluentui/wiki/Perf-Testing)\n'

    // Show only significant changes by default.
    .concat(createScenarioTable(scenarioSettings, testResults, false))

    // Show all results in a collapsible table.
    .concat('<details><summary>All results</summary><p>')
    .concat(createScenarioTable(scenarioSettings, testResults, true))
    .concat('</p></details>\n\n');

  return report;
}

/**
 * Create a table of scenario results.
 * @param showAll Show only significant results by default.
 */
function createScenarioTable(scenarioSettings, testResults: CookResults, showAll: boolean) {
  const resultsToDisplay = Object.keys(testResults).filter(
    key =>
      showAll ||
      (testResults[key].analysis &&
        testResults[key].analysis.regression &&
        testResults[key].analysis.regression.isRegression),
  );

  if (resultsToDisplay.length === 0) {
    return '<p>No significant results to display.</p>';
  }

  const result = `
  <table>
  <tr>
    <th>Scenario</th>
    <th>Render type</th>
    <th>
      <a href="https://github.com/microsoft/fluentui/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">Master Ticks</a>
    </th>
    <th>
      <a href="https://github.com/microsoft/fluentui/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">PR Ticks</a>
    </th>
    <th>Iterations</th>
    <th>Status</th>
  </tr>`.concat(
    resultsToDisplay
      .map(key => {
        const testResult = testResults[key];
        const { scenarioName, iterations, renderType } = scenarioSettings[key] || {};

        return `<tr>
            <td>${scenarioName}</td>
            <td>${renderType}</td>
            ${getCell(testResult, true)}
            ${getCell(testResult, false)}
            <td>${iterations}</td>
            ${getRegression(testResult)}
           </tr>`;
      })
      .join('\n')
      .concat(`</table>`),
  );

  console.log('result: ' + result);

  return result;
}

/**
 * Helper that renders an output cell based on a test result.
 */
function getCell(testResult: CookResult, getBaseline: boolean) {
  let flamegraphFile = testResult.processed.output && testResult.processed.output.flamegraphFile;
  let errorFile = testResult.processed.error && testResult.processed.error.errorFile;
  let numTicks = testResult.analysis && testResult.analysis.numTicks;

  if (getBaseline) {
    const processedBaseline = testResult.processed.baseline;
    flamegraphFile = processedBaseline && processedBaseline.output && processedBaseline.output.flamegraphFile;
    errorFile = processedBaseline && processedBaseline.error && processedBaseline.error.errorFile;
    numTicks = testResult.analysis && testResult.analysis.baseline && testResult.analysis.baseline.numTicks;
  }

  const cell = errorFile
    ? `<a href="${urlForDeployPath}/${path.basename(errorFile)}">err</a>`
    : flamegraphFile
    ? `<a href="${urlForDeployPath}/${path.basename(flamegraphFile)}">${numTicks}</a>`
    : `n/a`;

  return `<td>${cell}</td>`;
}

/**
 * Helper that renders an output cell based on a test result.
 */
function getRegression(testResult: CookResult) {
  const cell =
    testResult.analysis && testResult.analysis.regression && testResult.analysis.regression.isRegression
      ? testResult.analysis.regression.regressionFile
        ? `<a href="${urlForDeployPath}/${path.basename(
            testResult.analysis.regression.regressionFile,
          )}">Possible regression</a>`
        : ''
      : '';

  return `<td>${cell}</td>`;
}
