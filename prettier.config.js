// https://prettier.io/docs/en/configuration.html
module.exports = {
  printWidth: 140,
  tabWidth: 2,
  singleQuote: true,
  overrides: [
    {
      files: 'apps/vr-tests/**/*',
      options: {
        // The smaller printWidth for the screener tests promotes readability by preventing test cases
        // from being squished onto one line (and squished up against each other in consecutive lines)
        printWidth: 100
      }
    }
  ]
};
