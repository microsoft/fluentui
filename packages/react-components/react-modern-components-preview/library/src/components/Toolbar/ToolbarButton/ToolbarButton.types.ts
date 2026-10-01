import type {
  ToolbarButtonProps as ToolbarButtonBaseProps,
  ToolbarButtonState as ToolbarButtonBaseState,
} from '@fluentui/react-headless-components-preview/toolbar';
import type { ButtonProps } from '../../Button/Button.types';

export type ToolbarButtonProps = ToolbarButtonBaseProps & Pick<ButtonProps, 'appearance'>;

export type ToolbarButtonState = ToolbarButtonBaseState & {
  appearance: NonNullable<ToolbarButtonProps['appearance']>;
  shape: NonNullable<ButtonProps['shape']>;
  size: NonNullable<ButtonProps['size']>;
  root: ToolbarButtonBaseState['root'] & {
    'data-appearance': NonNullable<ToolbarButtonProps['appearance']>;
    'data-shape': NonNullable<ButtonProps['shape']>;
    'data-size': NonNullable<ButtonProps['size']>;
  };
};
