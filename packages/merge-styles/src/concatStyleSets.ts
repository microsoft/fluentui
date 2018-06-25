import { IStyleSet } from './IStyleSet';
import { IStyleOrStyleFunction } from './IStyle';

/**
 * Combine a set of styles together (but does not register css classes.)
 * @public
 */
export function concatStyleSets(...args: (IStyleSet<any> | false | null | undefined)[]): IStyleSet<any> {
  const mergedSet = {} as any;

  for (const currentSet of args) {
    if (currentSet) {
      for (const prop in currentSet) {
        if (currentSet.hasOwnProperty(prop)) {
          const mergedValue = mergedSet[prop];
          const currentValue: IStyleOrStyleFunction = currentSet[prop];

          if (mergedValue === undefined) {
            mergedSet[prop] = currentValue;
          } else {
            if (typeof currentValue === 'function') {
              // if it is a function, we need special handling.
              mergedSet[prop] = (props: any) => {
                if (typeof mergedValue === 'function') {
                  return concatStyleSets(mergedValue(props), currentValue(props));
                } else {
                  // our typings will not allow this scenario to happen.
                  // it is probably return concatStyleSets(mergedValue, currentValue(props));
                  // however, if we wanted to support this scenario, we should update the typings to allow.
                  // We just throw a type error for now (but this should never happen for anyone using TypeScript).

                  throw new TypeError(
                    `The area ${props} in the stylesets being concatenated has inconsistent typing (mix of style functions and objects). `
                  );
                }
              };
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
  }

  return mergedSet as IStyleSet<any>;
}
