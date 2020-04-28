import * as Babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

import { ComponentInfo } from './docs-types';

type ShorthandInfo = Required<Pick<ComponentInfo, 'implementsCreateShorthand' | 'mappedShorthandProp'>>;

/**
 * Checks that an expression matches signature:
 * [componentName].create = createShorthandFactory([config])
 */
const isShorthandExpression = (componentName: string, path: NodePath<t.AssignmentExpression>): boolean => {
  const left = path.get('left');
  const right = path.get('right');

  if (!left.isMemberExpression() || !right.isCallExpression()) {
    return false;
  }

  const object = left.get('object');
  const property = left.get('property') as NodePath<t.Identifier>;
  const callee = right.get('callee');

  return (
    object.isIdentifier({ name: componentName }) &&
    property.isIdentifier({ name: 'create' }) &&
    callee.isIdentifier({ name: 'createShorthandFactory' })
  );
};

const getShorthandInfo = (componentFile: t.File, componentName: string): ShorthandInfo => {
  let implementsCreateShorthand = false;
  let mappedShorthandProp: string | undefined;

  Babel.traverse(componentFile, {
    AssignmentExpression: path => {
      if (isShorthandExpression(componentName, path)) {
        implementsCreateShorthand = true;

        const config = path.get('right.arguments.0') as NodePath<t.ObjectExpression>;
        config.assertObjectExpression();

        const mappedProperty = (config.node.properties as any[]).find((property: t.ObjectProperty) => {
          return t.isIdentifier(property.key, { name: 'mappedProp' });
        }) as t.ObjectProperty | null;

        if (mappedProperty) {
          // @ts-ignore
          t.assertStringLiteral(mappedProperty.value);
          mappedShorthandProp = (mappedProperty.value as t.StringLiteral).value;
        } else {
          // `mappedProp` is optional in `createShorthandFactory()`
          mappedShorthandProp = 'children';
        }
      }
    },
  });

  return {
    implementsCreateShorthand,
    mappedShorthandProp: mappedShorthandProp || '',
  };
};

export default getShorthandInfo;
