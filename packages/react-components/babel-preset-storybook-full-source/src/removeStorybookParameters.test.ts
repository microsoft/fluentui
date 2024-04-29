import * as path from 'path';
import { removeStorybookParameters as plugin, PLUGIN_NAME } from './removeStorybookParameters';
import pluginTester from 'babel-plugin-tester';

const fixturesDir = path.join(__dirname, `__fixtures__/${PLUGIN_NAME}`);
const defaultDependencyReplace = { replace: '@fluentui/react-components' };

pluginTester({
  fixtures: fixturesDir,
  pluginOptions: {
    '@fluentui/react-button': defaultDependencyReplace,
    '@fluentui/react-menu': defaultDependencyReplace,
    '@fluentui/react-link': defaultDependencyReplace,
  },
  pluginName: PLUGIN_NAME,
  plugin,
});
