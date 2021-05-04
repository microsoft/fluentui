const isBabelGulpCaller = caller => !!(caller && caller.name === 'babel-gulp');
const isBabelRegisterCaller = caller => !!(caller && caller.name === '@babel/register');
const isJestCaller = caller => !!(caller && caller.name === 'babel-jest');

const supportsESM = caller => !!((caller && caller.name === 'babel-loader') || caller.useESModules);

module.exports = api => {
  const isBabelGulp = api.caller(isBabelGulpCaller);
  const isBabelRegister = api.caller(isBabelRegisterCaller);
  const isJest = api.caller(isJestCaller);
  const useESModules = !isBabelRegister && api.caller(supportsESM);

  const presets = [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: useESModules ? false : 'cjs',
        targets: isBabelRegister || isJest ? { node: 'current' } : undefined,
        exclude: [
          // https://github.com/microsoft/fluent-ui-react/pull/1895
          'proposal-object-rest-spread',
          'transform-async-to-generator',

          // For "@babel/register" we use to "lazy" to improve tasks startup
          isBabelRegister && 'transform-modules-commonjs',
        ].filter(Boolean),
      },
    ],
    '@babel/preset-react',
    ['@babel/preset-typescript', { allowNamespaces: true }],
  ];
  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', { useESModules }],

    isBabelRegister && ['@babel/plugin-transform-modules-commonjs', { importInterop: 'node', lazy: true }],

    useESModules && 'babel-plugin-iife-wrap-react-components',
    useESModules && [
      'babel-plugin-annotate-pure-imports',
      {
        imports: {
          '@fluentui/react-bindings': 'compose',
          '@fluentui/react-context-selector': 'createContext',
          '../utils/createSvgIcon': ['createSvgIcon'],
        },
      },
    ],
    isBabelGulp && 'lodash',
  ].filter(Boolean);

  return {
    presets,
    plugins,
    // Options to facilitate debugging in editor (set DEBUG environment var)
    ...(process.env.DEBUG && {
      sourceMaps: 'inline',
      retainLines: true,
    }),
  };
};
