import { Project, SyntaxKind, InterfaceDeclaration, TypeReferenceNode, PropertyAccessExpression } from 'ts-morph';
import {
  replacePersonaImport,
  replaceIPersonaPropsImport,
  replacePersonaSizeImport,
} from '../../mods/personaToAvatar/personaToAvatar.mod';
import { findJsxTag } from '../../utilities';
const personaPath = '/**/tests/mock/**/persona/**/*.tsx';

describe('Persona component mod', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}${personaPath}`);
  });

  it('can replace persona with avatar', () => {
    const file = project.getSourceFileOrThrow('mFunction.tsx');
    replacePersonaImport(file);
    file.getImportDeclarations().forEach(imp => {
      imp.getNamedImports().forEach(name => {
        expect(name.getText()).not.toEqual('Persona');
      });
      expect(findJsxTag(file, 'Persona').length).toBe(0);
    });
  });

  it('can replace IPersonaProps with AvatarProps', () => {
    const file = project.getSourceFileOrThrow('mInterface.tsx');
    replaceIPersonaPropsImport(file);
    file.getImportDeclarations().forEach(imp => {
      imp.getNamedImports().forEach(name => {
        expect(name.getText()).not.toEqual('IPersonaProps');
      });
      file.forEachDescendant(val => {
        switch (val.getKind()) {
          case SyntaxKind.InterfaceDeclaration: {
            const tVal = val as InterfaceDeclaration;
            const struct = tVal.getStructure();
            expect(
              (struct.extends as string[])?.some(str => {
                return str === 'IPersonaProps';
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
    replacePersonaSizeImport(file);

    file.forEachDescendant(val => {
      // I believe that these are really the only two cases that a reference to PersonaSize
      // can be used. If we find others, there are other case statements that should be added
      switch (val.getKind()) {
        case SyntaxKind.TypeReference: {
          const tdesc = val as TypeReferenceNode;
          expect(tdesc.getText()).not.toEqual('PersonaSize');
          break;
        }
        case SyntaxKind.PropertyAccessExpression: {
          const tdesc = val as PropertyAccessExpression;
          expect(tdesc.getFirstChild()?.getText()).not.toEqual('PersonaSize');
          break;
        }
      }
    });
  });
});
