import { IButtonStyles } from './Button.types';
import { ITheme, HighContrastSelector } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

export function standardStyles(theme: ITheme): IButtonStyles {
  const { semanticColors: s, palette: p } = theme;

  const buttonBackground = p.white;
  const buttonBackgroundPressed = s.buttonBackgroundPressed;
  const buttonBackgroundHovered = p.neutralLighter;

  const buttonText = s.buttonText;
  const buttonTextHovered = s.buttonTextHovered;
  const buttonTextChecked = s.buttonTextChecked;
  const buttonTextCheckedHovered = s.buttonTextCheckedHovered;

  return {
    root: {
      backgroundColor: buttonBackground,
      color: buttonText
    },

    rootHovered: {
      backgroundColor: buttonBackgroundHovered,
      color: buttonTextHovered,
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight',
          color: 'Highlight'
        }
      }
    },

    rootPressed: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked
    },

    rootExpanded: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked
    },

    rootChecked: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked
    },

    rootCheckedHovered: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextCheckedHovered
    },

    // Split button styles
    splitButtonContainer: {
      selectors: {
        [HighContrastSelector]: {
          border: 'none'
        }
      }
    },

    splitButtonMenuButton: {
      color: p.white,
      backgroundColor: 'transparent',
      selectors: {
        ':hover': {
          backgroundColor: p.neutralLight,
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

    splitButtonDivider: {
      backgroundColor: p.neutralTertiaryAlt
    },

    splitButtonDividerDisabled: {
      backgroundColor: theme.palette.neutralTertiaryAlt
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: p.neutralQuaternaryAlt,
      selectors: {
        ':hover': {
          backgroundColor: p.neutralQuaternaryAlt
        }
      }
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: p.neutralQuaternaryAlt,
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
    }
  };
}

export function primaryStyles(theme: ITheme): IButtonStyles {
  const { palette: p } = theme;

  return {
    root: {
      backgroundColor: p.themePrimary,
      color: p.white,
      border: 'none',
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          MsHighContrastAdjust: 'none'
        },
        [`.${IsFocusVisibleClassName} &:focus`]: {
          selectors: {
            ':after': {
              outline: `none`,
              borderColor: p.white
            }
          }
        }
      }
    },

    rootHovered: {
      backgroundColor: p.themeDarkAlt,
      color: p.white,
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'Highlight'
        }
      }
    },

    rootPressed: {
      backgroundColor: p.themeDark,
      color: p.white,
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          MsHighContrastAdjust: 'none'
        }
      }
    },

    rootExpanded: {
      backgroundColor: p.themeDark,
      color: p.white
    },

    rootChecked: {
      backgroundColor: p.themeDark,
      color: p.white
    },

    rootCheckedHovered: {
      backgroundColor: p.themeDark,
      color: p.white
    },

    rootDisabled: {
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window'
        }
      }
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
      backgroundColor: p.neutralTertiaryAlt
    },

    splitButtonMenuButton: {
      backgroundColor: p.themePrimary,
      color: p.white,
      selectors: {
        ':hover': {
          backgroundColor: p.themeDarkAlt,
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
      backgroundColor: p.themeDark,
      selectors: {
        ':hover': {
          backgroundColor: p.themeDark
        }
      }
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: p.themeDark,
      selectors: {
        ':hover': {
          backgroundColor: p.themeDark
        }
      }
    },

    splitButtonMenuIcon: {
      color: p.white
    },

    splitButtonMenuIconDisabled: {
      color: p.neutralTertiary
    }
  };
}
