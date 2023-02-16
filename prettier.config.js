// @ts-check

/**
 * https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Options}
 */
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  overrides: [
    {
      files: 'apps/vr-tests/**/*',
      options: {
        // The smaller printWidth for the storywright tests promotes readability by preventing test cases
        // from being squished onto one line (and squished up against each other in consecutive lines)
        printWidth: 100,
      },
    },
    {
      // These files may be run as-is in IE 11 and must not have ES5-incompatible trailing commas
      files: ['*.html', '*.htm'],
      options: {
        trailingComma: 'es5',
      },
    },
  ],
};
