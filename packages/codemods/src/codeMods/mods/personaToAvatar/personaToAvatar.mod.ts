import {
  SourceFile,
  SyntaxKind,
  JsxSpreadAttribute,
  VariableDeclarationKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
  ts,
  Node,
} from 'ts-morph';
import { findJsxTag, appendOrCreateNamedImport } from '../../utilities/index';
import { CodeMod, ModError, ModResult } from '../../types';
import { Ok, Err } from '../../../helpers/result';

const personaPath = 'office-ui-fabric-react/lib/Persona';

// This file was intended as a proof of concept and will stay around for now
// Until such time that it will get turned into a more explicit and generic example
export function renameProperty(
  elements: (JsxOpeningElement | JsxSelfClosingElement)[],
  attributeName: string,
  attributeReplacement: string,
) {
  elements.forEach(val => {
    const att = val.getAttribute(attributeName);
    if (att) {
      att.set({ name: attributeReplacement });
    } else {
      const atts = val.getAttributes();
      atts.forEach(a => {
        if (a.getKind() === SyntaxKind.JsxSpreadAttribute) {
          const id = (a as JsxSpreadAttribute).getFirstChildByKind(SyntaxKind.Identifier);
          if (id) {
            // If the type of the property has the attribute that we are looking for, then do what needs to be done.
            if (
              id
                .getType()
                .getProperties()
                .some(typeVal => {
                  return typeVal.getName() === attributeName;
                })
            ) {
              const def = id.getDefinitions();
              if (def.length === 1) {
                switch (def[0].getKind()) {
                  case ts.ScriptElementKind.constElement:
                  case ts.ScriptElementKind.letElement:
                  case ts.ScriptElementKind.variableElement:
                  case ts.ScriptElementKind.parameterElement: {
                    const tDef = def[0];
                    const bl = getBlockContainer(val);
                    const p = bl?.getParentIfKind(SyntaxKind.Block);
                    const insIndex = bl?.getChildIndex();
                    if (insIndex === undefined) {
                      throw new Error('unable to find child index');
                    }
                    if (!p?.getVariableStatement('__migPersonaProps')) {
                      p?.insertVariableStatement(insIndex, {
                        declarationKind: VariableDeclarationKind.Const,
                        declarations: [
                          {
                            name: `{${attributeName}, ...__migPersonaProps}`,
                            initializer: tDef.getName(),
                          },
                        ],
                      });
                    }

                    id.replaceWithText('__migPersonaProps');
                    val.addAttribute({
                      name: attributeReplacement,
                      initializer: `{${attributeName}}`,
                    });
                    break;
                  }
                }
              }
            }
          }
        }
      });
    }
  });
}

export function replacePersonaImport(file: SourceFile) {
  let found = false;
  file.getImportDeclarations().forEach(imp => {
    if (imp.getModuleSpecifierValue() === personaPath) {
      imp.getNamedImports().forEach(val => {
        if (val.getText() === 'Persona') {
          found = true;
          val.renameAlias('Avatar');
          val.remove();
        }
      });
    }
  });
  if (found) {
    appendOrCreateNamedImport(file, 'office-ui-fabric-react/lib/Avatar', ['Avatar']);
  }
}

export function replaceIPersonaPropsImport(file: SourceFile) {
  // Figure out if I should actually make this change
  // TODO need to test with a variety of things, maybe one that serves as a passthrough
  let found = false;
  file.getImportDeclarations().forEach(imp => {
    if (imp.getModuleSpecifierValue() === personaPath) {
      imp.getNamedImports().forEach(val => {
        if (val.getText() === 'IPersonaProps') {
          val.renameAlias('AvatarProps');
          val.remove();
          found = true;
        }
      });
    }
  });
  if (found) {
    appendOrCreateNamedImport(file, 'office-ui-fabric-react/lib/Avatar', ['AvatarProps']);
  }
}

export function replacePersonaSizeImport(file: SourceFile) {
  let found = false;
  file.getImportDeclarations().forEach(imp => {
    if (imp.getModuleSpecifierValue() === personaPath) {
      imp.getNamedImports().forEach(val => {
        if (val.getText() === 'PersonaSize') {
          found = true;
          val.renameAlias('AvatarSize');
          val.remove();
        }
      });
    }
  });
  if (found) {
    appendOrCreateNamedImport(file, 'office-ui-fabric-react/lib/Avatar', ['AvatarSize']);
  }
}

// Gets the parent that is a direct descendant of a block
// Which should allow for better inserting
function getBlockContainer(node: Node<ts.Node>) {
  return node.getFirstAncestor(ans => {
    const ansPar = ans.getParent();
    return ansPar?.getKind() === SyntaxKind.Block;
  });
}

export function renamePrimaryTextProp(file: SourceFile) {
  // Should this fix the naming if the Persona Component has already been renamed to Avatar
  const elements = findJsxTag(file, 'Persona');
  renameProperty(elements, 'primaryText', 'text');
}

export function renameRenderCoin(file: SourceFile) {
  // Should this fix the naming if the Persona Component has already been renamed to Avatar

  const elements = findJsxTag(file, 'Persona');
  renameProperty(elements, 'onRenderCoin', 'onRenderAvatarCoin');
}

const PersonaToAvatarMod: CodeMod = {
  run: (file: SourceFile) => {
    try {
      replacePersonaImport(file);
      replaceIPersonaPropsImport(file);
      replacePersonaSizeImport(file);
      renamePrimaryTextProp(file);
      renameRenderCoin(file);
    } catch (e) {
      return Err<ModResult, ModError>({ error: e });
    }
    return Ok({ logs: ['Replaced Persona with Avatar'] });
  },
  version: '100000',
  name: 'PersonaToAvatar',
  enabled: false,
};

export default PersonaToAvatarMod;
