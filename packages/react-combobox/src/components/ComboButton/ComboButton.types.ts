import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ComboButtonSlots = {
  /* The wrapper slot */
  root: NonNullable<Slot<'div'>>;

  /* The primary slot, a `<button>` with `role="combobox"` */
  content: NonNullable<Slot<'button'>>;

  /* The dropdown arrow icon */
  expandIcon: Slot<'span'>;
};

type ComboButtonCommons = {
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
export type ComboButtonProps = Partial<ComponentProps<ComboButtonSlots, 'content'>> & ComboButtonCommons;

/**
 * State used in rendering ComboButton
 */
export type ComboButtonState = ComponentState<ComboButtonSlots> & ComboButtonCommons;
