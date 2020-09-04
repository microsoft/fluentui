import _ from 'lodash';
import fs from 'fs';
import Steps from 'screener-runner/src/steps';
import keys from 'screener-runner/src/keys';

const DEFAULT_THEMES: ScreenerThemeName[] = ['teams'];

Steps.prototype.resetExternalLayout = function resetExternalLayout() {
  return this.hover('#visual-test-mouse-point').executeScript(`window.resetExternalLayout()`);
};

Steps.prototype.switchTheme = function switchTheme(themeName: ScreenerThemeName) {
  return this.executeScript(`window.switchTheme("${themeName}")`);
};

const getScreenerSteps = (pageUrl: string, stepsModulePath: string): any[] => {
  const stepsBuilder: ScreenerStepBuilder = new Steps();

  if (fs.existsSync(`${stepsModulePath}.ts`)) {
    const { steps: screenerSteps, themes = DEFAULT_THEMES }: ScreenerTestsConfig = require(stepsModulePath).default;

    _.forEach(themes, themeName => {
      stepsBuilder.switchTheme(themeName).snapshot(`Theme: ${themeName}`);

      _.forEach(screenerSteps, screenerStep => {
        screenerStep(stepsBuilder, keys);

        // We need to reset layouts to reset mouse position and focusing between tests
        stepsBuilder.resetExternalLayout();
      });
    });
  } else {
    // Captures a default screenshot if there is no any steps
    stepsBuilder.snapshot('Default');
  }

  return stepsBuilder.end();
};

export default getScreenerSteps;
