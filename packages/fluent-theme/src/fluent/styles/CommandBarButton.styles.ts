import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const CommandBarButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, semanticColors } = theme;

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
        '.ms-Button-icon': {
          color: palette.themeDarkAlt
        }
      }
    },

    rootPressed: {
      backgroundColor: palette.neutralLight,
      color: palette.neutralDark,
      selectors: {
        '.ms-Button-icon': {
          color: palette.themeDark
        }
      }
    },

    rootChecked: {
      backgroundColor: palette.neutralLight,
      color: palette.neutralDark,
      selectors: {
        '.ms-Button-icon': {
          color: palette.themeDark
        }
      }
    },

    rootExpanded: {
      color: palette.neutralDark,
      selectors: {
        '.ms-Button-icon': {
          color: palette.themeDark
        }
      }
    },

    rootDisabled: {
      backgroundColor: palette.white,
      selectors: {
        '.ms-Button-icon': {
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
            '.ms-Button-icon': {
              color: palette.neutralPrimary
            }
          }
        },
        ':active': {
          backgroundColor: palette.neutralLight,
          selectors: {
            '.ms-Button-icon': {
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
