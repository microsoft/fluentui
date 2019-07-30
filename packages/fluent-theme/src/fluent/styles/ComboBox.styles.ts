import { IComboBoxStyles, IComboBoxProps } from 'office-ui-fabric-react/lib/ComboBox';
import { FontSizes } from '../FluentType';

export const ComboBoxStyles = (props: IComboBoxProps): Partial<IComboBoxStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { effects, semanticColors } = theme;

  const inputBorderFocused = theme.palette.neutralPrimary;

  return {
    root: {
      borderRadius: effects.roundedCorner2, // the bound input box
      borderColor: semanticColors.inputBorder,
      paddingLeft: 8,
      selectors: {
        '&.is-open': {
          borderColor: semanticColors.inputBorder
        }
      }
    },
    rootHovered: {
      borderColor: semanticColors.inputFocusBorderAlt,
      selectors: {
        '.ms-ComboBox-Input': {
          color: semanticColors.inputTextHovered
        }
      }
    },
    rootFocused: {
      borderColor: inputBorderFocused,
      selectors: {
        '.ms-ComboBox-Input': {
          color: semanticColors.inputTextHovered
        }
      }
    },
    errorMessage: {
      fontSize: FontSizes.size12
    },
    callout: {
      borderRadius: effects.roundedCorner2,
      border: 'none',
      selectors: {
        '.ms-Callout-main': { borderRadius: effects.roundedCorner2 }
      }
    },
    header: {
      padding: '0 8px'
    },
    optionsContainer: {
      selectors: {
        '.ms-ComboBox-option': {
          paddingLeft: 8,
          paddingRight: 8
        },
        '.is-checked': {
          backgroundColor: 'transparent',
          selectors: {
            ':hover': {
              backgroundColor: semanticColors.buttonBackgroundHovered,
              color: semanticColors.inputTextHovered
            },
            '.ms-Checkbox-text': {
              color: semanticColors.inputTextHovered
            }
          }
        },
        '.ms-Checkbox': {
          selectors: {
            ':hover, :hover:active': {
              backgroundColor: 'transparent'
            },
            '.ms-Checkbox-text:hover': {
              color: semanticColors.inputTextHovered
            }
          }
        }
      }
    }
  };
};
