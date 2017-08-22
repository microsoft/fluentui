const isProduction = process.argv.indexOf('--production') > -1;

if (process.argv.length >= 3 && process.argv[2].indexOf('--') === -1) {
  require('./tasks/' + process.argv[2])({ isProduction });
} else {
  [
    'sass',
    'tslint',
    'ts',
    'karma',
    'webpack'
  ].forEach(task => require('./tasks/' + task)({ isProduction }));
}
