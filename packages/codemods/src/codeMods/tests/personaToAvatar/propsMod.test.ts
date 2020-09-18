import { Project, SyntaxKind, JsxAttributeStructure } from 'ts-morph';
import { renamePrimaryTextProp, renameRenderCoin } from '../../mods/personaToAvatar/personaToAvatar.mod';
import { findJsxTag } from '../../utilities';
const personaPath = '/**/tests/mock/**/persona/**/*.tsx';
// @TODO ensure that props are not renamed for non fabric personas if they exist

const personaPropsFile = 'mPersonaProps.tsx';
const personaSpreadPropsFile = 'mPersonaSpreadProps.tsx';

describe('Persona props mod tests', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}${personaPath}`);
  });

  it('can replace jsx inline primaryText prop', () => {
    const file = project.getSourceFileOrThrow('mPersonaProps.tsx');
    renamePrimaryTextProp(file);
    const elements = findJsxTag(file, 'Persona');
    elements.forEach(val => {
      expect(val.getAttribute('primaryText')).not.toBeTruthy();
    });
  });

  it('can replace jsx inline primaryText without changing the value', () => {
    const file = project.getSourceFileOrThrow(personaPropsFile);
    const values = findJsxTag(file, 'Persona');
    const attValues = values.map(val => {
      return (val.getAttribute('primaryText')?.getStructure() as JsxAttributeStructure)?.initializer;
    });
    renamePrimaryTextProp(file);
    const elements = findJsxTag(file, 'Persona');
    elements.forEach((val, index) => {
      expect((val.getAttribute('text')?.getStructure() as JsxAttributeStructure)?.initializer).toEqual(
        attValues[index],
      );
    });
  });

  it('can replace jsx spread primaryText', () => {
    const file = project.getSourceFileOrThrow(personaSpreadPropsFile);
    renamePrimaryTextProp(file);
    const els = findJsxTag(file, 'Persona');
    els.forEach(val => {
      val.getAttributes().forEach(att => {
        if (att.getKind() === SyntaxKind.JsxSpreadAttribute) {
          // This is really the best way to figure out if the spread property is expected to have the prop
          // that we care about. This won't catch all cases but for testing it's a good place to start.
          att
            .getFirstChildByKind(SyntaxKind.Identifier)
            ?.getType()
            .getProperties()
            .forEach(prop => {
              expect(prop.getName()).not.toEqual('primaryText');
            });
        }
      });
    });
  });

  it('can replace personaCoin render', () => {
    const file = project.getSourceFileOrThrow(personaPropsFile);
    renameRenderCoin(file);
    const els = findJsxTag(file, 'Persona');
    els.forEach(val => {
      expect(val.getAttribute('onRenderCoin')).toBeFalsy();
    });
  });
});
