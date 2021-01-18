import { types as t } from '@babel/core';

export function astify<T>(
  literal: T,
):
  | t.NullLiteral
  | t.NumericLiteral
  | t.StringLiteral
  | t.BooleanLiteral
  | t.UnaryExpression
  | t.ArrayExpression
  | t.ObjectExpression {
  if (literal === null) {
    return t.nullLiteral();
  }

  switch (typeof literal) {
    case 'function':
      throw new Error(/* TODO */);
    case 'number':
      return t.numericLiteral(literal);
    case 'string':
      return t.stringLiteral(literal);
    case 'boolean':
      return t.booleanLiteral(literal);
    case 'undefined':
      return t.unaryExpression('void', t.numericLiteral(0), true);
    default:
      if (Array.isArray(literal)) {
        return t.arrayExpression(literal.map(astify));
      }

      return t.objectExpression(
        Object.keys(literal)
          .filter(k => typeof (literal as Record<string, unknown>)[k] !== 'undefined')
          .map(k => t.objectProperty(t.stringLiteral(k), astify((literal as Record<string, unknown>)[k]))),
      );
  }
}
