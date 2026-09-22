import type {
  ToolbarRadioButtonProps as ToolbarRadioButtonBaseProps,
  ToolbarRadioButtonState as ToolbarRadioButtonBaseState,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { ToggleButtonProps } from '../../ToggleButton/ToggleButton.types';

export type ToolbarRadioButtonProps = ToolbarRadioButtonBaseProps & Pick<ToggleButtonProps, 'appearance'>;

export type ToolbarRadioButtonState = ToolbarRadioButtonBaseState & {
  appearance: NonNullable<ToolbarRadioButtonProps['appearance']>;
  shape: NonNullable<ToggleButtonProps['shape']>;
  size: NonNullable<ToggleButtonProps['size']>;
  root: ToolbarRadioButtonBaseState['root'] & {
    'data-accessible'?: string;
    'data-appearance': NonNullable<ToolbarRadioButtonProps['appearance']>;
    'data-shape': NonNullable<ToggleButtonProps['shape']>;
    'data-size': NonNullable<ToggleButtonProps['size']>;
  };
};
