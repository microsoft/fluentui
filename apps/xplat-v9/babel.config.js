module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: [
    '@babel/plugin-transform-nullish-coalescing-operator', // required by Chakra
    '@babel/plugin-transform-logical-assignment-operators', // required by Chakra
    '@stylexjs/babel-plugin',
  ],
};
