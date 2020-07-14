import { compose } from '@fluentui/react-compose';
import { ButtonBase } from '../Button/ButtonBase';
import { ButtonProps } from '../Button/Button.types';
import { ToggleButtonProps } from './ToggleButton.types';
import { useToggleState } from './useToggleState';

export const ToggleButtonBase = compose<'button', ToggleButtonProps, ToggleButtonProps, ButtonProps, ButtonProps>(
  ButtonBase,
  {
    displayName: 'ToggleButtonBase',
    state: useToggleState,
  },
);
