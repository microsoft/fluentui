import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type OptionSlots = {
  root: NonNullable<Slot<'div'>>;

  check: Slot<'span'>;
};

export type OptionCommons = {
  /**
   * Disabled options cannot be selected, but are still navigable
   */
  disabled?: boolean;
};

/**
 * Option Props
 */
export type OptionProps = ComponentProps<Partial<OptionSlots>> &
  OptionCommons & {
    /* Required as a unique identifier for options. It's recommended to use the same value as in key. */
    itemKey: string;

    /* define a string value if the children are not a string */
    value?: string;
  };

/**
 * State used in rendering Option
 */
export type OptionState = ComponentState<OptionSlots> &
  OptionCommons & {
    isActive: boolean;
    selected: boolean;
  };
