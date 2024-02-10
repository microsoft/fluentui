import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SelectSlots = {
  /*
   * Wrapper for both the select and icon, renders as a `<span>`.
   * The `className` and `style` props on `<Select>` are applied to this slot;
   * All other top-level props are applied to the primary slot, `select`.
   */
  root: NonNullable<Slot<'span'>>;

  /** Primary slot: the actual `<select>` element */
  select: NonNullable<Slot<'select'>>;

  /** the icon, typically a down arrow */
  icon: Slot<'span'>;
};

export type SelectProps = Omit<ComponentProps<Partial<SelectSlots>, 'select'>, 'size' | 'onChange'> & {
  /**
   * Controls the colors and borders of the Select.
   *
   * @default 'outline'
   */
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

  /**
   * Called when the user changes the select element's value by selecting an option.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onChange?: (ev: React.ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => void;

  /**
   * Matches the Input sizes
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

export type SelectState = ComponentState<SelectSlots> & Required<Pick<SelectProps, 'appearance' | 'size'>>;

/**
 * Data passed to the `onChange` callback when a new option is selected.
 */
export type SelectOnChangeData = {
  /**
   * Updated `<select>` value, taken from either the selected option's value prop or inner text.
   */
  value: string;
};
