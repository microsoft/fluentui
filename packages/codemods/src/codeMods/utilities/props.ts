import { renamePropInSpread } from './helpers/propHelpers';
import { JsxOpeningElement, JsxSelfClosingElement, SyntaxKind } from 'ts-morph';
import { Maybe } from '../../helpers/maybe';
import { PropTransform } from '../types';

export function renameProp(
  instances: (JsxOpeningElement | JsxSelfClosingElement)[],
  toRename: string,
  replacementName: string,
  replacementValue?: string,
  transform?: PropTransform,
) {
  instances.forEach(val => {
    /* For each instance, first see if desired prop exists in the open. */
    const foundProp = Maybe(val.getAttribute(toRename));

    if (foundProp.something) {
      /* If found, do a simple name-replacementName. */
      foundProp.value.set({ name: replacementName });
      if (replacementValue) {
        foundProp.value.set({ initializer: `{${replacementValue}}` });
      } else {
        const enumInJsx = Maybe(foundProp.value.getFirstChildByKind(SyntaxKind.JsxExpression));
        if (enumInJsx.something) {
          if (transform) {
            transform(enumInJsx.value, toRename, replacementName);
          }
        }
      }
    } else {
      /* If the prop is not found, check to see if the prop is in a spread attribute. */
      if (transform) {
        transform(val, toRename, replacementName);
      } else {
        console.log('time for spread!');
        renamePropInSpread(val, toRename, replacementName);
      }
    }
  });
}
