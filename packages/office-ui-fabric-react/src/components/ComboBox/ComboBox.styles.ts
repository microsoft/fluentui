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

    }
  };

  return mergeStyleSets(styles, customStyles);
});