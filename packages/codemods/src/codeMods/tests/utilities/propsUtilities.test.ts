import { renameProp, findJsxTag } from '../../utilities';
import { Project, SyntaxKind, JsxAttribute } from 'ts-morph';
import { EnumMap, propTransform } from '../../types';

const project = new Project();
project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/**/*.tsx`);

const personaPropsFile = 'mPersonaProps.tsx';
const personaSpreadPropsFile = 'mPersonaSpreadProps.tsx';
const spinnerPropsFile = 'mSpinnerProps.tsx';

const deprecatedPropName = 'imageShouldFadeIn';
const newPropName = 'imageShouldFadeInwootwoot';

/* Developer will provide a mapping of Enum Values, if necessary. */
// TODO it's not ideal that devs need to write the enum name before every token.
const spinnerMap: EnumMap<string> = {
  'SpinnerType.normal': 'SpinnerSize.medium',
  'SpinnerType.large': 'SpinnerSize.large',
};

describe('Props Utilities Test (Persona)', () => {
  it('[SANITY] can ID the correct file and get the JSX elements', () => {
    const file = project.getSourceFileOrThrow(personaPropsFile);
    const tags = findJsxTag(file, 'Persona');
    expect(tags.length).toEqual(2);
  });

  it('can rename props in a primitive', () => {
    let fn = (b: boolean) => {
      if (b) console.log('twas true');
      else console.log('twas false');
      return 'no-op';
    };

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

describe('Props Utilities Test (Spinner)', () => {
  it('[SANITY] can ID the correct file and get the JSX elements', () => {
    const file = project.getSourceFileOrThrow(spinnerPropsFile);
    const tags = findJsxTag(file, 'Spinner');
    expect(tags.length).toEqual(2);
  });

  it('can replace props with changed values (enums)', () => {
    const file = project.getSourceFileOrThrow(spinnerPropsFile);
    const tags = findJsxTag(file, 'Spinner');
    let oldEnumValues: string[] = ['large', 'normal'];
    renameProp(tags, 'type', 'size', spinnerMap);
    tags.forEach(tag => {
      expect(tag.getAttribute('type')).toBeFalsy();
      let currentEnumValue = oldEnumValues.pop();
      let inner = (tag.getAttribute('size') as JsxAttribute)
        .getFirstChildByKind(SyntaxKind.JsxExpression)
        .getFirstChildByKind(SyntaxKind.PropertyAccessExpression);
      expect(inner).toBeTruthy();
      expect(inner.getLastChildByKind(SyntaxKind.Identifier).getText()).toEqual(spinnerMap[currentEnumValue]);
      expect(inner.getFirstChildByKind(SyntaxKind.Identifier).getText()).toEqual('SpinnerSize');
    });
  });
});
