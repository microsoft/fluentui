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
  icon: NonNullable<Slot<'span'>>;
};

export interface SelectCommons {
  /**
   * Matches the Input sizes
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * If true, the Select will have an inline `display`, allowing it to be inline with other content.
   * By default, Select has block layout.
   * @default false
   */
  inline?: boolean;

  /**
   * Controls the colors and borders of the Select.
   * @default 'outline'
   */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
}

export type SelectProps = Omit<ComponentProps<Partial<SelectSlots>, 'select'>, 'size'> & SelectCommons;

export type SelectState = ComponentState<SelectSlots> & Required<SelectCommons>;
