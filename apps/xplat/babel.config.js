module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: (() => {
    const plugins = [];
    try {
      plugins.push(require.resolve('@stylexjs/babel-plugin'));
    } catch (_) {
      /* ignore */
    }
    return plugins;
  })(),
};
