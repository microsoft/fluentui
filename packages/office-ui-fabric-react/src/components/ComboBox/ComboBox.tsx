import { styled } from '../../Utilities';
import { ComboBoxBase } from './ComboBox.base';
import { getStyles, getCaretDownButtonStyles, getOptionStyles } from './ComboBox.styles';
import { IComboBoxProps } from './ComboBox.types';

const getSubComponentStyleProps = (props: IComboBoxProps): Partial<IComboBoxProps> => {
  return {
    getCaretDownButtonStyles,
    getOptionStyles
  };
};

export const ComboBox = styled(
  ComboBoxBase,
  getStyles,
  getSubComponentStyleProps
);