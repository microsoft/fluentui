const { ESLintUtils } = require('@typescript-eslint/utils');

/**
 * @template {string} TMessageIds
 * @template {unknown[]} TOptions
 * @param {import('@typescript-eslint/utils').TSESLint.RuleContext<TMessageIds, Readonly<TOptions>>} context
 * @returns
 */
function getTypeServices(context) {
  const { esTreeNodeToTSNodeMap, program } = ESLintUtils.getParserServices(context);
  const typeChecker = program.getTypeChecker();

  /**
   *
   * @param {import('@typescript-eslint/utils').TSESTree.Node} node
   * @returns
   */
  function getType(node) {
    const tsNode = esTreeNodeToTSNodeMap.get(node);
    return tsNode && typeChecker.getTypeAtLocation(tsNode);
  }

  return {
    getType,
    typeChecker,
  };
}

exports.getTypeServices = getTypeServices;
