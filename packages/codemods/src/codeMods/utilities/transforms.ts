import { PropTransform, ValueMap, NoOp } from '../types';
import { JsxExpression, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';
import { renamePropInSpread } from './helpers/propHelpers';
import { Err, Ok } from '../../helpers/result';

/*
Steps to writing a transform:
-----------------------------
1. The expected parameters are either a value map (data in string form)
   or a single value that will replace all instances of the old value.
2. The return type is of kind PropTransform, whose info can be found in
   ../types
3. The function must return a function that takes in the following parameters:
    * element: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
    * toRename: string,
    * replacementName: string,
   These params will be collected and used in the renameProp function.
4. There are typically two separate general cases to handle with props:
   those in the open, and those embedded in an object via the spread
   attribute. The elementNotInSpread() function uses the ELEMENT parameter
   from the closure to indicate whether you are handling a spread case or
   a non-spread case. If you believe your codebase only uses the props in a
   single way, feel free to only support one of the ways.
5. To handle a spread case, simply call the renamePropInSpread() function.
   Currently, there is no extra support for modifying that function.
6. To handle a non-spread case, get the AST node you want to change with the
   getValueToChange() function, and use the replaceWithText() helper to change
   the node's text to whatever data you want, as long as it's in string form.
7. If your change requires the old value of the prop (like in a mapping), you
   can retrieve that with the getText() method on the node.

Happy modding!
*/

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
    if (newValue || map) {
      if (elementNotInSpread(element)) {
        const toChange = getValueToChange(element as JsxExpression);
        if (toChange) {
          const oldText = toChange.getText();
          toChange.replaceWithText(map ? map[oldText] : newValue !== undefined ? newValue.toString() : toRename);
          return Ok('Prop value transformed successfully');
        }
        return Err<string, NoOp>({ logs: ['Could not access prop value to transform.'] });
      } else {
        return renamePropInSpread(
          element as JsxOpeningElement | JsxSelfClosingElement,
          toRename,
          replacementName,
          map,
          newValue?.toString(),
        );
      }
    }
    return Ok('No transform args applied, no changes made.');
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
    if (newValue || map) {
      if (elementNotInSpread(element)) {
        const toChange = getValueToChange(element as JsxExpression);
        if (toChange) {
          const oldText = toChange.getText();
          toChange.replaceWithText(map ? `'${map[oldText]}'` : newValue!);
          return Ok('Prop value transformed successfully');
        }
        return Err<string, NoOp>({ logs: ['Could not access prop value to transform.'] });
      } else {
        return renamePropInSpread(
          element as JsxOpeningElement | JsxSelfClosingElement,
          toRename,
          replacementName,
          map,
          newValue,
        );
      }
    }
    return Ok('No transform args applied, no changes made.');
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
    if (newValue || map) {
      if (elementNotInSpread(element)) {
        const toChange = getValueToChange(element as JsxExpression);
        if (toChange) {
          const oldText = toChange.getText();
          toChange.replaceWithText(map ? map[oldText] : newValue!.toString());
          return Ok('Prop value transformed successfully');
        }
        return Err<string, NoOp>({ logs: ['Could not access prop value to transform.'] });
      } else {
        return renamePropInSpread(
          element as JsxOpeningElement | JsxSelfClosingElement,
          toRename,
          replacementName,
          map,
          newValue?.toString(),
        );
      }
    }
    return Ok('No transform args applied, no changes made.');
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
      return Err<string, NoOp>({ logs: ['Cannot perform an enum transform without a map!'] });
    }
    if (elementNotInSpread(element)) {
      const toChange = getValueToChange(element as JsxExpression);
      if (toChange) {
        const oldText = toChange.getText();
        toChange.replaceWithText(map[oldText]);
        return Ok('Prop value transformed successfully');
      }
      return Err<string, NoOp>({ logs: ['Could not access prop value to transform.'] });
    } else {
      return renamePropInSpread(element as JsxOpeningElement | JsxSelfClosingElement, toRename, replacementName, map);
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
  return element.getChildAtIndex(1); // Child between {} operators.
}
