import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type SelectSlots = {
  /*
   * Wrapper for both the select and icon, renders as a `<span>`.
   * The `className` and `style` props on `<Select>` are applied to this slot;
   * All other top-level props are applied to the primary slot, `select`.
   */
  root: IntrinsicShorthandProps<'span'>;
  /** Primary slot: the actual `<select>` element */
  select: IntrinsicShorthandProps<'select'>;
  /** the icon, typically a down arrow */
  icon: IntrinsicShorthandProps<'span'>;
};

export interface SelectCommons {
  /**
   * Matches the Input sizes
   * @default 'medium'
   */
  size: 'small' | 'medium' | 'large';

  inline?: boolean;

  /** @default 'outline' */
  appearance: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
}

export type SelectProps = Omit<ComponentProps<SelectSlots, 'select'>, 'size'> & Partial<SelectCommons>;

export type SelectState = ComponentState<SelectSlots> & SelectCommons;
