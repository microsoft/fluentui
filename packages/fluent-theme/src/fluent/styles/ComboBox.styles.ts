import { fluentBorderRadius } from './styleConstants';
import { Depths } from '../FluentDepths';
import { NeutralColors } from '../FluentColors';
import { IComboBoxStyles, IComboBoxProps } from 'office-ui-fabric-react/lib/ComboBox';

export const ComboBoxStyles = (props: IComboBoxProps): Partial<IComboBoxStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      borderRadius: fluentBorderRadius, // the bound input box
      borderColor: NeutralColors.gray80,
      paddingLeft: 8
    },
    rootHovered: {
      borderColor: palette.neutralPrimary,
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
      borderRadius: fluentBorderRadius,
      border: 'none',
      boxShadow: Depths.depth8,
      selectors: {
        '.ms-Callout-main': { borderRadius: fluentBorderRadius }
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
