import type {
  ToolbarToggleButtonProps as ToolbarToggleButtonBaseProps,
  ToolbarToggleButtonState as ToolbarToggleButtonBaseState,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { ToggleButtonProps } from '../../ToggleButton/ToggleButton.types';

export type ToolbarToggleButtonProps = ToolbarToggleButtonBaseProps & Pick<ToggleButtonProps, 'appearance'>;

export type ToolbarToggleButtonState = ToolbarToggleButtonBaseState & {
  appearance: NonNullable<ToolbarToggleButtonProps['appearance']>;
  shape: NonNullable<ToggleButtonProps['shape']>;
  size: NonNullable<ToggleButtonProps['size']>;
  root: ToolbarToggleButtonBaseState['root'] & {
    'data-accessible'?: string;
    'data-appearance': NonNullable<ToolbarToggleButtonProps['appearance']>;
    'data-shape': NonNullable<ToggleButtonProps['shape']>;
    'data-size': NonNullable<ToggleButtonProps['size']>;
  };
};
