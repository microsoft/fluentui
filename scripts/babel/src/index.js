/**
 * This files is used solely for react-northstar projects. Please don't any new logic here
 */

/** @typedef {import('@babel/core').TransformOptions['caller']} Caller */

const isNodeCaller = (/** @type {Caller}*/ caller) => {
  return Boolean(caller && (caller.name === '@babel/register' || caller.name === 'babel-jest'));
};
const isDistCaller = (/** @type {Caller}*/ caller) => {
  return !!(caller && caller.name === 'babel-gulp');
};
const supportsESM = (/** @type {Caller}*/ caller) => {
  // @ts-expect-error - TODO: caller.useESModules api doesn't exists (types/implementation), is this a bug? https://babeljs.io/docs/en/options#caller
  return !!((caller && caller.name === 'babel-loader') || caller.useESModules);
};

module.exports = (/** @type {import('@babel/core').ConfigAPI} */ api) => {
  const isDistBundle = api.caller(isDistCaller);
  const isNode = api.caller(isNodeCaller);
  const useESModules = !isNode && api.caller(supportsESM);

  const presets = [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: useESModules ? false : 'cjs',
        targets: isNode ? { node: '10' } : undefined,
        exclude: [
          // https://github.com/microsoft/fluent-ui-react/pull/1895
          'proposal-object-rest-spread',
          'transform-async-to-generator',
        ],
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
    isDistBundle && 'lodash',
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
