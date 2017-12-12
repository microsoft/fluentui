import { styled } from '../../../Utilities';
import { SplitButtonBase, ISplitButtonBaseProps } from '../';
import { getStyles, getSplitStyles } from './DefaultButton.styles';

export const DefaultButton = styled(
  SplitButtonBase,
  getStyles,
  props => ({
    getSplitStyles: getSplitStyles
  })
);