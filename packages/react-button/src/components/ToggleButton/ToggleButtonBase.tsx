import { compose } from '@fluentui/react-compose';
import { ButtonBase } from '../Button/ButtonBase';
import { ButtonProps } from '../Button/Button.types';
import { ToggleButtonProps } from './ToggleButton.types';
import { useToggleButton } from './useToggleButton';

export const ToggleButtonBase = compose<'button', ToggleButtonProps, ToggleButtonProps, ButtonProps, ButtonProps>(
  ButtonBase,
  {
    displayName: 'ToggleButtonBase',
    state: useToggleButton,
  },
);

ButtonBase.defaultProps = {
  as: 'button',
};
