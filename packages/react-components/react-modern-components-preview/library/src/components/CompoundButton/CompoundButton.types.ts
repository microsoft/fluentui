import type {
  CompoundButtonProps as CompoundButtonBaseProps,
  CompoundButtonState as CompoundButtonBaseState,
} from '@fluentui/react-headless-components-preview/compound-button';
export type { CompoundButtonSlots } from '@fluentui/react-headless-components-preview/compound-button';
import type { ButtonProps } from '../Button/Button.types';

export type CompoundButtonProps = CompoundButtonBaseProps & Pick<ButtonProps, 'appearance' | 'shape' | 'size'>;

export type CompoundButtonState = CompoundButtonBaseState & {
  appearance: CompoundButtonProps['appearance'];
  shape: CompoundButtonProps['shape'];
  size: CompoundButtonProps['size'];
  root: {
    'data-appearance'?: CompoundButtonProps['appearance'];
    'data-shape'?: CompoundButtonProps['shape'];
    'data-size'?: CompoundButtonProps['size'];
  };
};
