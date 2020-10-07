import { renamePropInSpread } from './helpers/propHelpers';
import { JsxOpeningElement, JsxSelfClosingElement, SyntaxKind } from 'ts-morph';
import { Maybe } from '../../helpers/maybe';
import { PropTransform, NoOp } from '../types';
import { Result, Ok, Err } from '../../helpers/result';

export function renameProp(
  instances: (JsxOpeningElement | JsxSelfClosingElement)[],
  toRename: string,
  replacementName: string,
  replacementValue?: string,
  transform?: PropTransform,
): Result<string, NoOp> {
  instances.forEach(val => {
    /* For each instance, first see if desired prop exists in the open. */
    const foundProp = Maybe(val.getAttribute(toRename));
    if (foundProp.something) {
      /* If found, do a simple name-replacementName. */
      foundProp.value.set({ name: replacementName });
      if (replacementValue) {
        const childElem = Maybe(foundProp.value.getFirstChildByKind(SyntaxKind.JsxExpression));
        if (childElem.something) {
          childElem.value.replaceWithText(`{${replacementValue}}`);
        } else {
          return Err({ reason: 'Could not access prop from JSX tag' });
        }
      } else {
        const enumInJsx = Maybe(foundProp.value.getFirstChildByKind(SyntaxKind.JsxExpression));
        if (enumInJsx.something) {
          if (transform) {
            return transform(enumInJsx.value, toRename, replacementName);
          }
        }
      }
    } else {
      /* If the prop is not found, check to see if the prop is in a spread attribute. */
      let res: Result<string, NoOp>;
      if (transform) {
        res = transform(val, toRename, replacementName);
      } else {
        res = renamePropInSpread(val, toRename, replacementName, undefined, replacementValue);
      }
      return res;
    }
  });
  return Ok('Successfully renamed the given props.');
}
