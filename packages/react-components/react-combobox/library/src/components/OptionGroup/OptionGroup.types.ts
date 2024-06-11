import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type OptionGroupSlots = {
  /** The root group wrapper */
  root: NonNullable<Slot<'div'>>;

  /**
   * The option group label, displayed as static text before the child options.
   * If not using label, it's recommended to set `aria-label` directly on the OptionGroup instead.
   */
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
