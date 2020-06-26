import _ from 'lodash';
import fs from 'fs';
import Steps from 'screener-runner/src/steps';
import keys from 'screener-runner/src/keys';

const DEFAULT_THEMES: ScreenerThemeName[] = ['teams'];

Steps.prototype.resetExternalLayout = function resetExternalLayout() {
  return this.executeScript(`window.resetExternalLayout()`);
};

Steps.prototype.switchTheme = function switchTheme(themeName: ScreenerThemeName) {
  return this.wait(8000).executeScript(`if(window.switchTheme){window.switchTheme("${themeName}")}`);
};

const getScreenerSteps = (pageUrl: string, stepsModulePath: string): any[] => {
  if (!fs.existsSync(`${stepsModulePath}.ts`)) {
    return undefined;
  }

  const stepsBuilder: ScreenerStepBuilder = new Steps();
  const { steps: screenerSteps, themes = DEFAULT_THEMES }: ScreenerTestsConfig = require(stepsModulePath).default;

  _.forEach(themes, themeName => {
    stepsBuilder.switchTheme(themeName).snapshot(`Theme: ${themeName}`);

    _.forEach(screenerSteps, screenerStep => {
      screenerStep(stepsBuilder, keys);

      // We need to reload page to reset mouse position between tests
      stepsBuilder.url(pageUrl).switchTheme(themeName);
    });
  });

  return stepsBuilder.end();
};

export default getScreenerSteps;
