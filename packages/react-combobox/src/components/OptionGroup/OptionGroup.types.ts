import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type OptionGroupSlots = {
  root: NonNullable<Slot<'div'>>;

  label?: Slot<'span'>;
};

/**
 * OptionGroup Props
 */
export type OptionGroupProps = ComponentProps<Partial<OptionGroupSlots>>;

/**
 * State used in rendering OptionGroup
 */
export type OptionGroupState = ComponentState<OptionGroupSlots>;
