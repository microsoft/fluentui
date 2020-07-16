import { PropTransform, EnumMap } from '../types';
import { JsxExpression, SyntaxKind } from 'ts-morph';
import { Maybe } from '../../maybe';

// Used in the renameProp utility.

/* Transform function that replaces a JsxExpression node
   with data specified by the user -- in this case a desired boolean value. */
export function boolTransform(newValue: boolean): PropTransform {
  return (element: JsxExpression) => {
    const exp = Maybe(element.getFirstChildByKind(SyntaxKind.TrueKeyword));
    if (exp.just) {
      exp.value.replaceWithText(newValue.toString());
    }
  };
}

/* Transform function that takes in a predefined mapping of old to new
   enum values. If the enum is in a spread operator, you will need to
   manually pass the enum map into the renameProp utility function. */
export function enumTransform(changeValueMap: EnumMap<string>): PropTransform {
  return (element: JsxExpression) => {
    const enumExp = Maybe(element.getFirstChildByKind(SyntaxKind.PropertyAccessExpression));
    const newEnumName = enumExp.then(value => value.getText()).then(value => changeValueMap[value]);
    const firstChild = enumExp.then(value => value.getFirstChildByKind(SyntaxKind.Identifier));
    const lastChild = enumExp.then(value => value.getLastChildByKind(SyntaxKind.Identifier));
    if (firstChild.just && lastChild.just && newEnumName.just) {
      firstChild.value.replaceWithText(newEnumName.value.substring(0, newEnumName.value.indexOf('.')));
      lastChild.value.replaceWithText(newEnumName.value.substring(newEnumName.value.indexOf('.') + 1));
    }
  };
}
