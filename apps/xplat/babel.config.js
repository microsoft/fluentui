module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: (() => {
    const plugins = [];
    try {
      plugins.push(require.resolve('@stylexjs/babel-plugin'));
      return [stylex];
    } catch (_) {
      /* ignore */
    }
    return plugins;
  })(),
};
