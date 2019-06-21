import { IComboBoxStyles, IComboBoxProps } from 'office-ui-fabric-react/lib/ComboBox';

export const ComboBoxStyles = (props: IComboBoxProps): Partial<IComboBoxStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, effects } = theme;

  return {
    root: {
      paddingLeft: 12
    },
    callout: {
      borderRadius: effects.roundedCorner2,
      border: `1px solid ${palette.neutralSecondaryAlt}`
    },
    header: {
      padding: '0 16px',
      height: 32,
      lineHeight: 32
    },
    optionsContainer: {
      selectors: {
        '.ms-ComboBox-option': {
          padding: '5px 16px',
          minHeight: 32
        },
        '.ms-ComboBox-optionText': {
          margin: 1
        },
        '.ms-Button-flexContainer > span': {
          display: 'block'
        }
      }
    }
  };
};
