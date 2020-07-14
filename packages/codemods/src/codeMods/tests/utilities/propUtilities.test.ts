import { renameProp, findJsxTag } from '../../utilities';
import { Project, SyntaxKind, JsxAttribute, EnumDeclaration } from 'ts-morph';
import { EnumMap } from '../../types';

const personaPropsFile = 'mPersonaProps.tsx';
const personaSpreadPropsFile = 'mPersonaSpreadProps.tsx';
const spinnerPropsFile = 'mSpinnerProps.tsx';
const spinnerSpreadPropsFile = 'mSpinnerSpreadProps.tsx';
const DropdownPropsFile = 'mDropdownProps.tsx';
const DropdownSpreadPropsFile = 'mDropdownSpreadProps.tsx';

const deprecatedPropName = 'imageShouldFadeIn';
const newPropName = 'imageShouldFadeInwootwoot';

/* Developer will provide a mapping of Enum Values, if necessary. */
// TODO it's not ideal that devs need to write the enum name before every token.
const spinnerMap: EnumMap<string> = {
  'SpinnerType.normal': 'SpinnerSize.medium',
  'SpinnerType.large': 'SpinnerSize.large',
};

describe('Props Utilities Test', () => {
  let project: Project;
  beforeEach(() => {
    project = new Project();
    project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/**/*.tsx`);
  });
  describe('Normal Prop Renaming', () => {
    it('[SANITY] can ID the correct file and get the JSX elements', () => {
      const file = project.getSourceFileOrThrow(personaPropsFile);
      const tags = findJsxTag(file, 'Persona');
      expect(tags.length).toEqual(2);
    });

    it('can rename props in a primitive', () => {
      const file = project.getSourceFileOrThrow(personaPropsFile);
      const tags = findJsxTag(file, 'Persona');
      renameProp(tags, deprecatedPropName, newPropName);
      tags.forEach(tag => {
        expect(tag.getAttribute('imageShouldFadeIn')).toBeFalsy();
      });
    });

    it('can rename props in a spread attribute', () => {
      const file = project.getSourceFileOrThrow(personaSpreadPropsFile);
      const tags = findJsxTag(file, 'Persona');
      renameProp(tags, 'primaryText', 'Text', undefined);
      tags.forEach(val => {
        val.getAttributes().forEach(att => {
          if (att.getKind() === SyntaxKind.JsxSpreadAttribute) {
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
  });

  describe('Edge Case Tests (changes in value)', () => {
    it('[SANITY] can ID the correct file and get the JSX elements', () => {
      const file = project.getSourceFileOrThrow(DropdownPropsFile);
      const tags = findJsxTag(file, 'Dropdown');
      expect(tags.length).toEqual(2);
    });

    it('can rename and replace the values of props (primitives)', () => {
      const file = project.getSourceFileOrThrow(DropdownPropsFile);
      const tags = findJsxTag(file, 'Dropdown');
      renameProp(tags, 'isDisabled', 'disabled', undefined, 'false');
      tags.forEach(tag => {
        expect(tag.getAttribute('isDisabled')).toBeFalsy();
        let val = tag.getAttribute('disabled').getFirstChildByKind(SyntaxKind.JsxExpression);
        expect(val.getText().substring(1, val.getText().length - 1)).toEqual('false');
      });
    });

    it('can replace props with changed values in a spread attribute', () => {
      const file = project.getSourceFileOrThrow(DropdownSpreadPropsFile);
      const tags = findJsxTag(file, 'Dropdown');
      renameProp(tags, 'isDisabled', 'disabled', undefined, 'false');
      tags.forEach(val => {
        val.getAttributes().forEach(att => {
          if (att.getKind() === SyntaxKind.JsxSpreadAttribute) {
            att
              .getFirstChildByKind(SyntaxKind.Identifier)
              ?.getType()
              .getProperties()
              .forEach(prop => {
                expect(prop.getName()).not.toEqual('isDisabled');
              });
          }
        });
      });
    });
  });

  describe('Edge Case Tests (enums)', () => {
    it('[SANITY] can ID the correct file and get the JSX elements', () => {
      const file = project.getSourceFileOrThrow(spinnerPropsFile);
      const tags = findJsxTag(file, 'Spinner');
      expect(tags.length).toEqual(2);
    });

    it('can replace props with changed enum values', () => {
      const file = project.getSourceFileOrThrow(spinnerPropsFile);
      const tags = findJsxTag(file, 'Spinner');
      let oldEnumValues: string[] = ['SpinnerType.large', 'SpinnerType.normal'];
      renameProp(tags, 'type', 'size', spinnerMap);
      tags.forEach(tag => {
        expect(tag.getAttribute('type')).toBeFalsy();
        let currentEnumValue = oldEnumValues.pop();
        let inner = (tag.getAttribute('size') as JsxAttribute)
          .getFirstChildByKind(SyntaxKind.JsxExpression)
          .getFirstChildByKind(SyntaxKind.PropertyAccessExpression);
        expect(inner).toBeTruthy();
        const newVal = spinnerMap[currentEnumValue];
        expect(inner.getLastChildByKind(SyntaxKind.Identifier).getText()).toEqual(
          newVal.substring(newVal.indexOf('.') + 1),
        );
        expect(inner.getFirstChildByKind(SyntaxKind.Identifier).getText()).toEqual('SpinnerSize');
      });
    });

    it('can replace props with changed enum values in a spread attribute', () => {
      const file = project.getSourceFileOrThrow(spinnerSpreadPropsFile);
      const tags = findJsxTag(file, 'Spinner');
      renameProp(tags, 'type', 'size', spinnerMap);
      tags.forEach(val => {
        val.getAttributes().forEach(att => {
          if (att.getKind() === SyntaxKind.JsxSpreadAttribute) {
            att
              .getFirstChildByKind(SyntaxKind.Identifier)
              ?.getType()
              .getProperties()
              .forEach(prop => {
                expect(prop.getName()).not.toEqual('SpinnerType');
              });
          }
        });
      });
    });
  });
});
