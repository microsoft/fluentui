import { PropTransform, ValueMap } from '../types';
import { JsxExpression, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';
import { Maybe } from '../../helpers/maybe';
import { renamePropInSpread } from './helpers/propHelpers';

// Used in the renameProp utility.

/* Transform function that returns the new boolean value
   specified by a user. Less complex than other transforms
   because the user can simply overwrite data instead of
   mapping it. If both NEWVALUE and MAP are provided
   (which should not happen), MAP will be used. If neither
   is provided, nothing will happen. */
export function boolTransform(newValue?: boolean, map?: ValueMap<string>): PropTransform {
  return (
    element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    toRename: string,
    replacementName: string,
  ) => {
    if (elementNotInSpread(element)) {
      const toChange = getValueToChange(element as JsxExpression);
      if (toChange) {
        const oldText = toChange.getText();
        toChange.replaceWithText(map ? map[oldText] : newValue !== undefined ? newValue.toString() : toRename);
      }
    } else {
      renamePropInSpread(
        element as JsxOpeningElement | JsxSelfClosingElement,
        toRename,
        replacementName,
        map,
        newValue?.toString(),
      );
    }
  };
}

/* Transform function used if the value to change is a STRING.
   Follows the same contraints as the above function. */
export function stringTransform(newValue?: string, map?: ValueMap<string>): PropTransform {
  return (
    element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    toRename: string,
    replacementName: string,
  ) => {
    if (elementNotInSpread(element)) {
      const toChange = getValueToChange(element as JsxExpression);
      if (toChange) {
        const oldText = toChange.getText();
        toChange.replaceWithText(map ? `'${map[oldText]}'` : newValue ? newValue : toRename);
      }
    } else {
      renamePropInSpread(
        element as JsxOpeningElement | JsxSelfClosingElement,
        toRename,
        replacementName,
        map,
        newValue,
      );
    }
  };
}

/* Transform function used if the value to change is a NUMBER.
   Follows the same contraints as the above function. */
export function numberTransform(newValue?: number, map?: ValueMap<string>): PropTransform {
  return (
    element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    toRename: string,
    replacementName: string,
  ) => {
    if (elementNotInSpread(element)) {
      const toChange = getValueToChange(element as JsxExpression);
      if (toChange) {
        const oldText = toChange.getText();
        toChange.replaceWithText(map ? map[oldText] : newValue !== undefined ? newValue.toString() : toRename);
      }
    } else {
      renamePropInSpread(
        element as JsxOpeningElement | JsxSelfClosingElement,
        toRename,
        replacementName,
        map,
        newValue?.toString(),
      );
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
    if (elementNotInSpread(element)) {
      const toChange = getValueToChange(element as JsxExpression);
      if (toChange) {
        const oldText = toChange.getText();
        toChange.replaceWithText(map[oldText]);
      }
    } else {
      renamePropInSpread(element as JsxOpeningElement | JsxSelfClosingElement, toRename, replacementName, map);
    }
  };
}

/* Returns whether the supplied ELEMENT contains a prop within a
   spread attribute. This is done by detecting whether the supplied
   ELEMENT is a JsxExpression, meaning that we have close access to
   the prop, or if it's a Jsx opening element, meaning we can't access it. */
function elementNotInSpread(element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement): boolean {
  return element.getKind() === SyntaxKind.JsxExpression;
}

/* Returns the piece of the AST that represents the value that the
   developer can overwrite. */
function getValueToChange(element: JsxExpression) {
  const toChange = Maybe(element.getChildAtIndex(1)); // Child between {} operators.
  return toChange.just ? toChange.value : undefined;
}
