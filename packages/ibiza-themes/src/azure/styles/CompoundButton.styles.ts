import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/';
import * as StyleConstants from '../Constants';

export const compoundButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      backgroundColor: semanticColors.buttonBackground,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonText}`,
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
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextHovered}`,
      color: semanticColors.buttonTextHovered,
      selectors: {
        '&.ms-Button--compound:hover': {
          selectors: {
            '.ms-Button-description': {
              color: semanticColors.buttonTextHovered
            },
            '.ms-Button-label': {
              color: semanticColors.buttonTextHovered
            }
          }
        },
        '&.ms-Button--compoundPrimary:hover': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
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
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      color: semanticColors.buttonTextPressed,
      selectors: {
        '&.ms-Button--compound:active': {
          selectors: {
            '.ms-Button-description': {
              color: semanticColors.buttonTextPressed
            },
            '.ms-Button-label': {
              color: semanticColors.buttonTextPressed
            }
          }
        },
        '&.ms-Button--compoundPrimary:active': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: semanticColors.primaryButtonTextPressed,
          border: `0px`,
          selectors: {
            '.ms-Button-description': {
              color: semanticColors.primaryButtonTextPressed
            },
            '.ms-Button-label': {
              color: semanticColors.primaryButtonTextPressed
            }
          }
        }
      }
    },
    rootDisabled: {
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      color: semanticColors.buttonTextDisabled,
      border: '0px',
      selectors: {
        '&.ms-Button--compound': {
          selectors: {
            '.ms-Button-description': {
              color: semanticColors.buttonTextDisabled
            },
            '.ms-Button-label': {
              color: semanticColors.buttonTextDisabled
            }
          }
        },
        '&.ms-Button--compoundPrimary': {
          backgroundColor: semanticColors.buttonBackgroundDisabled,
          selectors: {
            '.ms-Button-description': {
              color: semanticColors.buttonTextDisabled
            },
            '.ms-Button-label': {
              color: semanticColors.buttonTextDisabled
            }
          }
        }
      }
    }
  };
};
