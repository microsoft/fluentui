import { ITheme } from '../interfaces';

export type GlobalClassNames<IStyles> = Record<keyof IStyles, string>;

/**
 * Checks for the `flags.noGlobalClassNames` on the `theme` to determine if it should return `classNames`
 *
 * @param theme The theme to check the flag on
 * @param classNames The global class names that apply when the flag is false
 */
export function getGlobalClassNames<T>(classNames: GlobalClassNames<T>, theme: ITheme): Partial<GlobalClassNames<T>> {
  if (theme.flags.noGlobalClassNames) {
    return {};
  }

  return classNames;
}