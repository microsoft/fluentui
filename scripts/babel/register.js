require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  ignore: [/node_modules/],
  rootMode: 'upward',
});
