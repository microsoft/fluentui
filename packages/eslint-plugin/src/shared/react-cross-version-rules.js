// @ts-check

/**
 * Creates React cross-version compatibility ESLint rules
 * @param {{crossCompatTypePackage: string, extraTypeRestrictions?: {[key:string]: {message: string, fixWith?: string, suggest?: string[]}}}} options
 * @returns {import("eslint").Linter.RulesRecord}
 */
function createReactCrossVersionRules(options) {
  const { extraTypeRestrictions, crossCompatTypePackage } = options;

  /** @type {NonNullable<typeof extraTypeRestrictions>} */
  const types = {
    'JSX.IntrinsicElements': {
      message: `\`JSX.IntrinsicElements\` is not compatible with @types/react@>=19. To access intrinsic element keys use \`JSXIntrinsicElementKeys\`, otherwise use \`JSXIntrinsicElement<T>\` from ${crossCompatTypePackage} instead`,
      suggest: ['JSXIntrinsicElementKeys', 'JSXIntrinsicElement'],
    },
    'React.JSX.IntrinsicElements': {
      message: `\`React.JSX.IntrinsicElements\` is not backwards compatible with @types/react@17. To access intrinsic element keys use \`JSXIntrinsicElementKeys\`, otherwise use \`JSXIntrinsicElement<T>\` from ${crossCompatTypePackage} instead`,
      suggest: ['JSXIntrinsicElementKeys', 'JSXIntrinsicElement'],
    },
    'JSX.Element': {
      message: `\`JSX.Element\` is not compatible with @types/react@>=19. Use \`JSXElement\` from ${crossCompatTypePackage} instead`,
      fixWith: 'JSXElement',
    },
    'React.JSX.Element': {
      message: `\`React.JSX.Element\` is not backwards compatible with @types/react@17. Use \`JSXElement\` from ${crossCompatTypePackage} instead`,
      fixWith: 'JSXElement',
    },
    ...extraTypeRestrictions,
  };

  return {
    /**
     * @see https://typescript-eslint.io/rules/no-restricted-types/
     */
    '@typescript-eslint/no-restricted-types': [
      'error',
      {
        types,
      },
    ],
    /**
     * Require explicit type annotations for all module exports.
     * This ensures that exports have clearly defined types,
     * preventing accidental exposure of implicit return types to consumers.
     * @see https://typescript-eslint.io/rules/explicit-module-boundary-types/
     */
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
        allowOverloadFunctions: true,
      },
    ],
  };
}

module.exports = {
  createReactCrossVersionRules,
};
