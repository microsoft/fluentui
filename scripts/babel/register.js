// @ts-ignore - @babel/register doesn't ship types
require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  ignore: [/node_modules/],
  rootMode: 'upward',
});
