import type { SplitButtonBaseProps, SplitButtonBaseSlots, SplitButtonBaseState } from '@fluentui/react-button';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Button } from '../Button/Button';
import type { MenuButton } from '../MenuButton/MenuButton';

export type SplitButtonSlots = Omit<SplitButtonBaseSlots, 'menuButton' | 'primaryActionButton'> & {
  menuButton?: Slot<typeof MenuButton>;
  primaryActionButton?: Slot<typeof Button>;
};

/**
 * SplitButton props
 */
export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Pick<SplitButtonBaseProps, 'disabled' | 'disabledFocusable' | 'icon' | 'iconPosition' | 'menuIcon'>;

/**
 * State used in rendering SplitButton
 */
export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Pick<SplitButtonBaseState, 'disabled' | 'disabledFocusable' | 'iconPosition'>;
