import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ComboButtonSlots = {
  root: NonNullable<Slot<'div'>>;

  content: NonNullable<Slot<'button'>>;

  dropdownIcon: Slot<'span'>;
};

export type ComboButtonCommons = {
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  placeholder?: string;

  value?: string;
};

/**
 * ComboButton Props
 */
export type ComboButtonProps = ComponentProps<ComboButtonSlots, 'content'> & ComboButtonCommons;

/**
 * State used in rendering ComboButton
 */
export type ComboButtonState = ComponentState<ComboButtonSlots> &
  ComboButtonCommons & {
    open: boolean;
  };
