import { IStyleSet } from './IStyleSet';

/**
 * Combine a set of styles together (but does not register css classes.)
 * @public
 */
export function concatStyleSets<T extends {}>(...args: (T | false | null | undefined)[]): T {
  const mergedSet: IStyleSet = {};

  for (const currentSet of args) {
    if (currentSet) {
      for (const prop in currentSet) {
        if (currentSet.hasOwnProperty(prop)) {
          const mergedValue = mergedSet[prop];
          const currentValue = currentSet[prop];

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