import { Stylesheet } from '@fluentui/merge-styles';
import { memoizeFunction } from '@fluentui/utilities';
import type { ITheme } from '../interfaces/index';

export type GlobalClassNames<IStyles> = Record<keyof IStyles, string>;

/**
 * Internal memoized function which simply takes in the class map and the
 * disable boolean. These immutable values can be memoized.
 */
const _getGlobalClassNames = memoizeFunction(
  <T>(classNames: GlobalClassNames<T>, disableGlobalClassNames?: boolean): GlobalClassNames<T> => {
    const styleSheet = Stylesheet.getInstance();

    if (disableGlobalClassNames) {
      // disable global classnames
      return (Object.keys(classNames) as (keyof T)[]).reduce((acc, className) => {
        acc[className] = styleSheet.getClassName(classNames[className]);
        return acc;
      }, {} as GlobalClassNames<T>);
    }

    // use global classnames
    return classNames;
  },
);

/**
 * Checks for the `disableGlobalClassNames` property on the `theme` to determine if it should return `classNames`
 * Note that calls to this function are memoized.
 *
 * @param classNames - The collection of global class names that apply when the flag is false. Make sure to pass in
 * the same instance on each call to benefit from memoization.
 * @param theme - The theme to check the flag on
 * @param disableGlobalClassNames - Optional. Explicitly opt in/out of disabling global classnames. Defaults to false.
 */
export function getGlobalClassNames<T>(
  classNames: GlobalClassNames<T>,
  theme: ITheme,
  disableGlobalClassNames?: boolean,
): GlobalClassNames<T> {
  return _getGlobalClassNames(
    classNames,
    disableGlobalClassNames !== undefined ? disableGlobalClassNames : theme.disableGlobalClassNames,
  );
}
