module.exports = {
  ...require('@uifabric/prettier-rules/prettier.config.js'),
  // The smaller printWidth for the screener tests promotes readability by preventing test cases
  // from being squished onto one line (and squished up against each other in consecutive lines)
  printWidth: 100
};
