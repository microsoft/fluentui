const { makeMetroConfig, exclusionList } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

module.exports = makeMetroConfig({
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
    blockList: exclusionList([
      /.*\/__fixtures__\/.*/,
      /,*\/fake_node_modules\/.*/,
      //    /.*\/babel-preset-global-context\/.*/,
      //    /.*\/fluentui\/node_modules\/@babel\/runtime\/.*/,
      //     /.*\/deprecated-react-native-prop-types\/node_modules\/@react-native\/normalize-colors\/.*/,
      //    /.*\/node_modules\/prop-types\/node_modules\/react-is\/.*/,
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
