// Prettier code formatting configuration
// https://prettier.io/docs/en/configuration.html
// (Redefining the configuration here for demo purposes)
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      // These files may be run as-is in IE 11 and must not have ES5-incompatible trailing commas
      files: ['*.html'],
      options: {
        trailingComma: 'es5',
      },
    },
  ],
};
