import * as Babel from '@babel/core';
import generate from '@babel/generator';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

import { Props } from './docgen';

type ParseDefaultPropValueOptions = {
  componentAst: t.File;
  componentName: string;
  props: Props;
};

export default function parseDefaultPropsValues(options: ParseDefaultPropValueOptions): Record<string, any> {
  const { componentAst, componentName, props } = options;
  const defaultValues: Record<string, any> = {};

  Babel.traverse(componentAst, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    AssignmentExpression(expressionPath) {
      const leftExpressionPath = expressionPath.get('left');

      const isDefaultPropsExpression =
        leftExpressionPath.isMemberExpression() &&
        leftExpressionPath.get('object').isIdentifier({ name: componentName }) &&
        leftExpressionPath.get('property').isIdentifier({ name: 'defaultProps' });

      if (!isDefaultPropsExpression) {
        return;
      } else {
        expressionPath.stop();
      }

      const defaultProps = leftExpressionPath.parentPath.get('right.properties') as NodePath<
        t.ObjectProperty | t.ObjectMethod
      >[];

      defaultProps.forEach(propPath => {
        const propKeyPath = propPath.get('key');

        if (!propKeyPath.isIdentifier()) {
          return;
        }

        const propName = propKeyPath.node.name;

        if (!props[propName]) {
          return;
        }

        if (propPath.isObjectMethod()) {
          defaultValues[propName] = 'function';
        } else {
          const propertyValue = (propPath as NodePath<t.ObjectProperty>).get('value');

          if (propertyValue.isBooleanLiteral() || propertyValue.isNumericLiteral() || propertyValue.isStringLiteral()) {
            defaultValues[propName] = propertyValue.node.value;
          } else if (propertyValue.isIdentifier()) {
            defaultValues[propName] = propertyValue.node.name;
          } else if (propertyValue.isNullLiteral()) {
            defaultValues[propName] = null;
          } else if (
            propertyValue.isArrayExpression() ||
            propertyValue.isMemberExpression() ||
            propertyValue.isJSXElement() ||
            propertyValue.isObjectExpression()
          ) {
            defaultValues[propName] = generate(propertyValue.node).code;
          } else if (propertyValue.isArrowFunctionExpression()) {
            defaultValues[propName] = 'function';
          } else if (propName === 'as') {
            defaultValues[propName] = 'div';
          } else {
            throw new Error(`Can't parse a value in "${componentName}.defaultProps.${propName}"`);
          }
        }
      });
    },
  });

  return defaultValues;
}
