import ora = require('ora');

const spinner = ora({
  text: process.argv[2],
  spinner: 'line',
  stream: process.stderr,
  isEnabled: true,
  hideCursor: false,
  discardStdin: false,
});
const delay = setTimeout(() => spinner.start(), 150);
let stopped = false;

function stop(): void {
  if (stopped) {
    return;
  }
  stopped = true;
  clearTimeout(delay);
  spinner.stop();
  if (process.connected) {
    process.disconnect();
  }
}

process.on('message', message => {
  if (message === 'stop') {
    stop();
    return;
  }
  if (stopped || !message || typeof message !== 'object') {
    return;
  }
  const update = message as { type?: string; text?: string };
  if (typeof update.text !== 'string') {
    return;
  }
  if (update.type === 'update') {
    spinner.text = update.text;
  } else if (update.type === 'log') {
    const spinning = spinner.isSpinning;
    spinner.stop();
    process.stderr.write(`${update.text}\n`);
    if (spinning) {
      spinner.start();
    }
  }
});
process.once('disconnect', stop);
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
process.send?.('ready');
