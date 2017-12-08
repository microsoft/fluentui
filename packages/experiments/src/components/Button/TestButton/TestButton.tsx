import { styled } from '../../../Utilities';
import { ButtonBase } from '../_base/Button.base';
import { MenuButtonBase } from '../_base/MenuButton.base';
import { SplitButtonBase } from '../_base/SplitButton.base';


import { getStyles, getButtonStyles, getMenuButtonStyles } from './TestButton.styles';

export const TestButton = styled(
  ButtonBase,
  getButtonStyles
);

export const TestMenuButton = styled(
  MenuButtonBase,
  getMenuButtonStyles,
  props => ({
    menuIconProps: { iconName: 'ChevronDown' }
  })
);

export const TestSplitButton = styled(
  SplitButtonBase,
  getStyles
);