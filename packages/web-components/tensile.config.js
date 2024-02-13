const config = {
  // Browsers to test against
  browsers: ['chrome'],

  // Importmaps for your test.
  // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
  imports: {
    '@tensile-perf/web-components': '/node_modules/@tensile-perf/web-components/dist/index.js',
    '@microsoft/fast-element': '/node_modules/@microsoft/fast-element/dist/fast-element.min.js',
  },
};

export default config;
