const { logger } = require('just-task');
const ttest = require('ttest');

const componentCount = 1000;
const iterations = 150;

const urlFromDeployJob = process.env.BUILD_SOURCEBRANCH
  ? `http://fabricweb.z5.web.core.windows.net/pr-deploy-site/${process.env.BUILD_SOURCEBRANCH}/perf-test/`
  : 'http://localhost:4322';
const urlForMaster = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/perf-test/';

module.exports = async function getPerfRegressions() {
  const browser = await require('puppeteer').launch({ headless: true });
  let page = await browser.newPage();

  // get perf numbers for existing code
  await page.goto(urlForMaster);
  const samplesNow = await runAvailableScenarios(page, componentCount, iterations);
  logger.info(samplesNow);

  // get perf numbers for new code
  await page.goto(urlFromDeployJob);
  const samplesNew = await runAvailableScenarios(page, componentCount, iterations);
  logger.info(samplesNew);

  // Clean up
  await browser.close();

  // t-test
  // comparing totals, ignoring peritem
  const scenariostats = getStats(samplesNow, samplesNew);
  console.log(scenariostats);

  // Output comment blob and status as task variables
  const comment = createBlobFromResults({
    stats: scenariostats,
    now: samplesNow,
    new: samplesNew
  });

  // TODO: determine status according to perf numbers
  const status = 'success';

  logger.info(`Perf evaluation status: ${status}`);
  logger.info(`Writing comment to file:\n${comment}`);

  // Write results to file
  require('fs').writeFileSync(require('path').join('apps/perf-test/dist', 'perfCounts.txt'), comment);

  console.log(`echo ##vso[task.setvariable variable=PerfCommentFilePath;]apps/perf-test/dist/perfCounts.txt`);

  console.log(`echo ##vso[task.setvariable variable=PerfCommentStatus;]${status}`);
};

async function runAvailableScenarios(page, componentCount, iterations) {
  // set up
  await page.$eval(
    '.iterations input',
    (ifield, count) => {
      ifield.value = count;
    },
    iterations
  );
  await page.$eval(
    '.componentCount input',
    (ccfield, count) => {
      ccfield.value = count;
    },
    componentCount
  );

  const perfNumbers = {};

  // Iterate through scenarios available
  const scenarioDropdown = await page.$('.scenario');
  let scenarioName = (await page.$eval('.scenario', dropdown => dropdown.textContent)).replace(/[^a-zA-Z\s]/g, '');
  while (!perfNumbers[scenarioName]) {
    // get numbers
    perfNumbers[scenarioName] = await runScenarioNTimes(page, 10);

    // go to next scenario
    await scenarioDropdown.focus();
    await page.keyboard.press('ArrowDown');
    scenarioName = (await page.$eval('.scenario', dropdown => dropdown.textContent)).replace(/[^a-zA-Z\s]/g, '');
  }

  return perfNumbers;
}

async function runScenarioNTimes(page, times) {
  let totalsamples = [];
  let peritemsamples = [];
  const runTestButton = await page.$('.runTest');

  for (let i = 0; i < times; i++) {
    // run scenario
    await runTestButton.click();
    await page.waitForSelector('.total', { visible: true });
    let total = await page.$eval('.total', result => result.innerText);
    let peritem = await page.$eval('.peritem', result => result.innerText);

    // add perf numbers
    totalsamples.push(parseFloat(total.replace(/[a-zA-Z:]/g, '')));
    peritemsamples.push(parseFloat(peritem.replace(/[a-zA-Z:]/g, '')));

    // reset
    await runTestButton.click();
  }

  return {
    totals: totalsamples,
    peritem: peritemsamples,
    totalavg: (totalsamples.reduce((prev, curr) => prev + curr) / times).toFixed(3),
    peritemavg: (peritemsamples.reduce((prev, curr) => prev + curr) / times).toFixed(3)
  };
}

function getStats(before, after) {
  const scenariostats = {};

  Object.keys(before).forEach(scenario => {
    if (after[scenario]) {
      scenariostats[scenario] = ttest(before[scenario].totals, after[scenario].totals, {});
      scenariostats[scenario].pvalue = scenariostats[scenario].pValue();
      scenariostats[scenario].valid = scenariostats[scenario].valid();
    }
  });

  return scenariostats;
}

function createBlobFromResults(perfBlob) {
  const scenariosFromMaster = Object.keys(perfBlob.now);
  const scenariosFromPr = Object.keys(perfBlob.new);
  return `Component perf results:
  <table>
  <tr>
    <th>Scenario</th>
    <th>Target branch avg total (ms)</th>
    <th>PR avg total (ms)</th>
    <th>Target branch avg per item (ms)</th>
    <th>PR avg per item (ms)</th>
    <th>p-value for totals >= 0.05</th>
  </tr>`.concat(
    scenariosFromMaster
      .concat(scenariosFromPr.filter(scn => !scenariosFromMaster.includes(scn)))
      .map(
        scenario =>
          `<tr>
            <td>${scenario}</td>
            <td>${perfBlob.now[scenario] ? perfBlob.now[scenario].totalavg : '...'}</td>
            <td>${perfBlob.new[scenario] ? perfBlob.new[scenario].totalavg : '...'}</td>
            <td>${perfBlob.now[scenario] ? perfBlob.now[scenario].peritemavg : '...'}</td>
            <td>${perfBlob.new[scenario] ? perfBlob.new[scenario].peritemavg : '...'}</td>
            <td>${perfBlob.stats[scenario] ? perfBlob.stats[scenario].valid : '...'}</td>
           </tr>  `
      )
      .join('\n')
      .concat(`</table>`)
  );
}
