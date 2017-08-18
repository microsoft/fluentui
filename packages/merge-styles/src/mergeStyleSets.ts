import { mergeStyles } from './mergeStyles';
import { concatStyleSets } from './concatStyleSets';
import { IStyle } from './IStyle';

/**
 * Allows you to pass in 1 or more sets of areas which will return a merged
 * set of classes.
 *
 * @public
 */
export function mergeStyleSets<T extends object>(
  ...cssSets: T[]
): {[P in keyof T]?: string } {
  const classNameSet: {[P in keyof T]?: string } = {};
  let cssSet = cssSets[0];

  if (cssSets.length > 1) {
    cssSet = concatStyleSets(...cssSets);
  }
  for (const prop in cssSet) {
    if (cssSet.hasOwnProperty(prop)) {
      classNameSet[prop] = mergeStyles(cssSet[prop] as IStyle);
    }
  }

  return classNameSet;
}
