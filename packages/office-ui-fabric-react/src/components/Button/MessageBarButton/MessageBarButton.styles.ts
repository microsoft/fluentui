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
          backgroundColor: theme.palette.neutralQuaternaryAlt,
          color: theme.palette.neutralPrimary
        }
      ],

      rootHovered: {
        backgroundColor: theme.palette.neutralTertiaryAlt,
        color: theme.palette.neutralDark
      },

      rootPressed: {
        backgroundColor: theme.palette.neutralTertiary,
        color: theme.palette.neutralDark
      }
    };

    return concatStyleSets(baseButtonStyles, messageBarButtonStyles, customStyles)!;
  }
);
