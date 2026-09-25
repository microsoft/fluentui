import type {
  ToggleButtonProps as ToggleButtonBaseProps,
  ToggleButtonState as ToggleButtonBaseState,
} from '@fluentui/react-headless-components-preview/toggle-button';
export type { ToggleButtonSlots } from '@fluentui/react-headless-components-preview/toggle-button';
import type { ButtonProps } from '../Button/Button.types';

export type ToggleButtonProps = ToggleButtonBaseProps & Pick<ButtonProps, 'appearance' | 'shape' | 'size'>;

export type ToggleButtonState = ToggleButtonBaseState & {
  appearance: ToggleButtonProps['appearance'];
  shape: ToggleButtonProps['shape'];
  size: ToggleButtonProps['size'];
  root: {
    'data-accessible'?: string;
    'data-appearance'?: ToggleButtonProps['appearance'];
    'data-shape'?: ToggleButtonProps['shape'];
    'data-size'?: ToggleButtonProps['size'];
  };
};
