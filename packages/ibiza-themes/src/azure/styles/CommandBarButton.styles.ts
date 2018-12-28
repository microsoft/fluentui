import { ITheme } from 'office-ui-fabric-react';
import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { FontSizes } from '../AzureType';

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const commandBarButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    icon: {
      color: semanticColors.focusBorder
    },
    menuIcon: {
      color: semanticColors.bodyText
    },
    root: {
      ...getFocusStyle(theme, 2),
      fontSize: FontSizes.size12,
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.bodyText
    },
    rootExpanded: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.bodyText
    },
    rootHovered: {
      backgroundColor: semanticColors.menuItemBackgroundHovered,
      color: semanticColors.bodyText
    },
    rootPressed: {
      backgroundColor: semanticColors.menuItemBackgroundPressed,
      color: semanticColors.bodyText
    },
    rootChecked: {
      backgroundColor: semanticColors.menuItemBackgroundChecked,
      color: semanticColors.bodyText
    },
    rootDisabled: {
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.disabledBodyText
    },
    splitButtonMenuButton: [
      {
        backgroundColor: semanticColors.bodyBackground,
        selectors: {
          ':hover': {
            backgroundColor: semanticColors.menuItemBackgroundHovered
          }
        }
      }
    ],
    splitButtonMenuButtonChecked: [
      {
        backgroundColor: semanticColors.bodyBackground,
        selectors: {
          ':hover': {
            backgroundColor: semanticColors.menuItemBackgroundHovered
          }
        }
      }
    ],
    splitButtonMenuButtonExpanded: [
      {
        backgroundColor: semanticColors.bodyBackground,
        selectors: {
          ':hover': {
            backgroundColor: semanticColors.menuItemBackgroundHovered
          }
        }
      }
    ],
    splitButtonMenuIcon: {
      color: semanticColors.bodyText
    }
  };
};
