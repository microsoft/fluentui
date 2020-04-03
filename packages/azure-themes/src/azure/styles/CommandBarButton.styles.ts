import { ITheme } from 'office-ui-fabric-react';
import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { FontSizes } from '../AzureType';

export const CommandBarButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    icon: {
      color: semanticColors.focusBorder,
    },
    iconChecked: {
      color: '#0078D4 !important', //semanticColors.focusBorder
    },
    menuIcon: {
      color: semanticColors.bodyText,
    },
    menuIconDisabled: {
      color: semanticColors.disabledIconColor,
    },
    root: {
      ...getFocusStyle(theme, { inset: 2 }),
      fontSize: FontSizes.size13,
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.bodyText,
      height: '36px',
    },
    rootExpanded: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.bodyText,
    },
    rootHovered: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.bodyText,
    },
    rootPressed: {
      backgroundColor: semanticColors.menuItemBackgroundPressed,
      color: semanticColors.bodyText,
    },
    rootChecked: {
      backgroundColor: semanticColors.listItemBackgroundChecked,
      color: semanticColors.bodyText,
    },
    rootCheckedPressed: {
      backgroundColor: semanticColors.menuItemBackgroundPressed,
      color: semanticColors.bodyText,
    },
    rootCheckedHovered: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
    },
    rootExpandedHovered: {},
    rootDisabled: {
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.disabledBodyText,
    },
    iconDisabled: {
      color: semanticColors.disabledIconColor,
    },
    splitButtonMenuButton: {
      backgroundColor: semanticColors.bodyBackground,
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
