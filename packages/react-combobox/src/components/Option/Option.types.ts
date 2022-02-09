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
    /*
     * Internal use only: used to associate Options with their parent Combobox context.
     * Manually setting this prop is not recommended.
     */
    fluentKey?: string;

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
