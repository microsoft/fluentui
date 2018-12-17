function just(cmd) {
  const path = require('path');

  let startIndex = process.argv.findIndex(arg => arg.startsWith('-'));
  if (startIndex < 0) {
    startIndex = 2;
  }

  process.argv = [
    ...process.argv.slice(0, startIndex),
    ...(cmd ? [cmd] : []),
    '--config',
    path.resolve(__dirname, 'just-task.js'),
    ...process.argv.slice(startIndex)
  ];

  require('just-task/lib/cli.js');
}

exports.just = just;

if (require.main === module) {
  just();
}
