import * as path from 'path';
import { modifyImportsPlugin as plugin, PLUGIN_NAME } from './modifyImports';
import pluginTester from 'babel-plugin-tester';

const fixturesDir = path.join(__dirname, `__fixtures__/${PLUGIN_NAME}`);
const defaultDependencyReplace = { replace: '@fluentui/react-components' };

describe(PLUGIN_NAME, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {
      return;
    });
  });

  pluginTester({
    fixtures: fixturesDir,
    pluginOptions: {
      '@fluentui/react-button': defaultDependencyReplace,
      '@fluentui/react-menu': defaultDependencyReplace,
      '@fluentui/react-link': defaultDependencyReplace,
      '@fluentui/react-unstable-component': { replace: '@fluentui/react-components/unstable' },
    },
    pluginName: PLUGIN_NAME,
    plugin,
  });
});
