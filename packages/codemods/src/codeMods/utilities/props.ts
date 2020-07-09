import {
  JsxAttribute,
  JsxOpeningElement,
  JsxSelfClosingElement,
  SyntaxKind,
  VariableDeclarationKind,
  ts,
  Node,
} from 'ts-morph';
import { EnumMap } from '../types';

export function renameProp(
  instances: (JsxOpeningElement | JsxSelfClosingElement)[],
  toRename: string,
  replacementName: string,
  valueName: string | undefined,
  changeValueMap: EnumMap | undefined,
) {
  instances.forEach(val => {
    /* For each instance, first see if desired prop exists in the open. */

    let foundProp = val.getAttribute(toRename);
    if (foundProp) {
      /* If found, do a simple name-replacementName. */
      foundProp.set({ name: replacementName });
      if (valueName) {
        if (changeValueMap) {
          /* If both are true, we have an enum and might have to change enum name AND value. */
          let enumValue = (foundProp as JsxAttribute)
            .getFirstChildByKind(SyntaxKind.JsxExpression)
            .getFirstChildByKind(SyntaxKind.PropertyAccessExpression);
          let firstEnumElem = enumValue.getFirstChildByKind(SyntaxKind.Identifier);
          let secondEnumElem = enumValue.getLastChildByKind(SyntaxKind.Identifier);
          firstEnumElem.rename(valueName);
          secondEnumElem.rename(changeValueMap[secondEnumElem.getText()]);
        } else {
          /* If we don't have an enum, but we do have a value, only change the value of the prop to valueName. */
          foundProp.set({ initializer: valueName });
        }
      }
    } else {
      /* If the prop is not found, check to see if the prop is in a spread attribute. */
      renamePropInSpread(val, toRename, replacementName);
    }
  });
}

/* Helper function to rename a prop if in a spread operator.  */
function renamePropInSpread(
  element: JsxOpeningElement | JsxSelfClosingElement,
  toRename: string,
  replacementName: string,
) {
  let allAttributes = element.getAttributes();
  allAttributes.forEach(attribute => {
    if (attribute.getKind() == SyntaxKind.JsxSpreadAttribute) {
      /* Get the name of the object that houses the prop. */
      let spreadProp = attribute.getFirstChildByKind(SyntaxKind.Identifier);
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
          let newSpreadName = '__mig' + propKind[0].getName()[0].toUpperCase() + propKind[0].getName().substring(1);

          switch (propKind[0].getKind()) {
            case ts.ScriptElementKind.constElement:
            case ts.ScriptElementKind.letElement:
            case ts.ScriptElementKind.variableElement:
            case ts.ScriptElementKind.parameterElement: {
              const propContainingObject = propKind[0];
              const blockContainer = getBlockContainer(element);
              const parentContainer = blockContainer?.getParentIfKind(SyntaxKind.Block);
              const insertIndex = blockContainer?.getChildIndex();
              if (insertIndex === undefined) {
                throw 'unable to find child index';
              }
              if (!parentContainer?.getVariableStatement(newSpreadName)) {
                parentContainer?.insertVariableStatement(insertIndex, {
                  declarationKind: VariableDeclarationKind.Const,
                  declarations: [
                    {
                      name: `{${toRename}, ...${newSpreadName}}`,
                      initializer: propContainingObject.getName(),
                    },
                  ],
                });
              }
              spreadProp.replaceWithText(newSpreadName);
              element.addAttribute({
                name: replacementName,
                initializer: `{${toRename}}`,
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
