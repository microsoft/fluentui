// require('@fluentui/scripts-babel/register');

require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  ignore: [/node_modules/],
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        // modules: 'cjs',
        targets: { node: 'current' },
      },
    ],
    ['@babel/preset-typescript'],
  ],
});

module.exports = require('./api');
