const { taskPresets, task, series, parallel } = require('just-scripts');

taskPresets.lib();

task('build', series('clean', 'ts:commonjs'));
