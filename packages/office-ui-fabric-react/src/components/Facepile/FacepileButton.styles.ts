import { ITheme, concatStyleSets } from '../../Styling';
import { memoizeFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IButtonStyleProps, IButtonStyles } from '../../Button';
import { getStyles as getBaseButtonStyles } from '../Button/BaseButton.styles';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles: IStyleFunctionOrObject<IButtonStyleProps, IButtonStyles>, className?: string): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);

    const customButtonStyles = concatStyleSets(baseButtonStyles, customStyles)!;

    let styles: IButtonStyles;
    if (typeof customStyles === 'function') {
      styles = customStyles({ theme, className });
    } else {
      styles = customStyles;
    }

    return {
      ...customButtonStyles,
      root: [baseButtonStyles.root, className, theme.fonts.medium, customStyles && styles.root]
    } as IButtonStyles;
  }
);
