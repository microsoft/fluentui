import type { TestRenderFunction } from '@tensile-perf/web-components';
import { measureJavascript, measureLayout } from '@tensile-perf/tools';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';

import { setTheme } from './set-theme.js';

const measurePerformance = () => {
  let startTime: number;

  const startMeasure = () => {
    startTime = performance.now();
  };

  const endMeasure = () => {
    measureJavascript(startTime, performance.now());
    measureLayout();
  };

  return { startMeasure, endMeasure };
};

const tests: Record<string, TestRenderFunction> = {
  mount: ({ onComplete }) => {
    const { startMeasure, endMeasure } = measurePerformance();

    startMeasure();

    // Newly set themes
    setTheme(webLightTheme);
    setTheme(webDarkTheme);
    setTheme(teamsDarkTheme);
    setTheme(teamsLightTheme);

    // Cached themes
    setTheme(webLightTheme);
    setTheme(webDarkTheme);
    setTheme(teamsDarkTheme);
    setTheme(teamsLightTheme);

    endMeasure();

    onComplete();
  },
};

export { tests };
