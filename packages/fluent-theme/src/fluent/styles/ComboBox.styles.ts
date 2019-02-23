import { IComboBoxStyles, IComboBoxProps } from 'office-ui-fabric-react/lib/ComboBox';

export const ComboBoxStyles = (props: IComboBoxProps): Partial<IComboBoxStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, effects } = theme;

  return {
    root: {
      borderRadius: effects.roundedCorner2, // the bound input box
      paddingLeft: 8
    },
    rootHovered: {
      selectors: {
        '.ms-ComboBox-Input': {
          color: palette.neutralDark
        }
      }
    },
    rootError: {
      borderColor: palette.red // current structure of ComboBox does not allow to change the hover/focus color when has error
    },
    callout: {
      borderRadius: effects.roundedCorner2,
      border: 'none',
      boxShadow: effects.elevation8,
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
          paddingRight: 8,
          selectors: {
            ':hover:active': {
              backgroundColor: palette.neutralLight
            }
          }
        },
        '.is-checked': {
          backgroundColor: 'transparent',
          selectors: {
            ':hover': {
              backgroundColor: palette.neutralLighter
            }
          }
        },
        '.ms-Checkbox': {
          selectors: {
            ':hover': {
              backgroundColor: palette.neutralLighter
            }
          }
        }
      }
    }
  };
};
