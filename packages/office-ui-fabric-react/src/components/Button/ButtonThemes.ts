import { IButtonStyles } from './Button.types';
import { ITheme, HighContrastSelector } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

export function standardStyles(theme: ITheme): IButtonStyles {
  const { semanticColors: s } = theme;

  const buttonBackground = s.buttonBackground;
  const buttonBackgroundPressed = s.buttonBackgroundPressed;
  const buttonBackgroundHovered = s.buttonBackgroundHovered;

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

    rootDisabled: {
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window'
        }
      }
    }
  };
}

export function primaryStyles(theme: ITheme): IButtonStyles {
  const { palette: p, semanticColors: s } = theme;

  return {
    root: {
      backgroundColor: s.primaryButtonBackground,
      color: s.primaryButtonText,
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
              border: `none`,
              outlineColor: p.white
            }
          }
        }
      }
    },

    rootHovered: {
      backgroundColor: s.primaryButtonBackgroundHovered,
      color: s.primaryButtonTextHovered,
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'Highlight'
        }
      }
    },

    rootPressed: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed,
      selectors: {
        [HighContrastSelector]: {
          color: 'Window',
          backgroundColor: 'WindowText',
          MsHighContrastAdjust: 'none'
        }
      }
    },

    rootExpanded: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed
    },

    rootChecked: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed
    },

    rootCheckedHovered: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed
    },

    rootDisabled: {
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window'
        }
      }
    }
  };
}
