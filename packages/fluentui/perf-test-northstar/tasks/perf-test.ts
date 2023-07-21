import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import flamegrill, { CookResult, CookResults, ScenarioConfig, Scenarios } from 'flamegrill';
import { generateUrl } from '@fluentui/digest';
import { perfTestEnv, PerfRegressionConfig } from '@fluentui/scripts-tasks';

import { getFluentPerfRegressions } from './fluentPerfRegressions';

type ExtendedCookResult = CookResult & {
  extended: {
    kind: string;
    story: string;
    iterations: number;
    tpi?: number;
    filename?: number;
  };
};
type ExtendedCookResults = Record<string, ExtendedCookResult>;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// TODO:
//
// As much of this file should be absorbed into flamegrill as possible.
// Flamegrill knows all possible kinds and stories from digest. Could default to running tests against all.
// Embed iterations in stories as well as scenarios. That way they would apply for static tests as well.
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
// TODO: Fluent reporting is outside of this script so this code will probably be moved entirely on perf-test consolidation.
const urlForDeployPath = `file://${path.resolve(__dirname, '../dist/')}`;

const urlForDeploy = `${urlForDeployPath}/index.html`;
const defaultIterations = 1;

console.log(`__dirname: ${__dirname}`);

export async function getPerfRegressions(config: PerfRegressionConfig, baselineOnly = false) {
  const { outDir, tempDir, scenariosSrcDirPath, projectName, projectRootPath } = config;
  const projectRootDirectoryName = path.basename(projectRootPath);
  const projectEnvVars = perfTestEnv.EnvVariablesByProject[projectName];

  const targetPath = `heads/${perfTestEnv.SYSTEM_PULLREQUEST_TARGETBRANCH || 'master'}`;
  const urlForMaster = baselineOnly
    ? undefined
    : `https://${perfTestEnv.DEPLOYHOST}/${targetPath}/${projectRootDirectoryName}/index.html`;

  // For debugging, in case the environment variables used to generate these have unexpected values
  console.log(`urlForDeployPath: "${urlForDeployPath}"`);
  console.log(`urlForMaster: "${urlForMaster}"`);

  // TODO: support iteration/kind/story via commandline as in other perf-test script
  // TODO: can do this now that we have story information
  // TODO: align flamegrill terminology with CSF (story vs. scenario)
  const scenarios: Scenarios = {};
  const scenarioList: string[] = [];

  // TODO: can this get typing somehow? can't be imported since file is only available after build
  const test = require(scenariosSrcDirPath);
  const { stories } = test.default;

  console.log('stories:');
  console.dir(stories, { depth: null });

  Object.keys(stories).forEach(kindKey => {
    Object.keys(stories[kindKey])
      .filter(storyKey => typeof stories[kindKey][storyKey] === 'function')
      .forEach(storyKey => {
        const scenarioName = `${kindKey}.${storyKey}`;
        scenarioList.push(scenarioName);
        scenarios[scenarioName] = {
          scenario: generateUrl(urlForDeploy, kindKey, storyKey, getIterations(stories, kindKey, storyKey)),
          ...(!baselineOnly &&
            storyKey !== 'Fabric' && {
              // Optimization: skip baseline comparison for Fabric
              baseline: generateUrl(
                urlForMaster as string,
                kindKey,
                storyKey,
                getIterations(stories, kindKey, storyKey),
              ),
            }),
        };
      });
  });

  console.log(`\nRunning scenarios: ${scenarioList}\n`);

  if (!fs.existsSync(tempDir)) {
    console.log(`Making temp directory ${tempDir}...`);
    fs.mkdirSync(tempDir);
  }

  const tempContents = fs.readdirSync(tempDir);

  if (tempContents.length > 0) {
    console.log(`Unexpected files already present in ${tempDir}`);
    tempContents.forEach(logFile => {
      const logFilePath = path.join(tempDir, logFile);
      console.log(`Deleting ${logFilePath}`);
      fs.unlinkSync(logFilePath);
    });
  }

  const scenarioConfig: ScenarioConfig = {
    outDir,
    tempDir,
    pageActions: async (page, options) => {
      // Occasionally during our CI, page takes unexpected amount of time to navigate (unsure about the root cause).
      // Removing the timeout to avoid perf-test failures but be cautious about long test runs.
      page.setDefaultTimeout(0);

      await page.goto(options.url);
    },
  };
  const scenarioResults = await flamegrill.cook(scenarios, scenarioConfig);

  const extendedCookResults = extendCookResults(stories, scenarioResults);
  fs.writeFileSync(path.join(outDir, 'perfCounts.json'), JSON.stringify(extendedCookResults, null, 2));

  const comment = createReport(stories, extendedCookResults);

  // TODO: determine status according to perf numbers
  const status = 'success';

  console.log(`Perf evaluation status: ${status}`);

  // Write results to file
  fs.writeFileSync(path.join(outDir, 'perfCounts.html'), comment);

  console.log(`##vso[task.setvariable variable=${projectEnvVars.filePath};]${projectRootPath}/dist/perfCounts.html`);
  console.log(`##vso[task.setvariable variable=${projectEnvVars.status};]${status}`);
}

function extendCookResults(
  stories: { [x: string]: { [x: string]: any } },
  testResults: CookResults,
): ExtendedCookResults {
  return _.mapValues(testResults, (testResult, resultKey) => {
    const kind = getKindKey(resultKey);
    const story = getStoryKey(resultKey);
    const iterations = getIterations(stories, kind, story);
    const tpi = getTpiResult(testResults, stories, kind, story); // || 'n/a'

    return {
      ...testResult,
      extended: {
        kind,
        story,
        iterations,
        tpi,
        filename: stories[kind][story].filename,
      },
    };
  });
}

/**
 * Create test summary based on test results.
 *
 * @param {CookResults} testResults
 * @returns {string}
 */
function createReport(stories: any, testResults: ExtendedCookResults): string {
  // TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
  // TODO: Fluent reporting is outside of this script so this code will probably be moved entirely on perf-test consolidation.
  // // Show only significant changes by default.
  // .concat(createScenarioTable(testResults, false))

  // // Show all results in a collapsible table.
  // .concat('<details><summary>All results</summary><p>')
  // .concat(createScenarioTable(testResults, true))
  // .concat('</p></details>');

  return getFluentPerfRegressions();
}

/**
 * Create a table of scenario results.
 *
 * @param {CookResults} testResults
 * @param {boolean} showAll Show only significant results by default.
 * @returns {string}
 */
function createScenarioTable(stories: any, testResults: ExtendedCookResults, showAll: boolean): string {
  const resultsToDisplay = Object.keys(testResults)
    .filter(key => showAll || testResults[key]?.analysis?.regression?.isRegression)
    .filter(testResultKey => getStoryKey(testResultKey) !== 'Fabric')
    .sort();

  if (resultsToDisplay.length === 0) {
    return '<p>No significant results to display.</p>';
  }

  // TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
  // TODO: Fluent reporting is outside of this script so this code will probably be moved entirely on perf-test consolidation.
  // const result = `
  // <table>
  // <tr>
  //   <th>Scenario</th>
  //   <th>
  //     <a href="https://github.com/microsoft/fluentui/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">Master Ticks</a>
  //   </th>
  //   <th>
  //     <a href="https://github.com/microsoft/fluentui/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">PR Ticks</a>
  //   </th>
  //   <th>Status</th>
  // </tr>`.concat(
  //   resultsToDisplay
  //     .map(key => {
  //       const testResult = testResults[key];

  //       return `<tr>
  //           <td>${scenarioNames[key] || key}</td>
  //           ${getCell(testResult, true)}
  //           ${getCell(testResult, false)}
  //           ${getRegression(testResult)}
  //          </tr>`;
  //     })
  //     .join('\n')
  //     .concat(`</table>`),
  // );

  // TODO: add iterations column (and maybe ticks per iteration)
  const result = `
  <table>
  <tr>
    <th>Kind</th>
    <th>Story</th>
    <th>TPI</th>
    <th>Iterations</th>
    <th>
      <a href="https://github.com/microsoft/fluentui/wiki/Perf-Testing#why-are-results-listed-in-ticks-instead-of-time-units">PR Ticks</a>
    </th>
  </tr>`.concat(
    resultsToDisplay
      .map(resultKey => {
        const testResult = testResults[resultKey];
        const tpi = testResult.extended.tpi
          ? linkifyResult(
              testResult,
              testResult.extended.tpi.toLocaleString('en', { maximumSignificantDigits: 2 }),
              false,
            )
          : 'n/a';

        return `<tr>
            <td>${testResult.extended.kind}</td>
            <td>${testResult.extended.story}</td>
            <td>${tpi}</td>
            <td>${testResult.extended.iterations}</td>
            <td>${getTicksResult(testResult, false)}</td>
           </tr>`;
      })
      .join('\n')
      .concat(`</table>`),
  );

  return result;
}

function getKindKey(resultKey: string): string {
  const [kind] = resultKey.split('.');
  return kind;
}

function getStoryKey(resultKey: string): string {
  const [, story] = resultKey.split('.');
  return story;
}

function getTpiResult(
  testResults: CookResults,
  stories: { [x: string]: { [x: string]: any } },
  kind: string,
  story: string,
): number | undefined {
  let tpi: number | undefined;
  if (stories[kind][story]) {
    const resultKey = `${kind}.${story}`;
    const testResult = testResults[resultKey];
    const ticks = getTicks(testResult);
    const iterations = getIterations(stories, kind, story);
    tpi = ticks && iterations && Math.round((ticks / iterations) * 100) / 100;
  }
  return tpi;
}

function getIterations(
  stories: {
    [x: string]: Partial<{
      default: { iterations?: number };
      [x: string]: { iterations?: number };
    }>;
  },
  kind: string,
  story: string,
): number {
  // Give highest priority to most localized definition of iterations. Story => kind => default.
  return stories[kind][story]?.iterations || stories[kind].default?.iterations || defaultIterations;
}

function getTicks(testResult: CookResult): number | undefined {
  return testResult.analysis && testResult.analysis.numTicks;
}

function linkifyResult(testResult: CookResult, resultContent: string | number | undefined, getBaseline: boolean) {
  let flamegraphFile = testResult.processed.output && testResult.processed.output.flamegraphFile;
  let errorFile = testResult.processed.error && testResult.processed.error.errorFile;

  if (getBaseline) {
    const processedBaseline = testResult.processed.baseline;
    flamegraphFile = processedBaseline && processedBaseline.output && processedBaseline.output.flamegraphFile;
    errorFile = processedBaseline && processedBaseline.error && processedBaseline.error.errorFile;
  }

  const cell = errorFile
    ? `<a href="${path.basename(errorFile)}">err</a>`
    : flamegraphFile
    ? `<a href="${path.basename(flamegraphFile)}">${resultContent}</a>`
    : `n/a`;

  return cell;
}

/**
 * Helper that renders an output cell based on a test result.
 *
 * @param {CookResult} testResult
 * @param {boolean} getBaseline
 * @returns {string}
 */
function getTicksResult(testResult: CookResult, getBaseline: boolean): string {
  let numTicks = testResult.analysis && testResult.analysis.numTicks;

  if (getBaseline) {
    numTicks = testResult.analysis && testResult.analysis.baseline && testResult.analysis.baseline.numTicks;
  }

  return linkifyResult(testResult, numTicks, getBaseline);
}

/**
 * Helper that renders an output cell based on a test result.
 *
 * @param {CookResult} testResult
 * @returns {string}
 */
// TODO: We can't do CI, measure baseline or do regression analysis until master & PR files are deployed and publicly accessible.
// TODO: Fluent reporting is outside of this script so this code will probably be moved entirely on perf-test consolidation.
// function getRegression(testResult: CookResult): string {
//   const cell = testResult.analysis && testResult.analysis.regression && testResult.analysis.regression.isRegression
//     ? testResult.analysis.regression.regressionFile
//       ? `<a href="${urlForDeployPath}/${path.basename(testResult.analysis.regression.regressionFile)}">Possible regression</a>`
//       : ''
//     : '';

//   return `<td>${cell}</td>`;
// }
