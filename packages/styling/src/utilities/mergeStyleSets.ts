import { mergeStyles } from './mergeStyles';

/**
 * Merges a give set of styles by running mergeStyles for each unique key. Works
 * like Object.assign in that it layers them in the argument order specified, but will
 * not mutate them and will return the merged result.
 */
export function mergeStyleSets<T>(...args: T[]): {[key in keyof T]?: string } {
  const mergedRules: {[key in keyof T]?: string } = {};
  // tslint:disable-next-line:no-any
  const setStyles: any = {};

  args.forEach((arg: T) => arg && Object.keys(arg).forEach((key: string) => {
    if (!setStyles[key]) {
      setStyles[key] = [];
    }
    // tslint:disable-next-line:no-any
    setStyles[key].push((arg as any)[key]);
  }));

  Object.keys(setStyles).forEach((key: string) => {
    // tslint:disable-next-line:no-any
    (mergedRules as any)[key] = mergeStyles(setStyles[key]);
  });

  return mergedRules;
}
