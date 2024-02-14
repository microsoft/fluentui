const config = {
  // Browsers to test against
  browsers: ['chrome'],

  // Importmaps for your test.
  // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
  imports: {
    '@tensile-perf/web-components': '/node_modules/@tensile-perf/web-components/dist/index.js',
    '@microsoft/fast-element': '/node_modules/@microsoft/fast-element/dist/fast-element.min.js',
    '@microsoft/fast-foundation/utilities.js': '/node_modules/@microsoft/fast-foundation/dist/esm/utilities/index.js',
    '@microsoft/fast-web-utilities': '/node_modules/@microsoft/fast-web-utilities/dist/index.js',
    '@fluentui/tokens': '/node_modules/@fluentui/tokens/lib/index.js',
    '@fluentui/web-components': '/node_modules/@fluentui/web-components/dist/esm/index.js',
    'exenv-es6': '/node_modules/exenv-es6/dist/index.js',
  },
};

export default config;
