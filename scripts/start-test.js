const customArgs = process && process.argv ? process.argv.slice(2).join(' ') : '';

require('./tasks/jest')({
  args: `--watch -i ${customArgs}`
});
