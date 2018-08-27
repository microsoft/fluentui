import { IButtonStyles } from '../Button.types';
import { ITheme, concatStyleSets, HighContrastSelector } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
    const splitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);
    const { palette, semanticColors } = theme;
    const iconButtonStyles: IButtonStyles = {
      root: {
        padding: '0 4px',
        width: '32px',
        height: '32px',
        backgroundColor: 'transparent',
        border: 'none'
      },

      rootHovered: {
        color: palette.themeDarker,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight',
            color: 'Highlight'
          }
        }
      },

      rootPressed: {
        color: palette.themePrimary
      },

      rootExpanded: {
        color: palette.themePrimary
      },

      rootChecked: {
        backgroundColor: semanticColors.buttonBackgroundChecked
      },

      rootCheckedHovered: {
        backgroundColor: semanticColors.buttonBackgroundHovered
      },

      rootDisabled: {
        color: semanticColors.disabledText
      }
    };

    return concatStyleSets(baseButtonStyles, iconButtonStyles, splitButtonStyles, customStyles)!;
  }
);
