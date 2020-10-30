import { renameProp, findJsxTag, boolTransform, enumTransform, numberTransform } from '../../utilities';
import { Project, SyntaxKind, JsxAttribute } from 'ts-morph';
import { ValueMap, PropTransform } from '../../types';
import { Maybe } from '../../../helpers/maybe';

// const personaSpreadPropsFile = 'mPersonaSpreadProps.tsx';
const spinnerPropsFile = 'mSpinnerProps.tsx';
const spinnerSpreadPropsFile = 'mSpinnerSpreadProps.tsx';
const DropdownPropsFile = 'mDropdownProps.tsx';
const DropdownSpreadPropsFile = 'mDropdownSpreadProps.tsx';

/* Developer will provide a mapping of Enum Values, if necessary. */
// TODO it's not ideal that devs need to write the enum name before every token.
const spinnerMap: ValueMap<string> = {
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
    it('[SANITY] can handle a no-op case', () => {
      const file = project.getSourceFileOrThrow(DropdownPropsFile);
      const tags = findJsxTag(file, 'Dropdown');
      renameProp(tags, 'cannot find this tag!', 'nor this one!');
      tags.forEach(tag => {
        expect(tag.getText()).not.toMatch('cannot find this tag!');
        expect(tag.getText()).not.toMatch('nor this one!');
      });
    });

    it('[SANITY] can handle a no-op case in the spread case', () => {
      const file = project.getSourceFileOrThrow(DropdownSpreadPropsFile);
      const tags = findJsxTag(file, 'Dropdown');
      renameProp(tags, 'cannot find this tag!', 'nor this one!');
      tags.forEach(tag => {
        expect(tag.getText()).not.toMatch('cannot find this tag!');
        expect(tag.getText()).not.toMatch('nor this one!');
      });
    });

    // TODO: investigate this worked before and fails now
    // it('can rename props in a spread attribute', () => {
    //   const file = project.getSourceFileOrThrow(personaSpreadPropsFile);
    //   const tags = findJsxTag(file, 'Persona');
    //   renameProp(tags, 'primaryText', 'Text', undefined);
    //   tags.forEach(val => {
    //     console.log(val.getAttribute('id')?.getText());
    //     expect(val.getText()).toMatch('Text={primaryText}');
    //   });
    // });

    describe('Edge Case Tests (changes in value)', () => {
      it('[SANITY] can ID the correct file and get the JSX elements', () => {
        const file = project.getSourceFileOrThrow(DropdownPropsFile);
        const tags = findJsxTag(file, 'Dropdown');
        expect(tags.length).toEqual(2);
      });
      it('can rename and replace the values of props (primitives)', () => {
        const file = project.getSourceFileOrThrow(DropdownPropsFile);
        const tags = findJsxTag(file, 'Dropdown');
        renameProp(tags, 'isDisabled', 'disabled', 'false');
        tags.forEach(tag => {
          expect(tag.getAttribute('isDisabled')).toBeFalsy();
          const valMaybe = Maybe(tag.getAttribute('disabled'));
          const val = valMaybe.then(value => value.getFirstChildByKind(SyntaxKind.JsxExpression));
          expect(val.something).toBeTruthy();
          const propValueText = val.then(value => value.getText().substring(1, value.getText().length - 1));
          expect(propValueText.something).toBeTruthy();
          if (propValueText.something) {
            expect(propValueText.value).toEqual('false');
          }
        });
      });

      it('can replace props with changed values in a spread attribute', () => {
        const file = project.getSourceFileOrThrow(DropdownSpreadPropsFile);
        const tags = findJsxTag(file, 'Dropdown');
        renameProp(tags, 'isDisabled', 'disabled', 'false');
        tags.forEach(val => {
          expect(val.getText()).toMatch('disabled={false}');
        });
      });

      describe('Edge Case Tests (transform functions)', () => {
        it('can replace only the values of a given prop (number)', () => {
          const file = project.getSourceFileOrThrow(DropdownPropsFile);
          const tags = findJsxTag(file, 'Dropdown');
          const func = numberTransform(100);
          renameProp(tags, 'dropdownWidth', 'dropdownWidth', undefined, func);
          tags.forEach(tag => {
            expect(tag.getAttribute('dropdownWidth')).toBeTruthy();
            const valMaybe = Maybe(tag.getAttribute('dropdownWidth'));
            const val = valMaybe.then(value => value.getFirstChildByKind(SyntaxKind.JsxExpression));
            expect(val.something).toBeTruthy();
            const propValueText = val.then(value => value.getText().substring(1, value.getText().length - 1));
            expect(propValueText.something).toBeTruthy();
            if (propValueText.something) {
              expect(propValueText.value).toEqual('100');
            }
          });
        });

        it('can rename and replace the values of props with a default value', () => {
          const file = project.getSourceFileOrThrow(DropdownPropsFile);
          const tags = findJsxTag(file, 'Dropdown');
          const func = boolTransform(); // No args => assign to old value.
          renameProp(tags, 'isDisabled', 'disabled', undefined, func);
          tags.forEach(tag => {
            expect(tag.getAttribute('isDisabled')).toBeFalsy();
          });
        });

        it('can replace props with changed enum values in Spinner (spread)', () => {
          const file = project.getSourceFileOrThrow(spinnerPropsFile);
          const tags = findJsxTag(file, 'Spinner');
          const oldEnumValues: string[] = ['SpinnerType.large', 'SpinnerType.normal'];
          const enumFn = enumTransform(spinnerMap);
          renameProp(tags, 'type', 'size', undefined, enumFn);
          tags.forEach(tag => {
            expect(tag.getAttribute('type')).toBeFalsy();
            const currentEnumValue = Maybe(oldEnumValues.pop());
            const innerMaybe = Maybe(
              (tag.getAttribute('size') as JsxAttribute).getFirstChildByKind(SyntaxKind.JsxExpression),
            );
            if (innerMaybe.something && currentEnumValue.something) {
              const inner = innerMaybe.then(value => {
                return value.getFirstChildByKind(SyntaxKind.PropertyAccessExpression);
              });

              expect(inner.something).toBeTruthy();
              expect(currentEnumValue.something).toBeTruthy();
              const newVal = spinnerMap[currentEnumValue.value];
              const firstInnerChild = inner.then(value => value.getFirstChildByKind(SyntaxKind.Identifier));
              const LastInnerChild = inner.then(value => value.getLastChildByKind(SyntaxKind.Identifier));
              expect(firstInnerChild.something).toBeTruthy();
              expect(LastInnerChild.something).toBeTruthy();
              if (firstInnerChild.something && LastInnerChild.something) {
                /* Need this if statement to clear value on the next line. */
                expect(firstInnerChild.value.getText()).toEqual('SpinnerSize');
                expect(LastInnerChild.value.getText()).toEqual(newVal.substring(newVal.indexOf('.') + 1));
              }
            }
          });
        });

        it('can replace props with changed  values in Dropdown (spread)', () => {
          const file = project.getSourceFileOrThrow(DropdownSpreadPropsFile);
          const tags = findJsxTag(file, 'Dropdown');
          const transform: PropTransform = boolTransform(true, undefined);
          renameProp(tags, 'isDisabled', 'disabled', undefined, transform);
          tags.forEach(val => {
            expect(val.getText()).toMatch('disabled={true}');
          });
        });

        it('can replace props with changed enum values in a spread attribute where the body is missing', () => {
          const file = project.getSourceFileOrThrow(spinnerSpreadPropsFile);
          let tags = findJsxTag(file, 'Spinner');
          const transform = enumTransform(spinnerMap);
          renameProp(tags, 'type', 'size', undefined, transform);
          tags = findJsxTag(file, 'Spinner');
          /* Need to reacquire tags because the tags have been modified since then! */
          tags.forEach(val => {
            expect(val.getText()).toMatch('size={__migEnumMap[type]}');
          });
        });
      });

      it('can replace props with changed enum values in a spread attribute where the body is missing', () => {
        const file = project.getSourceFileOrThrow(spinnerSpreadPropsFile);
        let tags = findJsxTag(file, 'Spinner');
        const transform = enumTransform(spinnerMap);
        renameProp(tags, 'type', 'size', undefined, transform);
        tags = findJsxTag(file, 'Spinner');
        /* Need to reacquire tags because the tags have been modified since then! */
        tags.forEach(val => {
          expect(val.getText()).toMatch('size={__migEnumMap[type]}');
        });
      });
    });
  });
});
