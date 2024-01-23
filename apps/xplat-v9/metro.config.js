const { exclusionList, makeMetroConfig, resolveUniqueModule } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

const [normalizeColorsPath, normalizeColorsPattern] = resolveUniqueModule(
  '@react-native/normalize-colors',
  require.resolve('react-native'),
);

const [reactIsPath, reactIsPattern] = resolveUniqueModule('react-is', require.resolve('react-test-renderer'));

module.exports = makeMetroConfig({
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
    extraNodeModules: {
      '@react-native/normalize-colors': normalizeColorsPath,
      'react-is': reactIsPath,
    },
    blockList: exclusionList([
      /.*\/__fixtures__\/.*/,
      /,*\/fake_node_modules\/.*/,
      normalizeColorsPattern,
      reactIsPattern,
    ]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
