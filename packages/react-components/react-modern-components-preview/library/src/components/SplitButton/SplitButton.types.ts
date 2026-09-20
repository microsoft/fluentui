import type {
  SplitButtonProps as SplitButtonBaseProps,
  SplitButtonSlots as SplitButtonBaseSlots,
  SplitButtonState as SplitButtonBaseState,
} from '@fluentui/react-headless-components-preview/split-button';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Button } from '../Button/Button';
import type { ButtonProps } from '../Button/Button.types';
import type { MenuButton } from '../MenuButton/MenuButton';

export type SplitButtonSlots = Omit<SplitButtonBaseSlots, 'menuButton' | 'primaryActionButton'> & {
  menuButton?: Slot<typeof MenuButton>;
  primaryActionButton?: Slot<typeof Button>;
};

export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Omit<SplitButtonBaseProps, keyof SplitButtonBaseSlots> &
  Pick<ButtonProps, 'appearance' | 'shape' | 'size'>;

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Omit<SplitButtonBaseState, keyof SplitButtonBaseSlots | 'components'> & {
    appearance: SplitButtonProps['appearance'];
    shape: SplitButtonProps['shape'];
    size: SplitButtonProps['size'];
    root: {
      'data-appearance'?: SplitButtonProps['appearance'];
      'data-disabled'?: string;
      'data-disabled-focusable'?: string;
      'data-shape'?: SplitButtonProps['shape'];
      'data-size'?: SplitButtonProps['size'];
    };
  };
