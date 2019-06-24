module.exports = {
  // Most files in the 5.0 branch aren't prettier-formatted, and starting to introduce prettier
  // formatting intermittently (due to format-on-save in VS Code with the prettier extension) would
  // be unnecessary churn. The following setting prevents this unintentional reformatting by telling
  // prettier to only run on files starting with a comment /** @prettier */.
  requirePragma: true,
  // Opt-in formatting to match new versions
  printWidth: 140,
  tabWidth: 2,
  singleQuote: true
};
