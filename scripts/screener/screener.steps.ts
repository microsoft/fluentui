import _ from 'lodash';
import fs from 'fs';

import { keys, Steps } from './screener.api';
import { ScreenerTestsConfig, ScreenerTheme } from './screener.types';

const DEFAULT_THEMES: ScreenerTheme[] = [{ name: 'teamsV2', testResultName: 'teams' }];

const getScreenerSteps = (pageUrl: string, stepsModulePath: string): any[] => {
  const stepsBuilder = new Steps();

  if (fs.existsSync(`${stepsModulePath}.ts`)) {
    const { steps: screenerSteps, themes = DEFAULT_THEMES }: ScreenerTestsConfig = require(stepsModulePath).default;

    _.forEach(themes, themeName => {
      stepsBuilder
        .waitForSelector('.ui-provider')
        .switchTheme(themeName.name)
        .snapshot(`Theme: ${themeName.testResultName || themeName.name}`);

      _.forEach(screenerSteps, screenerStep => {
        screenerStep(stepsBuilder, keys);

        // We need to reload page to reset mouse position between tests
        stepsBuilder.url(pageUrl).waitForSelector('.ui-provider').switchTheme(themeName.name);
      });
    });
  } else {
    // Captures a default screenshot if there is no any steps
    stepsBuilder.snapshot('Default');
  }

  return stepsBuilder.end();
};

export default getScreenerSteps;
