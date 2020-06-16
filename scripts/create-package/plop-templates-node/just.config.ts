const { preset } = require('@uifabric/build');

preset();

task('build', 'build:node-lib').cached();
