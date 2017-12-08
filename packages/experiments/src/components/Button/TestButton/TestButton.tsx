import { styled } from '../../../Utilities';
import { ButtonBase } from '../_base/Button.base';
import { MenuButtonBase } from '../_base/MenuButton.base';
import { SplitButtonBase } from '../_base/SplitButton.base';


import { getStyles } from './TestButton.styles';

export const TestButton = styled(
  ButtonBase,
  getStyles
);

export const TestMenuButton = styled(
  MenuButtonBase,
  getStyles,
  props => ({
    menuIconProps: { iconName: 'ChevronDown' }
  })
);

export const TestSplitButton = styled(
  SplitButtonBase,
  getStyles
);