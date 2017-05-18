import { mergeStyles } from './mergeStyles';

export function mergeStyleSets<T>(...args: T[]): T {
  const mergedRules: T = {} as T;
  let ruleToMerge: Object = args[0];

  for (let prop in ruleToMerge) {
    if (ruleToMerge.hasOwnProperty(prop)) {
      let allArgs: Object[] = [];
      for (let i = 0; i < args.length; i++) {
        let currentArg: Object = args[i];

        if (currentArg && currentArg[prop]) {
          allArgs.push(currentArg[prop]);
        }
      }
      mergedRules[prop] = mergeStyles(...allArgs);
    }
  }
  return mergedRules;
}
