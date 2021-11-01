import { concatStyleSets } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { getStyles as getBaseButtonStyles } from '../Button/BaseButton.styles';
import type { ITheme } from '../../Styling';
import type { IButtonStyles } from '../../Button';

export const getStyles = memoizeFunction(
  (theme: ITheme, className?: string, customStyles?: IButtonStyles): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);

    const customButtonStyles = concatStyleSets(baseButtonStyles, customStyles)!;

    return {
      ...customButtonStyles,
      root: [baseButtonStyles.root, className, theme.fonts.medium, customStyles && customStyles.root],
    } as IButtonStyles;
  },
);
