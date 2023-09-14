import { loadScenarios, render } from '@fluentui/scripts-perf-test-flamegrill';

bootstrap();

function bootstrap() {
  const reqContext = require.context('./scenarios/', false, /^\.\/[^\.]*\.(j|t)sx?$/);
  const scenarios = loadScenarios(reqContext);

  render(scenarios);
}
