import { renameProp, findJsxTag } from '../../utilities';
import { Project, SyntaxKind, JsxAttribute } from 'ts-morph';
import { EnumMap } from '../../types';

const project = new Project();
project.addSourceFilesAtPaths(`${process.cwd()}/**/tests/mock/**/*.tsx`);

const personaPropsFile = 'mPersonaProps.tsx';
const personaSpreadPropsFile = 'mPersonaSpreadProps.tsx';
const spinnerPropsFile = 'mSpinnerProps.tsx';

const deprecatedPropName = 'onRenderCoin';
const newPropName = 'onRenderAvatarCoin';

/* Developer will provide a mapping of Enum Values, if necessary. */
const spinnerMap: EnumMap = {
  normal: 'medium',
  large: 'large',
};

describe('Props Utilities Test (Persona)', () => {
  it('[SANITY] can ID the correct file and get the JSX elements', () => {
    const file = project.getSourceFileOrThrow(personaPropsFile);
    const tags = findJsxTag(file, 'Persona');
    expect(tags.length).toEqual(2);
  });

  // it('can rename props in a primitive', () => {
  //   const file = project.getSourceFileOrThrow(personaPropsFile);
  //   const tags = findJsxTag(file, 'Persona');
  //   renameProp(tags, deprecatedPropName, newPropName, undefined, undefined);
  //   tags.forEach(tag => {
  //     expect(tag.getAttribute('onRenderCoin')).toBeFalsy();
  //   });
  // });

  // it('can rename props in a spread attribute', () => {
  //   const file = project.getSourceFileOrThrow(personaSpreadPropsFile);
  //   const tags = findJsxTag(file, 'Persona');
  //   renameProp(tags, 'primaryText', 'Text', undefined, undefined);
  //   tags.forEach(val => {
  //     val.getAttributes().forEach(att => {
  //       if (att.getKind() === SyntaxKind.JsxSpreadAttribute) {
  //         att
  //           .getFirstChildByKind(SyntaxKind.Identifier)
  //           ?.getType()
  //           .getProperties()
  //           .forEach(prop => {
  //             expect(prop.getName()).not.toEqual('primaryText');
  //           });
  //       }
  //     });
  //   });
  // });
});

describe('Props Utilities Test (Spinner)', () => {
  it('[SANITY] can ID the correct file and get the JSX elements', () => {
    const file = project.getSourceFileOrThrow(spinnerPropsFile);
    const tags = findJsxTag(file, 'Spinner');
    expect(tags.length).toEqual(2);
  });

  // it('can replace props with changed values (enums)', () => {
  //   const file = project.getSourceFileOrThrow(spinnerPropsFile);
  //   const tags = findJsxTag(file, 'Spinner');
  //   let oldEnumValues: string[] = [

  //   ];
  // renameProp(tags, 'type', 'size', 'SpinnerSize', spinnerMap);
  // tags.forEach(tag => {
  //   expect(tag.getAttribute('type')).toBeFalsy();
  //   let currentEnumValue = oldEnumValues.pop();
  //   let inner = (tag.getAttribute('size') as JsxAttribute)
  //     .getFirstChildByKind(SyntaxKind.JsxExpression)
  //     .getFirstChildByKind(SyntaxKind.PropertyAccessExpression);
  //   expect(inner).toBeTruthy;
  //   expect(inner.getLastChildByKind(SyntaxKind.Identifier).getText()).toEqual(spinnerMap[currentEnumValue]);
  //   expect(inner.getFirstChildByKind(SyntaxKind.Identifier).getText()).toEqual('SpinnerSize');
  // });
  // });
});
