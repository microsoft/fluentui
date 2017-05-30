import { mergeStyles } from './mergeStyles';

/**
 * Merges a give set of styles by running mergeStyles for each unique key. Works
 * like Object.assign in that it layers them in the argument order specified, but will
 * not mutate them and will return the merged result.
 */
export function mergeStyleSets<T>(...args: T[]): T {
  const mergedRules: T = {} as T;
  const setStyles = {};

  args.forEach((arg: T) => arg && Object.keys(arg).forEach((key: string) => {
    if (!setStyles[key]) {
      setStyles[key] = [];
    }
    setStyles[key].push(arg[key]);
  }));

  Object.keys(setStyles).forEach((key: string) => {
    mergedRules[key] = mergeStyles(setStyles[key]);
  });

  return mergedRules;
}
