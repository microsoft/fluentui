// A list of globals that are problematic when using multiple windows.
const restrictedGlobals = [
  'customElements',
  'devicePixelRatio',
  'location',
  'navigator',
  'Node',
  'performance',

  'cancelAnimationFrame',
  'cancelIdleCallback',
  'clearImmediate',
  'clearInterval',
  'clearTimeout',
  'fetch',
  'getComputedStyle',
  'matchMedia',
  'requestAnimationFrame',
  'requestIdleCallback',
  'setImmediate',
  'setInterval',
  'setTimeout',

  'IntersectionObserver',
  'MutationObserver',
  'ResizeObserver',
];

/** @type {import('@typescript-eslint/utils').TSESLint.Linter.RuleEntry} */
const reactLegacy = [
  'error',
  {
    name: 'window',
    message: 'Get a reference to `window` via context.',
  },
  {
    name: 'document',
    message: 'Get a reference to `document` via context.',
  },
];

/** @type {import('@typescript-eslint/utils').TSESLint.Linter.RuleEntry} */
const react = [
  'error',
  {
    name: 'window',
    message: 'Get a reference to `window` from `useFluent()`.',
  },
  {
    name: 'document',
    message: 'Get a reference to `document` from `useFluent()`.',
  },
  ...restrictedGlobals.map(key => {
    return {
      name: key,
      message: `Get a reference to \`window\` from \`useFluent()\` and access \`${key}\` from there.`,
    };
  }),
];

module.exports = {
  restrictedGlobals,
  reactLegacy,
  react,
};
