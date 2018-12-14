const path = require('path');

process.argv.push('build');
process.argv.push('--config');
process.argv.push(path.resolve(__dirname, 'just-task.js'));

require('just-task/lib/cli.js');
