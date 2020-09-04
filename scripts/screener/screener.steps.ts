import _ from 'lodash';
import fs from 'fs';
import Steps from 'screener-runner/src/steps';
import keys from 'screener-runner/src/keys';

const DEFAULT_THEMES: ScreenerThemeName[] = ['teams'];

Steps.prototype.resetExternalLayout = function resetExternalLayout() {
  return this.executeScript(`window.resetExternalLayout()`);
};

Steps.prototype.switchTheme = function switchTheme(themeName: ScreenerThemeName) {
  return this.executeScript(`window.switchTheme("${themeName}")`);
};

/**
 * Overrides the base implementation to always crop screenshots to some selector.
 * @see https://github.com/screener-io/screener-runner/blob/16e3e27d644f4d40d62fbd62a858da0f8952333e/src/steps.js#L14
 */
Steps.prototype.snapshot = function(
  screenshotName: string,
  options: { cropTo: string } = { cropTo: '#visual-test-area' },
) {
  if (!options.cropTo) {
    throw new Error('A "cropTo" option is required to be defined for the `.snapshot()` step');
  }

  const step = {
    type: 'cropScreenshot',
    name: screenshotName,
    locator: {
      type: 'css selector',
      value: options.cropTo,
    },
  };

  this.steps.push(step);
  return this;
};

const getScreenerSteps = (pageUrl: string, stepsModulePath: string): any[] => {
  const stepsBuilder: ScreenerStepBuilder = new Steps();

  if (fs.existsSync(`${stepsModulePath}.ts`)) {
    const { steps: screenerSteps, themes = DEFAULT_THEMES }: ScreenerTestsConfig = require(stepsModulePath).default;

    _.forEach(themes, themeName => {
      stepsBuilder.switchTheme(themeName).snapshot(`Theme: ${themeName}`);

      _.forEach(screenerSteps, screenerStep => {
        screenerStep(stepsBuilder, keys);

        // We need to reload page to reset mouse position between tests
        stepsBuilder.url(pageUrl).switchTheme(themeName);
      });
    });
  } else {
    // Captures a default screenshot if there is no any steps
    stepsBuilder.snapshot('Default');
  }

  return stepsBuilder.end();
};

export default getScreenerSteps;
