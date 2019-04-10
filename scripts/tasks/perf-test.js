// TODO: add the ability to run this perf-test against a non PR deployed site
const urlFromDeployJob = `http://fabricweb.z5.web.core.windows.net/pr-deploy-site/${process.env.BUILD_SOURCEBRANCH}/perf-test/`;
const urlForMaster = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/perf-test/';

module.exports = async function getPerfRegressions() {
  const browser = await require('puppeteer').launch({ headless: true });
  let page = await browser.newPage();

  // get perf numbers for existing code
  await page.goto(urlForMaster);
  const perfAveragesNow = await runAvailableScenarios(page, 1000, 100);
  console.log(perfAveragesNow);

  // get perf numbers for new code
  await page.goto(urlFromDeployJob);
  const perfAveragesNew = await runAvailableScenarios(page, 1000, 100);
  console.log(perfAveragesNew);

  // Clean up
  await browser.close();

  // Write results to json file
  require('fs').writeFileSync(
    require('path').join('apps/perf-test/dist', 'perfCounts.json'),
    JSON.stringify({ now: perfAveragesNow, new: perfAveragesNew })
  );
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
  let scenarioName = (await page.$eval('.scenario', dropdown => dropdown.textContent)).trim();
  while (!perfNumbers[scenarioName]) {
    // get numbers
    perfNumbers[scenarioName] = await runScenarioNTimes(page, 10);

    // go to next scenario
    await scenarioDropdown.focus();
    await page.keyboard.press('ArrowDown');
    scenarioName = (await page.$eval('.scenario', dropdown => dropdown.textContent)).trim();
  }

  return perfNumbers;
}

async function runScenarioNTimes(page, times) {
  let totalsum = 0;
  let peritemsum = 0;
  const runTestButton = await page.$('.runTest');

  for (let i = 0; i < times; i++) {
    // run scenario
    await runTestButton.click();
    await page.waitForSelector('.total', { visible: true });
    let total = await page.$eval('.total', result => result.innerText);
    let peritem = await page.$eval('.peritem', result => result.innerText);

    // add perf numbers
    totalsum += parseFloat(total.replace(/[a-zA-Z:]/g, ''));
    peritemsum += parseFloat(peritem.replace(/[a-zA-Z:]/g, ''));

    // reset
    await runTestButton.click();
  }

  // average
  return {
    total: totalsum / times,
    peritem: peritemsum / times
  };
}
