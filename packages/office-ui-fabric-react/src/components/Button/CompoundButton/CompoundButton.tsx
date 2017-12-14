import { styled } from '../../../Utilities';
import { SplitButtonBase, ISplitButtonBaseProps } from '../';
import { getStyles, getSplitStyles } from './CompoundButton.styles';

export const CompoundButton = styled(
  SplitButtonBase,
  getStyles,
  props => ({
    getSplitStyles: getSplitStyles
  })
);