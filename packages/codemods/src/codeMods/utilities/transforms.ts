import { PropTransform } from '../types';
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
