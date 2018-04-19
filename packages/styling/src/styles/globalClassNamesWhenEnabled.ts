import { ITheme } from '../interfaces';

/**
 * Checks for the `flags.noGlobalClassNames` on the `theme` to determine if it should return `classNames`
 *
 * @param theme The theme to check the flag on
 * @param classNames The global class names that apply when the flag is false
 */
export function globalClassNamesWhenEnabled(theme: ITheme, classNames: string[]): string {
  if (theme.flags.noGlobalClassNames) {
    return '';
  }

  return classNames.join(' ');
}