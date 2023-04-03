import { loadScenarios, render } from '@fluentui/scripts-perf-test-flamegrill';

import { initializeIcons } from '@fluentui/react/lib/Icons';

bootstrap();

function bootstrap() {
  const reqContext = require.context('./scenarios/', false, /^\.\/[^\.]*\.(j|t)sx?$/);
  const scenarios = loadScenarios(reqContext);

  initializeIcons();

  render(scenarios);
}
