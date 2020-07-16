import { JsxOpeningElement, JsxSelfClosingElement, SyntaxKind, VariableDeclarationKind, ts, Node } from 'ts-morph';
import { Maybe } from '../../maybe';
import { EnumMap, PropTransform } from '../types';

export function renameProp(
  instances: (JsxOpeningElement | JsxSelfClosingElement)[],
  toRename: string,
  replacementName: string,
  changeValueMap?: EnumMap<string>,
  replacementValue?: string,
  transform?: PropTransform,
) {
  instances.forEach(val => {
    /* For each instance, first see if desired prop exists in the open. */
    const foundProp = Maybe(val.getAttribute(toRename));

    if (foundProp.just) {
      /* If found, do a simple name-replacementName. */
      foundProp.value.set({ name: replacementName });
      if (replacementValue) {
        foundProp.value.set({ initializer: `{${replacementValue}}` });
      } else {
        const enumInJsx = Maybe(foundProp.value.getFirstChildByKind(SyntaxKind.JsxExpression));
        const enumExp = enumInJsx.then(value => {
          return Maybe(value.getFirstChildByKind(SyntaxKind.PropertyAccessExpression));
        });
        if (enumInJsx.just) {
          if (transform) {
            transform(enumInJsx.value);
          } else if (enumExp.just && changeValueMap) {
            /* Change the value of the enum via map conversion. */
            if (enumExp.just) {
              const oldEnumName = enumExp.then(value => {
                return value.getText();
              });
              if (oldEnumName.just) {
                const newEnumName = changeValueMap[oldEnumName.value];
                const firstEnumChild = enumExp.then(value => {
                  return value.getFirstChildByKind(SyntaxKind.Identifier);
                });
                const lastEnumChild = enumExp.then(value => {
                  return value.getLastChildByKind(SyntaxKind.Identifier);
                });
                if (firstEnumChild.just && lastEnumChild.just) {
                  firstEnumChild.value.replaceWithText(newEnumName.substring(0, newEnumName.indexOf('.')));
                  lastEnumChild.value.replaceWithText(newEnumName.substring(newEnumName.indexOf('.') + 1));
                }
              }
            }
          }
        }
      }
    } else {
      /* If the prop is not found, check to see if the prop is in a spread attribute. */
      renamePropInSpread(val, toRename, replacementName, changeValueMap);
    }
  });
}

/* Helper function to rename a prop if in a spread operator.  */
function renamePropInSpread(
  element: JsxOpeningElement | JsxSelfClosingElement,
  toRename: string,
  replacementName: string,
  changeValueMap?: EnumMap<string>,
  replacementValue?: string,
) {
  const allAttributes = element.getAttributes();
  allAttributes.forEach(attribute => {
    if (attribute.getKind() === SyntaxKind.JsxSpreadAttribute) {
      /* Get the name of the object that houses the prop. */
      const spreadProp = attribute.getFirstChildByKind(SyntaxKind.Identifier);
      if (
        spreadProp &&
        spreadProp
          .getType()
          .getProperties()
          .some(name => name.getName() === toRename)
      ) {
        /* If we've found our prop inside the object,
          continue attempt to rename it. */
        const propKind = spreadProp.getDefinitions();
        if (propKind.length === 1) {
          const newSpreadName = '__mig' + propKind[0].getName()[0].toUpperCase() + propKind[0].getName().substring(1);
          const newMapName = '__migEnumMap';
          switch (propKind[0].getKind()) {
            case ts.ScriptElementKind.constElement:
            case ts.ScriptElementKind.letElement:
            case ts.ScriptElementKind.variableElement:
            case ts.ScriptElementKind.parameterElement: {
              const propContainingObject = propKind[0];
              const blockContainer = getBlockContainer(element);
              if (blockContainer === undefined) {
                // eslint-disable-next-line no-throw-literal
                throw 'unable to get block container from expression';
              }
              const parentContainer = blockContainer.getParentIfKind(SyntaxKind.Block);
              if (parentContainer === undefined) {
                // eslint-disable-next-line no-throw-literal
                throw 'unable to get parent container from block';
              }
              const insertIndex = blockContainer.getChildIndex();
              if (insertIndex === undefined) {
                // eslint-disable-next-line no-throw-literal
                throw 'unable to find child index';
              }
              if (!parentContainer.getVariableStatement(newSpreadName)) {
                parentContainer.insertVariableStatement(insertIndex, {
                  declarationKind: VariableDeclarationKind.Const,
                  declarations: [
                    {
                      name: `{${toRename}, ...${newSpreadName}}`,
                      initializer: propContainingObject.getName(),
                    },
                  ],
                });
              }
              if (changeValueMap && !parentContainer.getVariableStatement(newMapName)) {
                parentContainer.insertVariableStatement(insertIndex, {
                  declarationKind: VariableDeclarationKind.Const,
                  declarations: [
                    {
                      name: newMapName,
                      initializer: JSON.stringify(changeValueMap),
                    },
                  ],
                });
              }
              spreadProp.replaceWithText(newSpreadName);
              element.addAttribute({
                name: replacementName,
                initializer: changeValueMap
                  ? `{${newMapName}[${toRename}}`
                  : replacementValue
                  ? `{${replacementValue}}`
                  : `{${toRename}}`,
              });
              break;
            }
          }
        }
      }
    }
  });
}

/* Gets the parent that is a direct descendant of a block
   which should allow for better inserting */
function getBlockContainer(node: Node<ts.Node>) {
  return node.getFirstAncestor(ans => {
    const ansPar = ans.getParent();
    return ansPar?.getKind() === SyntaxKind.Block;
  });
}
