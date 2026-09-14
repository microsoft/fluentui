import * as path from 'path';
import pluginTester from 'babel-plugin-tester';
import { fullSourcePlugin as plugin, PLUGIN_NAME } from './fullsource';

const fixturesDir = path.join(__dirname, `__fixtures__/${PLUGIN_NAME}`);
const defaultDependencyReplace = { replace: '@fluentui/react-components' };

pluginTester({
  babelOptions: {
    presets: ['@babel/preset-react'],
  },
  fixtures: fixturesDir,
  pluginOptions: {
    importMappings: {
      '@fluentui/react-button': defaultDependencyReplace,
      '@fluentui/react-menu': defaultDependencyReplace,
      '@fluentui/react-link': defaultDependencyReplace,
    },
    cssModules: true,
  },
  pluginName: PLUGIN_NAME,
  plugin,
});

pluginTester({
  babelOptions: {
    presets: ['@babel/preset-react'],
  },
  fixtures: path.join(__dirname, '__fixtures__/storybook-stories-fullsource-with-tokens'),
  pluginOptions: {
    importMappings: {
      '@fluentui/react-button': defaultDependencyReplace,
    },
    cssModules: {
      tokensFilePath: path.join(
        __dirname,
        '__fixtures__/storybook-stories-fullsource-with-tokens/css-module-with-tokens/tokens.css',
      ),
    },
  },
  pluginName: PLUGIN_NAME,
  plugin,
});

// Per-story granularity: each story export gets its own sliced `fullSource`.
pluginTester({
  babelOptions: {
    // Compile the fixtures like a real Storybook build (JSX + TS stripped). Type
    // preservation is asserted on the emitted `fullSource` strings, which come
    // from the plugin's own transform and keep types.
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  },
  fixtures: path.join(__dirname, '__fixtures__/storybook-stories-fullsource-per-story'),
  pluginOptions: {
    importMappings: {
      '@fluentui/react-button': defaultDependencyReplace,
      '@fluentui/react-menu': defaultDependencyReplace,
    },
    storyGranularity: 'story',
  },
  pluginName: PLUGIN_NAME,
  plugin,
});
