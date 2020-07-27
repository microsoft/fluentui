import {
  ts,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
  VariableDeclarationKind,
  CodeBlockWriter,
  Identifier,
  DefinitionInfo,
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
  /* Step 1: Figure out which attribute contains the spread prop. */
  const allAttributes = element.getAttributes();
  allAttributes.forEach(attribute => {
    console.log('trying it');
    if (attribute.getKind() === SyntaxKind.JsxSpreadAttribute) {
      console.log(attribute.getText());
      //const p = attribute.getFirstChildByKind(SyntaxKind.PropertyAccessExpression);
      //console.log(p?.getType().getProperties().length);
      const spreadProp = attribute.getFirstDescendantByKind(SyntaxKind.Identifier);
      /* Verify this attribute contains the name of our desired prop. */
      if (spreadContains(toRename, spreadProp)) {
        console.log('spread contains!');

        /* Step 2: Verify that the spread prop is legitimately defined as a variable.  */
        const propDefinitions = spreadProp!.getDefinitions();
        if (verifyVariableDefinition(propDefinitions)) {
          console.log('definition works!');

          /* Step 3: Create names for your new potential objects. */
          const propSpreadName = propDefinitions[0].getName();
          const newSpreadName = '__mig' + propSpreadName[0].toUpperCase() + propSpreadName.substring(1);
          const newMapName = '__migEnumMap';
          /* Metadata in case we need to reacquire the current element (AST modification). */
          let newJSXFlag = false;
          const elementType = element.getKind();

          /* Step 4: Get the container node who is the direct child of the closest SyntaxKind.Block.
             If we need to insert auxiliary variables, we'll insert them before this node. */
          let blockContainer = getBlockContainer(element);
          if (blockContainer === undefined) {
            /* In the case there was NO code block, the following function will create one for you.
               If successful, initialize the newJSXFlag because you'll need to reaquire the spread element. */
            const containerMaybe = createBlockContainer(element);
            if (containerMaybe.something) {
              blockContainer = containerMaybe.value;
              newJSXFlag = true;
            } else {
              // eslint-disable-next-line no-throw-literal
              throw 'attempt to create a new block around prop failed.';
            }
          }

          /* Step 5: Get the parent of BLOCKCONTAINER so that we can insert our own variable statements. */
          const parentContainer = blockContainer!.getParentIfKind(SyntaxKind.Block);
          if (parentContainer === undefined) {
            // eslint-disable-next-line no-throw-literal
            throw 'unable to get parent container from block';
          }

          /* Step 6: Get the index of BLOCKCONTAINER within PARENTCONTAINER that we'll use to insert our variables. */
          const insertIndex = blockContainer!.getChildIndex();
          if (insertIndex === undefined) {
            // eslint-disable-next-line no-throw-literal
            throw 'unable to find child index';
          }

          /* Step 7: Insert new variable statement deconstructing the spread prop, isolating the prop to be renamed. */
          if (!parentContainer.getVariableStatement(newSpreadName)) {
            parentContainer.insertVariableStatement(
              insertIndex,
              createDeconstructedProp(newSpreadName, toRename, propSpreadName),
            );
          }

          /* Step 8: Declare other auxiliary objects if necessary (i.e. value mapping case). */
          if (changeValueMap && !parentContainer.getVariableStatement(newMapName)) {
            parentContainer.insertVariableStatement(
              insertIndex,
              createAuxiliaryVariable(VariableDeclarationKind.Const, newMapName, JSON.stringify(changeValueMap)),
            );
          }

          /* Step 9: Handle any last auxiliary cases (i.e. component rendered with no body). */
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

          /* Step 10: Replace the props in the component with your new ones! */
          attrToRename.replaceWithText(`{...${newSpreadName}}`); // Replace old spread name.
          element.addAttribute({
            name: replacementName,
            initializer: changeValueMap
              ? `{${newMapName}[${toRename}]}`
              : replacementValue
              ? `{${replacementValue}}`
              : `{${toRename}}`,
          }); // Add the updated prop name and set its value.
        }
        console.log(element.getText()); // first case doesn't get this far :0
      }
    }
  });
}

/* Creates and returns a variable statement to the user's specification. KIND determines how
   the variable is declared (i.e. const), and the name and value (which must be in string form)
   will be inserted following. */
function createAuxiliaryVariable(kind: VariableDeclarationKind, varName: string, varValue: string) {
  return {
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: varName,
        initializer: varValue,
      },
    ],
  };
}

/* Creates and returns a variable statement deconstructing the spread prop into
   both a new spread prop and the desired prop to rename. */
function createDeconstructedProp(newSpreadPropName: string, toRename: string, oldSpreadPropName: string) {
  return {
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: `{${toRename}, ...${newSpreadPropName}}`,
        initializer: oldSpreadPropName,
      },
    ],
  };
}

/* Helper function that returns TRUE if the supplied spread object
   contains the prop we're looking for. Else returns FALSE. */
function spreadContains(oldPropName: string, spreadProp?: Identifier): boolean {
  console.log(spreadProp?.getType().getText()); // should not print "any"
  // const classDec = spreadProp?.getFirstAncestorByKind(SyntaxKind.ClassDeclaration);
  // //console.log(classDec?.getText());
  // const heritage = classDec?.getFirstChildByKind(SyntaxKind.HeritageClause);
  //console.log(heritage?.getText());
  // // const propName = heritage?.getFirstDescendantByKind(SyntaxKind.TypeReference);
  // const p = propName?.getFirstChildByKind(SyntaxKind.Identifier);
  // console.log(p?.getText());

  return false;
  // return (
  //   spreadProp !== undefined &&
  //   spreadProp
  //     .getType()
  //     .getProperties()
  //     .some(name => {
  //       console.log(name.getName());
  //       return name.getName() === oldPropName;
  //     })
  // );
}

/* Verifies that the spread object supplied is a variable
  defined by CONST or LET, or that it exists as a parameter or variable.
  Although an array is passed in, there should be only a single entry. */
function verifyVariableDefinition(propDefinitions: DefinitionInfo[]): boolean {
  if (propDefinitions.length !== 1) {
    return false;
  }
  const kind = propDefinitions[0].getKind();
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
function createBlockContainer(element: JsxOpeningElement | JsxSelfClosingElement) {
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
