import { ITheme } from '@fluentui/react';
import { getFocusStyle } from '@fluentui/react/lib/Styling';
import { IButtonStyles } from '@fluentui/react/lib/Button';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const CommandBarButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    icon: {
      color: extendedSemanticColors.iconButtonFill,
    },
    menuIcon: {
      color: semanticColors.bodyText,
    },
    root: {
      ...getFocusStyle(theme, { inset: 2 }),
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: semanticColors.bodyBackground,
      color: extendedSemanticColors.commandBarButtonText,
      paddingLeft: 4,
      paddingRight: 4,
    },
    rootExpanded: {
      backgroundColor: extendedSemanticColors.commandBarButtonBackgroundHover,
      color: extendedSemanticColors.commandBarButtonTextHover,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.commandBarButtonIconHover,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.commandBarButtonTextHover,
        },
      },
    },
    rootExpandedHovered: {
      backgroundColor: extendedSemanticColors.commandBarButtonBackgroundSelectedHover,
      color: extendedSemanticColors.commandBarButtonTextHover,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.commandBarButtonIconSelected,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.commandBarButtonTextHover,
        },
      },
    },
    rootHovered: {
      backgroundColor: extendedSemanticColors.commandBarButtonBackgroundHover,
      color: extendedSemanticColors.commandBarButtonTextHover,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.commandBarButtonIconHover,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.commandBarButtonTextHover,
        },
      },
    },
    rootPressed: {
      backgroundColor: extendedSemanticColors.commandBarButtonBackgroundSelected,
      color: extendedSemanticColors.commandBarButtonTextHover,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.commandBarButtonIconSelected,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.commandBarButtonTextHover,
        },
      },
    },
    rootChecked: {
      backgroundColor: extendedSemanticColors.commandBarButtonBackgroundSelected,
      color: extendedSemanticColors.commandBarButtonTextHover,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.commandBarButtonIconSelected,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.commandBarButtonTextHover,
        },
      },
    },
    rootDisabled: {
      backgroundColor: semanticColors.bodyBackground,
      color: extendedSemanticColors.commandBarButtonTextDisabled,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.commandBarButtonTextDisabled,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.commandBarButtonTextDisabled,
        },
      },
    },
    rootFocused: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.iconButtonFillHovered,
        },
        '.ms-Button-menuIcon': {
          color: semanticColors.buttonTextHovered,
        },
        '::after': {
          outlineColor: `${extendedSemanticColors.commandBarButtonAfterColor} !important`,
        },
      },
    },
    splitButtonMenuButton: {
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
        },
      },
    },
    splitButtonMenuButtonChecked: {
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
        },
      },
    },
    splitButtonMenuButtonDisabled: {
      backgroundColor: semanticColors.bodyBackground,
    },
    splitButtonMenuButtonExpanded: {
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
        },
      },
    },
    splitButtonMenuIcon: {
      color: semanticColors.bodyText,
    },
  };
};
