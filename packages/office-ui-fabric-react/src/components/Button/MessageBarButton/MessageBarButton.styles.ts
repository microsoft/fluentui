import { IButtonStyles } from '../Button.types';
import { ITheme, concatStyleSets, getFocusStyle } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, focusInset?: string, focusColor?: string): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
    const messageBarButtonStyles: IButtonStyles = {
      root: [
        getFocusStyle(theme, {
          inset: 1,
          highContrastStyle: {
            outlineOffset: '-4px',
            outlineColor: 'ActiveBorder'
          },
          borderColor: 'transparent'
        }),
        {
          height: 24,
          borderColor: theme.palette.neutralTertiaryAlt
        }
      ]
    };

    return concatStyleSets(baseButtonStyles, messageBarButtonStyles, customStyles)!;
  }
);
