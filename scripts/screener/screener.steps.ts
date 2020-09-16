import _ from 'lodash';
import fs from 'fs';

import { keys, Steps } from './screener.api';
import { ScreenerTestsConfig, ScreenerThemeName } from './screener.types';

const DEFAULT_THEMES: ScreenerThemeName[] = ['teams'];

const getScreenerSteps = (pageUrl: string, stepsModulePath: string): any[] => {
  const stepsBuilder = new Steps();

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
