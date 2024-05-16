import { HighContrastSelector, getHighContrastNoAdjustStyle } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';
import type { IButtonStyles } from './Button.types';
import type { ITheme, IRawStyle } from '../../Styling';

const splitButtonDividerBaseStyles = (): IRawStyle => {
  return {
    position: 'absolute',
    width: 1,
    right: 31,
    top: 8,
    bottom: 8,
  };
};

export function standardStyles(theme: ITheme): IButtonStyles {
  const { semanticColors: s, palette: p } = theme;

  const buttonBackground = s.buttonBackground;
  const buttonBackgroundPressed = s.buttonBackgroundPressed;
  const buttonBackgroundHovered = s.buttonBackgroundHovered;
  const buttonBackgroundDisabled = s.buttonBackgroundDisabled;

  const buttonText = s.buttonText;
  const buttonTextHovered = s.buttonTextHovered;
  const buttonTextDisabled = s.buttonTextDisabled;
  const buttonTextChecked = s.buttonTextChecked;
  const buttonTextCheckedHovered = s.buttonTextCheckedHovered;

  return {
    root: {
      backgroundColor: buttonBackground,
      color: buttonText,
    },

    rootHovered: {
      backgroundColor: buttonBackgroundHovered,
      color: buttonTextHovered,
      [HighContrastSelector]: {
        borderColor: 'Highlight',
        color: 'Highlight',
      },
    },

    rootPressed: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked,
    },

    rootExpanded: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked,
    },

    rootChecked: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextChecked,
    },

    rootCheckedHovered: {
      backgroundColor: buttonBackgroundPressed,
      color: buttonTextCheckedHovered,
    },

    rootDisabled: {
      color: buttonTextDisabled,
      backgroundColor: buttonBackgroundDisabled,
      [HighContrastSelector]: {
        color: 'GrayText',
        borderColor: 'GrayText',
        backgroundColor: 'Window',
      },
    },

    // Split button styles
    splitButtonContainer: {
      [HighContrastSelector]: {
        border: 'none',
      },
    },

    splitButtonMenuButton: {
      color: p.white,
      backgroundColor: 'transparent',
      ':hover': {
        backgroundColor: p.neutralLight,
        [HighContrastSelector]: {
          color: 'Highlight',
        },
      },
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: s.buttonBackgroundDisabled,
      ':hover': {
        backgroundColor: s.buttonBackgroundDisabled,
      },
    },

    splitButtonDivider: {
      ...splitButtonDividerBaseStyles(),
      backgroundColor: p.neutralTertiaryAlt,
      [HighContrastSelector]: {
        backgroundColor: 'WindowText',
      },
    },

    splitButtonDividerDisabled: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: p.neutralQuaternaryAlt,
      ':hover': {
        backgroundColor: p.neutralQuaternaryAlt,
      },
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: p.neutralQuaternaryAlt,
      ':hover': {
        backgroundColor: p.neutralQuaternaryAlt,
      },
    },

    splitButtonMenuIcon: {
      color: s.buttonText,
    },

    splitButtonMenuIconDisabled: {
      color: s.buttonTextDisabled,
    },
  };
}

export function primaryStyles(theme: ITheme): IButtonStyles {
  const { palette: p, semanticColors: s } = theme;

  return {
    root: {
      backgroundColor: s.primaryButtonBackground,
      border: `1px solid ${s.primaryButtonBackground}`,
      color: s.primaryButtonText,
      [HighContrastSelector]: {
        color: 'Window',
        backgroundColor: 'WindowText',
        borderColor: 'WindowText',
        ...getHighContrastNoAdjustStyle(),
      },
      [`.${IsFocusVisibleClassName} &:focus, :host(.${IsFocusVisibleClassName}) &:focus`]: {
        ':after': {
          border: `none`,
          outlineColor: p.white,
        },
      },
    },

    rootHovered: {
      backgroundColor: s.primaryButtonBackgroundHovered,
      border: `1px solid ${s.primaryButtonBackgroundHovered}`,
      color: s.primaryButtonTextHovered,
      [HighContrastSelector]: {
        color: 'Window',
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
      },
    },

    rootPressed: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      border: `1px solid ${s.primaryButtonBackgroundPressed}`,
      color: s.primaryButtonTextPressed,
      [HighContrastSelector]: {
        color: 'Window',
        backgroundColor: 'WindowText',
        borderColor: 'WindowText',
        ...getHighContrastNoAdjustStyle(),
      },
    },

    rootExpanded: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed,
    },

    rootChecked: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed,
    },

    rootCheckedHovered: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      color: s.primaryButtonTextPressed,
    },

    rootDisabled: {
      color: s.primaryButtonTextDisabled,
      backgroundColor: s.primaryButtonBackgroundDisabled,
      [HighContrastSelector]: {
        color: 'GrayText',
        borderColor: 'GrayText',
        backgroundColor: 'Window',
      },
    },

    // Split button styles
    splitButtonContainer: {
      [HighContrastSelector]: {
        border: 'none',
      },
    },

    splitButtonDivider: {
      ...splitButtonDividerBaseStyles(),
      backgroundColor: p.white,
      [HighContrastSelector]: {
        backgroundColor: 'Window',
      },
    },

    splitButtonMenuButton: {
      backgroundColor: s.primaryButtonBackground,
      color: s.primaryButtonText,
      [HighContrastSelector]: {
        backgroundColor: 'Canvas',
      },
      ':hover': {
        backgroundColor: s.primaryButtonBackgroundHovered,
        [HighContrastSelector]: {
          color: 'Highlight',
        },
      },
    },

    splitButtonMenuButtonDisabled: {
      backgroundColor: s.primaryButtonBackgroundDisabled,
      ':hover': {
        backgroundColor: s.primaryButtonBackgroundDisabled,
      },
    },

    splitButtonMenuButtonChecked: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      ':hover': {
        backgroundColor: s.primaryButtonBackgroundPressed,
      },
    },

    splitButtonMenuButtonExpanded: {
      backgroundColor: s.primaryButtonBackgroundPressed,
      ':hover': {
        backgroundColor: s.primaryButtonBackgroundPressed,
      },
    },

    splitButtonMenuIcon: {
      color: s.primaryButtonText,
    },

    splitButtonMenuIconDisabled: {
      color: p.neutralTertiary,

      [HighContrastSelector]: {
        color: 'GrayText',
      },
    },
  };
}
