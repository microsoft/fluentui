import { IComboBoxStyles } from './ComboBox.Props';
import {
  ITheme,
  mergeStyleSets,
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IComboBoxStyles,
): IComboBoxStyles => {
  const styles: IComboBoxStyles = {
    container: {

    },
    root: {

    },
    input: {
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      font: 'inherit',
      textOverflow: 'ellipsis',
      paddingLeft: '12px'
    },
    caretButton: {
      color: '$ms-color-neutralDark',
      fontSize: '$ms-icon-size-s',
      position: 'absolute',
      height: '$ComboBox-height',
      lineHeight: '$ComboBox-height - 2px // height minus the border',
      width: '$ComboBox-caretDown-width',
      textAlign: 'center',
      cursor: 'default',
      '&:hover': {
        backgroundColor: '$ms-color-neutralQuaternaryAlt',
      },
      '&:active': {
        backgroundColor: '$ms-color-neutralTertiaryAlt',
      }
    }
  };

  return mergeStyleSets(styles, customStyles);
});