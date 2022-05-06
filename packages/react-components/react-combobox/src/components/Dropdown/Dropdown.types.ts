import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ComboButton } from '../ComboButton/ComboButton';
import type { ComboboxBaseProps, ComboboxBaseSlots, ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';

export type DropdownSlots = Omit<ComboboxBaseSlots, 'input'> & {
  input: NonNullable<Slot<typeof ComboButton>>;
};

/**
 * Dropdown Props
 */
export type DropdownProps = ComponentProps<DropdownSlots> & Omit<ComboboxBaseProps, 'input'>;

/**
 * State used in rendering Dropdown
 */
export type DropdownState = Omit<ComboboxBaseState, 'components' | 'input'> & ComponentState<DropdownSlots>;
