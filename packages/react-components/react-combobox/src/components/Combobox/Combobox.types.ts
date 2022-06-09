import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ComboboxBaseProps, ComboboxBaseState } from '../../ComboboxBase/ComboboxBase.types';
import { Listbox } from '../Listbox/Listbox';

export type ComboboxSlots = {
  /* The root combobox slot */
  root: NonNullable<Slot<'div'>>;

  /* The dropdown arrow icon */
  expandIcon: Slot<'span'>;

  /* The primary slot, the element with role="combobox" */
  input: NonNullable<Slot<'input'>>;

  /* The dropdown listbox slot */
  listbox: NonNullable<Slot<typeof Listbox>>;
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
