import { PropTransform, ValueMap } from '../types';
import { JsxExpression, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';
import { Maybe } from '../../maybe';
import { renamePropInSpread } from './helpers/propHelpers';

// Used in the renameProp utility.

/* Transform function that returns the new boolean value
   specified by a user. Less complex than other transforms
   because the user can simply overwrite data instead of
   mapping it. If both NEWVALUE and MAP are provided
   (which should not happen), MAP will be used. If neither
   are provided, nothing will happen. */
export function boolTransform(newValue?: boolean, map?: ValueMap<string>): PropTransform {
  return (
    element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    toRename: string,
    replacementName: string,
  ) => {
    switch (element.getKind()) {
      case SyntaxKind.JsxExpression:
        {
          const toChange = Maybe(element.getChildAtIndex(1)); // Child between {} operators.
          if (toChange.just) {
            const oldText = toChange.value.getText();
            toChange.value.replaceWithText(
              map ? map[oldText] : newValue !== undefined ? newValue.toString() : toRename,
            );
          }
        }
        break;
      case SyntaxKind.JsxOpeningElement:
      case SyntaxKind.JsxSelfClosingElement: {
        renamePropInSpread(
          element as JsxOpeningElement | JsxSelfClosingElement,
          toRename,
          replacementName,
          map,
          newValue?.toString(),
        );
        break;
      }
    }
  };
}

/* Transform function used if the value to change is a STRING. Follows
   the same contraints as the above function. */
export function stringTransform(newValue?: string, map?: ValueMap<string>): PropTransform {
  return (
    element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    toRename: string,
    replacementName: string,
  ) => {
    switch (element.getKind()) {
      case SyntaxKind.JsxExpression:
        {
          const toChange = Maybe(element.getFirstChildByKind(SyntaxKind.StringLiteral));
          if (toChange.just) {
            const oldText = toChange.value.getText();
            toChange.value.replaceWithText(map ? `'${map[oldText]}'` : newValue ? newValue : toRename);
          }
        }
        break;
      case SyntaxKind.JsxOpeningElement:
      case SyntaxKind.JsxSelfClosingElement: {
        renamePropInSpread(
          element as JsxOpeningElement | JsxSelfClosingElement,
          toRename,
          replacementName,
          map,
          newValue,
        );
        break;
      }
    }
  };
}

/* Transform function used if the value to change is an ENUM. Follows
   the same contraints as the above function, except the parameter MAP
   is not optional. */
export function enumTransform(map: ValueMap<string>): PropTransform {
  return (
    element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    toRename: string,
    replacementName: string,
  ) => {
    if (!map) {
      return;
    }
    switch (element.getKind()) {
      case SyntaxKind.JsxExpression:
        {
          const toChange = Maybe(element.getFirstChildByKind(SyntaxKind.PropertyAccessExpression));
          if (toChange.just) {
            const oldText = toChange.value.getText();
            toChange.value.replaceWithText(map[oldText]);
          }
        }
        break;
      case SyntaxKind.JsxOpeningElement:
      case SyntaxKind.JsxSelfClosingElement: {
        renamePropInSpread(element as JsxOpeningElement | JsxSelfClosingElement, toRename, replacementName, map);
        break;
      }
    }
  };
}
