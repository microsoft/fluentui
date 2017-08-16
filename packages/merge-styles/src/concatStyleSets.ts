import { IStyleSet } from './IStyleSet';

/**
 * Combine a set of styles together (but does not register css classes.)
 * @public
 */
export function concatStyleSets<T extends {}>(...args: (T | false | null | undefined)[]): T {
  let mergedSet: IStyleSet = {};

  for (let i = 0; i < args.length; i++) {
    let currentSet = args[i];

    if (currentSet) {
      for (let prop in currentSet) {
        if (currentSet.hasOwnProperty(prop)) {
          let mergedValue = mergedSet[prop];
          let currentValue = currentSet[prop];

          if (mergedValue === undefined) {
            mergedSet[prop] = currentValue;
          } else {
            mergedSet[prop] = [
              ...(Array.isArray(mergedValue) ? mergedValue : [mergedValue]),
              ...(Array.isArray(currentValue) ? currentValue : [currentValue])
            ];
          }
        }
      }
    }
  }

  return mergedSet as T;
}