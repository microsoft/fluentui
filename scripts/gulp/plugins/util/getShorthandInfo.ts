import * as Babel from '@babel/core';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

import { ComponentInfo } from './docs-types';

type ShorthandInfo = Required<Pick<ComponentInfo, 'implementsCreateShorthand' | 'mappedShorthandProp'>>;

/**
 * Checks that an expression matches signature:
 * [componentName].shorthandConfig = {[config]}
 */
const isShorthandConfigExpression = (componentName: string, path: NodePath<t.AssignmentExpression>): boolean => {
  const left = path.get('left');
  const right = path.get('right');

  if (!left.isMemberExpression() || !right.isObjectExpression()) {
    return false;
  }

  const object = left.get('object');
  const property = left.get('property') as NodePath<t.Identifier>;

  return object.isIdentifier({ name: componentName }) && property.isIdentifier({ name: 'shorthandConfig' });
};

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

/**
 * Checks that an expression is a compose() call.
 */
function isCompose(path: NodePath<t.Expression>): path is NodePath<t.CallExpression> {
  if (path.isCallExpression()) {
    if (path.get('callee').isIdentifier({ name: 'compose' })) {
      return true;
    }
  }

  return false;
}

const getShorthandInfo = (componentFile: t.File, componentName: string): ShorthandInfo => {
  let implementsCreateShorthand = false;
  let mappedShorthandProp: string = 'children';

  Babel.traverse(componentFile, {
    AssignmentExpression: path => {
      if (isShorthandConfigExpression(componentName, path)) {
        const configProperties = path.get('right.properties') as NodePath<t.ObjectProperty>[];
        const mappedProperty = configProperties.find((property: NodePath<t.ObjectProperty>) => {
          return (property.get('key') as NodePath<t.Identifier>).isIdentifier({ name: 'mappedProp' });
        });

        if (mappedProperty) {
          // @ts-ignore
          t.assertStringLiteral(mappedProperty.node.value);
          mappedShorthandProp = (mappedProperty.node.value as t.StringLiteral).value;
        }
      } else if (isShorthandExpression(componentName, path)) {
        implementsCreateShorthand = true;

        const config = path.get('right.arguments.0') as NodePath<t.ObjectExpression>;
        config.assertObjectExpression();

        const mappedProperty = (config.node.properties as any[]).find((property: t.ObjectProperty) => {
          return t.isIdentifier(property.key, { name: 'mappedProp' });
        }) as t.ObjectProperty | undefined;

        if (mappedProperty) {
          // @ts-ignore
          t.assertStringLiteral(mappedProperty.value);
          mappedShorthandProp = (mappedProperty.value as t.StringLiteral).value;
        }
      }
    },
    VariableDeclarator(path) {
      if (path.get('id').isIdentifier({ name: componentName })) {
        if (isCompose(path.get('init'))) {
          const composeConfigPath = path.get('init.arguments.1') as NodePath<t.ObjectExpression>;
          const composePropertiesPaths = composeConfigPath.get('properties');

          const shorthandConfigPath = composePropertiesPaths.find(
            property =>
              property.isObjectProperty() &&
              (property.get('key') as NodePath<t.Identifier>).isIdentifier({ name: 'shorthandConfig' }),
          ) as NodePath<t.ObjectProperty> | undefined;

          if (shorthandConfigPath) {
            const shorthandConfigPropertiesPaths = shorthandConfigPath.get('value.properties') as NodePath<
              t.ObjectProperty
            >[];
            const shorthandMappedPropertyPath = shorthandConfigPropertiesPaths.find(property =>
              (property.get('key') as NodePath<t.Identifier>).isIdentifier({ name: 'mappedProp' }),
            );

            if (shorthandMappedPropertyPath) {
              // @ts-ignore
              t.assertStringLiteral(shorthandMappedPropertyPath.node.value);
              mappedShorthandProp = (shorthandMappedPropertyPath.node.value as t.StringLiteral).value;
            }
          }
        }
      }
    },
  });

  return {
    implementsCreateShorthand,
    mappedShorthandProp,
  };
};

export default getShorthandInfo;
