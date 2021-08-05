import { IButtonStyles } from '../Button.types';
import {
  ITheme,
  concatStyleSets,
  getFocusStyle,
  HighContrastSelector,
  getHighContrastNoAdjustStyle,
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles';
import { ButtonGlobalClassNames } from '../BaseButton.classNames';

export const getStyles = memoizeFunction(
  (theme: ITheme, customStyles?: IButtonStyles, focusInset?: string, focusColor?: string): IButtonStyles => {
    const baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme);
    const baseSplitButtonStyles: IButtonStyles = getSplitButtonStyles(theme);

    const { palette: p, semanticColors } = theme;

    const commandButtonHighContrastFocus = {
      left: 4,
      top: 4,
      bottom: 4,
      right: 4,
      border: 'none',
    };

    const commandButtonStyles: IButtonStyles = {
      root: [
        getFocusStyle(theme, {
          inset: 2,
          highContrastStyle: commandButtonHighContrastFocus,
          borderColor: 'transparent',
        }),
        theme.fonts.medium,
        {
          minWidth: '40px',
          backgroundColor: p.white,
          color: p.neutralPrimary,
          padding: '0 4px',
          border: 'none',
          borderRadius: 0,
          selectors: {
            [HighContrastSelector]: {
              border: 'none',
            },
          },
        },
      ],

      rootHovered: {
        backgroundColor: p.neutralLighter,
        color: p.neutralDark,
        selectors: {
          [HighContrastSelector]: {
            color: 'Highlight',
          },
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: p.themeDarkAlt,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: p.neutralPrimary,
          },
        },
      },

      rootPressed: {
        backgroundColor: p.neutralLight,
        color: p.neutralDark,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: p.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: p.neutralPrimary,
          },
        },
      },

      rootChecked: {
        backgroundColor: p.neutralLight,
        color: p.neutralDark,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: p.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: p.neutralPrimary,
          },
        },
      },

      rootCheckedHovered: {
        backgroundColor: p.neutralQuaternaryAlt,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: p.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: p.neutralPrimary,
          },
        },
      },

      rootExpanded: {
        backgroundColor: p.neutralLight,
        color: p.neutralDark,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: p.themeDark,
          },
          [`.${ButtonGlobalClassNames.msButtonMenuIcon}`]: {
            color: p.neutralPrimary,
          },
        },
      },

      rootExpandedHovered: {
        backgroundColor: p.neutralQuaternaryAlt,
      },

      rootDisabled: {
        backgroundColor: p.white,
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: semanticColors.disabledBodySubtext,
            selectors: {
              [HighContrastSelector]: {
                color: 'GrayText',
                ...getHighContrastNoAdjustStyle(),
              },
            },
          },
          [HighContrastSelector]: {
            color: 'GrayText',
            backgroundColor: 'Window',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      // Split button styles
      splitButtonContainer: {
        height: '100%',
        selectors: {
          [HighContrastSelector]: {
            border: 'none',
          },
        },
      },

      splitButtonDividerDisabled: {
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Window',
          },
        },
      },

      splitButtonDivider: {
        backgroundColor: p.neutralTertiaryAlt,
      },

      splitButtonMenuButton: {
        backgroundColor: p.white,
        border: 'none',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        color: p.neutralSecondary,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralLighter,
            color: p.neutralDark,
            selectors: {
              [HighContrastSelector]: {
                color: 'Highlight',
              },
              [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
                color: p.neutralPrimary,
              },
            },
          },
          ':active': {
            backgroundColor: p.neutralLight,
            selectors: {
              [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
                color: p.neutralPrimary,
              },
            },
          },
        },
      },

      splitButtonMenuButtonDisabled: {
        backgroundColor: p.white,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            border: 'none',
            backgroundColor: 'Window',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      splitButtonMenuButtonChecked: {
        backgroundColor: p.neutralLight,
        color: p.neutralDark,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralQuaternaryAlt,
          },
        },
      },

      splitButtonMenuButtonExpanded: {
        backgroundColor: p.neutralLight,
        color: p.black,
        selectors: {
          ':hover': {
            backgroundColor: p.neutralQuaternaryAlt,
          },
        },
      },

      splitButtonMenuIcon: {
        color: p.neutralPrimary,
      },

      splitButtonMenuIconDisabled: {
        color: p.neutralTertiary,
      },

      label: {
        fontWeight: 'normal', // theme.fontWeights.semibold,
      },

      icon: {
        color: p.themePrimary,
      },

      menuIcon: {
        color: p.neutralSecondary,
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
    };

    return concatStyleSets(baseButtonStyles, baseSplitButtonStyles, commandButtonStyles, customStyles)!;
  },
);
