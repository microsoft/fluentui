import { styled } from '../../../Utilities';
import { SplitButtonBase } from '../_base/SplitButton.base';


import { getStyles, getSplitStyles } from './DefaultButton.styles';

export const DefaultButton = styled(
  SplitButtonBase,
  getStyles,
  props => ({
    getSplitStyles
  })
);