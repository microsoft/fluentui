const isProduction = process.argv.indexOf('--production') > -1;

[
  'sass',
  'tslint',
  'typescript',
  'karma',
  'webpack'
].forEach(task => require('./tasks/' + task)({ isProduction }));
