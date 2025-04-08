import { measurePerformance, type TestRenderFunction } from '@tensile-perf/web-components';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';

import { setTheme } from './set-theme.js';

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

    // Unset themes
    setTheme(null);

    endMeasure();

    onComplete();
  },
};

export { tests };
