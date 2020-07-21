import {
  ts,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
  VariableDeclarationKind,
  CodeBlockWriter,
  Identifier,
} from 'ts-morph';
import { ValueMap } from 'src/codeMods/types';
import { Maybe } from '../../../helpers/maybe';

/* Helper function to rename a prop if in a spread operator.  */
export function renamePropInSpread(
  element: JsxOpeningElement | JsxSelfClosingElement,
  toRename: string,
  replacementName: string,
  changeValueMap?: ValueMap<string>,
  replacementValue?: string,
) {
  const allAttributes = element.getAttributes();
  allAttributes.forEach(attribute => {
    if (attribute.getKind() === SyntaxKind.JsxSpreadAttribute) {
      /* Get the name of the object that houses the prop. */
      const spreadProp = attribute.getFirstChildByKind(SyntaxKind.Identifier);
      if (spreadContains(toRename, spreadProp)) {
        /* If we've found our prop inside the object,
          continue attempt to rename it. */
        const propKind = spreadProp!.getDefinitions();
        if (propKind.length === 1) {
          const newSpreadName = '__mig' + propKind[0].getName()[0].toUpperCase() + propKind[0].getName().substring(1);
          const newMapName = '__migEnumMap';
          if (verifyVariableDefinition(propKind[0].getKind())) {
            const propContainingObject = propKind[0];
            let newJSXFlag = false;
            const elementType = element.getKind();
            /* Need these data because ELEMENT is invalid if we call propsArrowFunction */
            let blockContainer = getBlockContainer(element);
            if (blockContainer === undefined) {
              const containerMaybe = propsArrowFunction(element);
              if (containerMaybe.something) {
                blockContainer = containerMaybe.value;
                newJSXFlag = true;
              } else {
                // eslint-disable-next-line no-throw-literal
                throw 'attempt to create a new block around prop failed.';
              }
            }
            const parentContainer = blockContainer!.getParentIfKind(SyntaxKind.Block);
            if (parentContainer === undefined) {
              // eslint-disable-next-line no-throw-literal
              throw 'unable to get parent container from block';
            }
            //parentContainer.insertStatements;
            const insertIndex = blockContainer!.getChildIndex();
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
              const newSpreadProp = Maybe(blockContainer!.getFirstDescendantByKind(SyntaxKind.JsxSpreadAttribute));
              const newJSXElem = Maybe(
                blockContainer!.getFirstDescendantByKind(
                  elementType as SyntaxKind.JsxOpeningElement | SyntaxKind.JsxSelfClosingElement,
                ),
              );
              if (newSpreadProp.something && newJSXElem.something) {
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
          }
        }
      }
    }
  });
}

/* Helper function that returns TRUE if the supplied spread object
   contains the prop we're looking for. Else returns FALSE. */
function spreadContains(oldPropName: string, spreadProp?: Identifier): boolean {
  return (
    spreadProp !== undefined &&
    spreadProp
      .getType()
      .getProperties()
      .some(name => name.getName() === oldPropName)
  );
}

/* Verifies that the spread object supplied is a variable
  defined by CONST or LET, or that it exists as a parameter or variable. */
function verifyVariableDefinition(kind: ts.ScriptElementKind): boolean {
  return (
    kind === ts.ScriptElementKind.constElement ||
    kind === ts.ScriptElementKind.letElement ||
    kind === ts.ScriptElementKind.variableElement ||
    kind === ts.ScriptElementKind.parameterElement
  );
}

/* This function is called if no block container could be found,
   meaning that the prop is in a function without a block for code,
   indicating a big-arrow function with no body. We will insert that
   block and then continue. */
function propsArrowFunction(element: JsxOpeningElement | JsxSelfClosingElement) {
  return Maybe(
    element.getFirstAncestor(ans => {
      return ans.getKind() === SyntaxKind.ArrowFunction;
    }),
  )
    .then(ans => {
      const oldBody = element.getText();
      const writer = new CodeBlockWriter();
      writer.block(() => {
        writer.write('return ');
        writer.write(oldBody);
      });
      element.replaceWithText(writer.toString());
      return ans.getFirstChildByKind(SyntaxKind.Block);
    })
    .then(block => {
      return block.getFirstDescendant(child => {
        return child.getKind() === SyntaxKind.ReturnStatement;
      });
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
