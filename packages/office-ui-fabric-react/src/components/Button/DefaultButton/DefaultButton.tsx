import { styled } from '../../../Utilities';
import { SplitButtonBase } from '../';

import { getStyles, getSplitStyles } from './DefaultButton.styles';

export const DefaultButton = styled(
  SplitButtonBase,
  getStyles,
  props => ({
    menuIconProps: { iconName: 'DownChevron' }
  })
);