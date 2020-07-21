import {
  JsxOpeningElement,
  JsxSelfClosingElement,
  SyntaxKind,
  VariableDeclarationKind,
  ts,
  Node,
  CodeBlockWriter,
} from 'ts-morph';
import { Maybe } from '../../maybe';
import { EnumMap, PropTransform } from '../types';

export function renameProp<T>(
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
        if (enumInJsx.just) {
          if (transform) {
            transform(enumInJsx.value);
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
              let newJSXFlag = false;
              const elementType = element.getKind();
              /* Need these data because ELEMENT is invalid if we call propsArrowFunction */
              let blockContainer = getBlockContainer(element);
              if (blockContainer === undefined) {
                blockContainer = propsArrowFunction(element);
                if (blockContainer === undefined) {
                  // eslint-disable-next-line no-throw-literal
                  throw 'Could not find block container.';
                }
                newJSXFlag = true;
              }
              const parentContainer = blockContainer.getParentIfKind(SyntaxKind.Block);
              if (parentContainer === undefined) {
                // eslint-disable-next-line no-throw-literal
                throw 'unable to get parent container from block';
              }
              parentContainer.insertStatements;
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
              let attrToRename = attribute;
              /* attribute is an iterator variable in the forEach function. */
              if (newJSXFlag) {
                const newSpreadProp = Maybe(blockContainer.getFirstDescendantByKind(SyntaxKind.JsxSpreadAttribute));
                const newJSXElem = Maybe(
                  blockContainer.getFirstDescendantByKind(
                    elementType as SyntaxKind.JsxOpeningElement | SyntaxKind.JsxSelfClosingElement,
                  ),
                );
                if (newSpreadProp.just && newJSXElem.just) {
                  attrToRename = newSpreadProp.value;
                  element = newJSXElem.value;
                }
              }
              /* Cannot use spreadProp because the node has been moved in the AST. */
              attrToRename.replaceWithText(`{...${newSpreadName}}`);
              element.addAttribute({
                name: replacementName,
                initializer: changeValueMap
                  ? `{${newMapName}[${toRename}]}`
                  : replacementValue
                  ? `{${replacementValue}}`
                  : `{${toRename}}`,
              });
              //console.log(parentContainer.getText());
              break;
            }
          }
        }
      }
    }
  });
}

/* This function is called if no block container could be found,
   meaning that the prop is in a function without a block for code,
   indicating a big-arrow function with no body. We will insert that
   block and then continue. */
function propsArrowFunction(element: JsxOpeningElement | JsxSelfClosingElement) {
  const firstAncestorInBlock = Maybe(
    element.getFirstAncestor(ans => {
      return ans.getKind() === SyntaxKind.ArrowFunction;
    }),
  );
  if (firstAncestorInBlock.just) {
    const oldBody = element.getText();
    const writer = new CodeBlockWriter();
    writer.block(() => {
      writer.write('return ');
      writer.write(oldBody);
    });
    element.replaceWithText(writer.toString());
    /* Need to re-acquire ELEMENT because of AST changes. */
    const newBlock = Maybe(firstAncestorInBlock.value.getFirstChildByKind(SyntaxKind.Block));
    const newElem = newBlock.then(val =>
      val.getFirstDescendant(child => {
        return child.getKind() === SyntaxKind.ReturnStatement;
      }),
    );
    return newElem.just ? newElem.value : undefined;
  }
}

/* Gets the parent that is a direct descendant of a block
   which should allow for better inserting */
function getBlockContainer(node: Node<ts.Node>) {
  return node.getFirstAncestor(ans => {
    const ansPar = ans.getParent();
    return ansPar?.getKind() === SyntaxKind.Block;
  });
}
