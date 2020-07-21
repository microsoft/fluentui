import { JsxOpeningElement, JsxSelfClosingElement, SyntaxKind } from 'ts-morph';
import { Maybe } from '../../maybe';
import { PropTransform } from '../types';
import { renamePropInSpread } from './helpers/propHelpers';

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
    if (foundProp.just) {
      /* If found, do a simple name-replacementName. */
      foundProp.value.set({ name: replacementName });
      if (replacementValue) {
        foundProp.value.set({ initializer: `{${replacementValue}}` });
      } else {
        const enumInJsx = Maybe(foundProp.value.getFirstChildByKind(SyntaxKind.JsxExpression));
        if (enumInJsx.just) {
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
        renamePropInSpread(val, toRename, replacementName);
      }
    }
  });
}
