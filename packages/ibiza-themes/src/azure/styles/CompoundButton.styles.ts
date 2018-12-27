import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/';

export const compoundButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: semanticColors.buttonBackground,
      border: `1px solid ${semanticColors.buttonText}`,
      selectors: {
        '.ms-Button-description': {
          color: semanticColors.buttonText
        },
        '.ms-Button-label': {
          color: semanticColors.buttonText
        },
        '&.ms-Button--compoundPrimary': {
          backgroundColor: semanticColors.primaryButtonBackground,
          border: `0px`,
          selectors: {
            '.ms-Button-description': {
              color: semanticColors.primaryButtonText
            },
            '.ms-Button-label': {
              color: semanticColors.primaryButtonText
            }
          }
        }
      }
    },
    rootHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      border: `1px solid ${semanticColors.buttonTextHovered}`,
      selectors: {
        '.ms-Button-description': {
          color: semanticColors.buttonTextHovered
        },
        '.ms-Button-label': {
          color: semanticColors.buttonTextHovered
        },
        '&.ms-Button--compoundPrimary': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          border: `0px`,
          selectors: {
            '.ms-Button-description': {
              color: semanticColors.primaryButtonTextHovered
            },
            '.ms-Button-label': {
              color: semanticColors.primaryButtonTextHovered
            }
          }
        }
      }
    }
  };
};
