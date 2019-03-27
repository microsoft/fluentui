import { IButtonStyles } from '../Button.types';
import { ITheme, concatStyleSets, getFocusStyle, HighContrastSelector } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, focusInset?: string, focusColor?: string): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
    const baseSplitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);

    const { palette: p } = theme;

    const commandButtonHighContrastFocus = {
      left: 4,
      top: 4,
      bottom: 4,
      right: 4,
      border: 'none'
    };

    const commandButtonStyles: IButtonStyles = {
      root: [
        getFocusStyle(theme, 2, 'relative', commandButtonHighContrastFocus, 'transparent'),
        theme.fonts.medium,
        {
          minWidth: '40px',
          backgroundColor: 'transparent',
          color: p.neutralPrimary,
          padding: '0 4px',
          border: 'none',
          borderRadius: 0,
          selectors: {
            [HighContrastSelector]: {
              border: 'none'
            }
          }
        }
      ],

      rootHovered: {
        backgroundColor: p.neutralLighter,
        color: p.neutralDark,
        selectors: {
          [HighContrastSelector]: {
            color: 'Highlight'
          }
        }
      },

      rootPressed: {
        backgroundColor: p.neutralLight,
        color: p.black
      },

      rootChecked: {
        backgroundColor: p.neutralLight,
        color: p.black
      },

      rootExpanded: {
        backgroundColor: p.neutralLight,
        color: p.black
      },

      rootCheckedHovered: {
        backgroundColor: p.neutralQuaternaryAlt,
        color: p.black
      },

      // Split button styles
      splitButtonContainer: {
        selectors: {
          [HighContrastSelector]: {
            border: 'none'
          }
        }
      },

      splitButtonDivider: {
        backgroundColor: p.neutralTertiaryAlt,
        marginTop: 4,
        marginBottom: 4
      },

      splitButtonMenuButton: {
        backgroundColor: 'transparent',
        border: 'none',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        color: p.neutralPrimary,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralLighter,
            color: p.neutralDark,
            selectors: {
              [HighContrastSelector]: {
                color: 'Highlight'
              }
            }
          }
        }
      },

      splitButtonMenuButtonDisabled: {
        backgroundColor: p.neutralLighter,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralLighter
          }
        }
      },

      splitButtonMenuButtonChecked: {
        backgroundColor: p.neutralLight,
        color: p.black,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralQuaternaryAlt
          }
        }
      },

      splitButtonMenuButtonExpanded: {
        backgroundColor: p.neutralLight,
        color: p.black,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralQuaternaryAlt
          }
        }
      },

      splitButtonMenuIcon: {
        color: p.neutralPrimary
      },

      splitButtonMenuIconDisabled: {
        color: p.neutralTertiary
      },

      label: {
        fontWeight: 'normal' // theme.fontWeights.semibold,
      },

      icon: {
        color: p.themeDarkAlt
      },

      menuIcon: {
        color: p.neutralSecondary
      }
    };

    return concatStyleSets(baseButtonStyles, baseSplitButtonStyles, commandButtonStyles, customStyles)!;
  }
);
