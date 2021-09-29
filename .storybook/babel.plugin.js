/**
 * This Babel plugin adds `context.parameters.fullSource` property to Storybook stories,
 * which contains source of of the file where story is present.
 * It’s utilized by Export to CodeSandbox.
 * @param {import('@babel/core')} babel
 * @returns {import('@babel/core').PluginObj}
 */
module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: 'literal-replacer',
    visitor: {
      MemberExpression(path) {
        if (
          t.isIdentifier(path.node.property) &&
          t.isIdentifier(path.node.object) &&
          path.node.property.name === 'parameters' &&
          path.parentPath.isAssignmentExpression()
        ) {
          const storyName = path.node.object.name;
          const expression = t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(
                t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
                t.identifier('fullSource'),
              ),
              t.identifier('__STORY__'),
            ),
          );
          const expressionStatement = path.findParent(p => p.isExpressionStatement());
          expressionStatement.insertAfter(expression);
          path.stop();
        }
      },
    },
  };
};
