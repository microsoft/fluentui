import { measurePerformance, type TestRenderFunction } from '@tensile-perf/web-components';
import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';

import { setTheme } from './set-theme.js';

const tests: Record<string, TestRenderFunction> = {
  mount: ({ onComplete }) => {
    const { startMeasure, endMeasure } = measurePerformance();

    const el = document.createElement('div');
    el.attachShadow({ mode: 'open' });
    el.shadowRoot!.append(document.createElement('span'));
    document.body.append(el);

    startMeasure();

    // Newly set themes
    setTheme(webLightTheme, el);
    setTheme(webDarkTheme, el);
    setTheme(teamsDarkTheme, el);
    setTheme(teamsLightTheme, el);

    // Cached themes
    setTheme(webLightTheme, el);
    setTheme(webDarkTheme, el);
    setTheme(teamsDarkTheme, el);
    setTheme(teamsLightTheme, el);

    // Unset themes
    setTheme(null, el);

    endMeasure();

    onComplete();
  },
};

export { tests };
