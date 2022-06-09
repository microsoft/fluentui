import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ComboboxBaseProps, ComboboxBaseState } from '../../ComboboxBase/ComboboxBase.types';
import { Listbox } from '../Listbox/Listbox';

export type ComboboxSlots = {
  /* The root combobox slot */
  root: NonNullable<Slot<'div'>>;

  /* The dropdown listbox slot */
  listbox: NonNullable<Slot<typeof Listbox>>;

  /* The primary slot, the element with role="combobox" */
  input: NonNullable<Slot<'input'>>;
};

/**
 * Combobox Props
 */
export type ComboboxProps = Omit<ComponentProps<Partial<ComboboxSlots>, 'input'>, 'children' | 'size'> &
  ComboboxBaseProps & {
    children: React.ReactNode;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> & ComboboxBaseState;
