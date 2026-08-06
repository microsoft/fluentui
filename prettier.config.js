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
  // prettier 3 has no plugin auto-discovery - plugins must be declared explicitly.
  // prettier-plugin-tailwindcss sorts Tailwind classes; in this repo its effect is
  // sorting `@apply` lists in authored *.module.css files (Griffel -> Tailwind migration).
  plugins: ['prettier-plugin-tailwindcss'],
  // Tailwind v4 CSS-config mode: point the plugin at the canonical theme entry that
  // component modules reference via `@reference '#theme'`.
  tailwindStylesheet: './packages/react-components/react-tailwind-theme/css/index.css',
  // DO NOT add `tailwindFunctions: ['clsx']`: clsx argument order is semantic in this repo
  // (D15.1 - module class first, group marker second, consumer className last) and the
  // plugin may reorder across arguments. Class sorting in JS/TS call expressions is
  // therefore deliberately NOT enabled; sorting applies to CSS `@apply` lists and
  // class attributes.
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
