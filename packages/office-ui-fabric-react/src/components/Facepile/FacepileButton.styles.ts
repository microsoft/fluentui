import { ITheme, concatStyleSets } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { IButtonStyles } from '../../Button';
import { getStyles as getBaseButtonStyles } from '../Button/BaseButton.styles';

export const getStyles = memoizeFunction(
  (theme: ITheme, className?: string, customStyles?: IButtonStyles): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);

    const customButtonStyles = concatStyleSets(baseButtonStyles, customStyles)!;

    return {
      ...customButtonStyles,
      root: [baseButtonStyles.root, className, theme.fonts.medium, customStyles && customStyles.root]
    } as IButtonStyles;
  }
);
