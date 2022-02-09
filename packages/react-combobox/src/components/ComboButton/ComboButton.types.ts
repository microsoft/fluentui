import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ComboButtonSlots = {
  /* The wrapper slot */
  root: NonNullable<Slot<'div'>>;

  /* The primary slot, a `<button>` with `role="combobox"` */
  content: NonNullable<Slot<'button'>>;

  /* The dropdown arrow icon */
  dropdownIcon: Slot<'span'>;
};

export type ComboButtonCommons = {
  /**
   * Controls the colors and borders of the combobox.
   * @default 'outline'
   */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  /**
   * If set, the placeholder will show when value is undefined
   */
  placeholder?: string;

  /**
   * Sets the displayed value of the ComboButton
   */
  value?: string;
};

/**
 * ComboButton Props
 */
export type ComboButtonProps = Partial<ComponentProps<ComboButtonSlots, 'content'>> &
  ComboButtonCommons & {
    /** ComboButton is similar to a readonly input, and can't have children. */
    // TODO: sort out Slot types for children: never
    // children?: never;
  };

/**
 * State used in rendering ComboButton
 */
export type ComboButtonState = ComponentState<ComboButtonSlots> &
  ComboButtonCommons & {
    /* The open state of the parent Combobox, used to set accessibility properties */
    open: boolean;
  };
