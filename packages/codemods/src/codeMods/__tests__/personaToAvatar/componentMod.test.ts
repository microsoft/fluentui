import { Project, SyntaxKind, InterfaceDeclaration, TypeReferenceNode, PropertyAccessExpression } from 'ts-morph';
import {
  ReplacePersonaImport,
  ReplaceIPersonaPropsImport,
  ReplacePersonaSizeImport,
} from '../../mods/PersonaToAvatar/PersonaToAvatar.mod';
import { findJsxTag } from '../../utilities';
const personaPath = '/**/__tests__/mock/**/persona/**/*.tsx';

describe('Persona component mod tests', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}${personaPath}`);
  });

  it('can replace persona with avatar', () => {
    const file = project.getSourceFileOrThrow('mFunction.tsx');
    ReplacePersonaImport(file);
    file.getImportDeclarations().forEach(imp => {
      imp.getNamedImports().forEach(name => {
        expect(name.getText()).not.toEqual('Persona');
      });
      expect(findJsxTag(file, 'Persona').length).toBe(0);
    });
  });

  it('can replace IPersonaProps with AvatarProps', () => {
    const file = project.getSourceFileOrThrow('mInterface.tsx');
    ReplaceIPersonaPropsImport(file);
    file.getImportDeclarations().forEach(imp => {
      imp.getNamedImports().forEach(name => {
        expect(name.getText()).not.toEqual('IPersonaProps');
      });
      file.forEachDescendant(val => {
        switch (val.getKind()) {
          case SyntaxKind.InterfaceDeclaration: {
            let tVal = val as InterfaceDeclaration;
            const struct = tVal.getStructure();
            expect(
              (struct.extends as string[])?.some(val => {
                return val === 'IPersonaProps';
              }),
            ).toBe(false);
            break;
          }
          case SyntaxKind.TypeReference: {
            expect((val as TypeReferenceNode).getText()).not.toEqual('IPersonaProps');
          }
        }
      });
    });
  });

  it('can replace PersonaSize with AvatarSize', () => {
    const file = project.getSourceFileOrThrow('mWithPersonaSize.tsx');
    ReplacePersonaSizeImport(file);

    file.forEachDescendant(val => {
      // I believe that these are really the only two cases that a reference to PersonaSize
      // can be used. If we find others, there are other case statements that should be added
      switch (val.getKind()) {
        case SyntaxKind.TypeReference: {
          let tdesc = val as TypeReferenceNode;
          expect(tdesc.getText()).not.toEqual('PersonaSize');
          break;
        }
        case SyntaxKind.PropertyAccessExpression: {
          let tdesc = val as PropertyAccessExpression;
          expect(tdesc.getFirstChild()?.getText()).not.toEqual('PersonaSize');
          break;
        }
      }
    });
  });
});
