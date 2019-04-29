import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const CommandBarButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, semanticColors } = theme;

  const BUTTON_ICON_CLASSNAME = '.ms-Button-icon';

  return {
    root: [
      { ...getFocusStyle(theme, 2) },
      {
        backgroundColor: palette.white
      }
    ],

    rootHovered: {
      backgroundColor: palette.neutralLighter,
      selectors: {
        [BUTTON_ICON_CLASSNAME]: {
          color: palette.themeDarkAlt
        }
      }
    },

    rootPressed: {
      backgroundColor: palette.neutralLight,
      color: palette.neutralDark,
      selectors: {
        [BUTTON_ICON_CLASSNAME]: {
          color: palette.themeDark
        }
      }
    },

    rootChecked: {
      backgroundColor: palette.neutralLight,
      color: palette.neutralDark,
      selectors: {
        [BUTTON_ICON_CLASSNAME]: {
          color: palette.themeDark
        }
      }
    },

    rootCheckedHovered: {
      backgroundColor: palette.neutralQuaternaryAlt,
      color: palette.neutralDark
    },

    rootExpanded: {
      color: palette.neutralDark,
      backgroundColor: palette.neutralLight,
      selectors: {
        [BUTTON_ICON_CLASSNAME]: {
          color: palette.themeDark
        }
      }
    },

    rootExpandedHovered: {
      background: palette.neutralQuaternaryAlt
    },

    rootDisabled: {
      backgroundColor: palette.white,
      selectors: {
        [BUTTON_ICON_CLASSNAME]: {
          color: semanticColors.disabledBodySubtext
        }
      }
    },

    splitButtonMenuButton: {
      backgroundColor: palette.white,
      color: palette.neutralSecondary,
      selectors: {
        ':hover': {
          backgroundColor: palette.neutralLighter,
          selectors: {
            [BUTTON_ICON_CLASSNAME]: {
              color: palette.neutralPrimary
            }
          }
        },
        ':active': {
          backgroundColor: palette.neutralLight,
          selectors: {
            [BUTTON_ICON_CLASSNAME]: {
              color: palette.neutralPrimary
            }
          }
        }
      }
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: palette.white
    },

    icon: {
      color: palette.themePrimary
    }
  };
};
