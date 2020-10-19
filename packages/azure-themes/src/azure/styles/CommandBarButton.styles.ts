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
      color: semanticColors.bodyText,
      paddingLeft: 4,
      paddingRight: 4,
    },
    rootExpanded: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.iconButtonFillHovered,
        },
        '.ms-Button-menuIcon': {
          color: semanticColors.buttonTextHovered,
        },
      },
    },
    rootExpandedHovered: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.iconButtonFillHovered,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.buttonTextHovered,
        },
      },
    },
    rootHovered: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.iconButtonFillHovered,
        },
        '.ms-Button-menuIcon': {
          color: semanticColors.buttonTextHovered,
        },
      },
    },
    rootPressed: {
      backgroundColor: semanticColors.menuItemBackgroundPressed,
      color: semanticColors.buttonTextHovered,
      selectors: {
        '.ms-Button-icon': {
          color: extendedSemanticColors.iconButtonFillHovered,
        },
        '.ms-Button-menuIcon': {
          color: extendedSemanticColors.buttonTextHovered,
        },
      },
    },
    rootChecked: {
      backgroundColor: semanticColors.listItemBackgroundChecked,
      color: semanticColors.bodyText,
    },
    rootDisabled: {
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.disabledBodyText,
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
