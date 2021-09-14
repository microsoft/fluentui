module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: 'literal-replacer',
    visitor: {
      MemberExpression(path) {
        if (path.node.property.name === 'parameters' && path.parentPath.isAssignmentExpression()) {
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
