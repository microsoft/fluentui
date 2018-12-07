require('./tasks/jest')({
  args: '--watch -i',
  coverage: isCoverageOptionPassed()
});

function isCoverageOptionPassed() {
  return process.argv.indexOf('--coverage') >= 0;
}
