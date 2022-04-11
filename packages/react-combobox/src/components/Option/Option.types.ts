import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type OptionSlots = {
  /* The root option slot, with role="option" */
  root: NonNullable<Slot<'div'>>;

  /* The check icon that is visible for selected options */
  checkIcon: Slot<'span'>;
};

type OptionCommons = {
  /**
   * Sets an option to the `disabled` state.
   * Disabled options cannot be selected, but are still keyboard navigable
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

    /*
     * Defines a string value for the option, used for the parent Combobox's value.
     * Use this if the children are not a string, or you wish the value to differ from the displayed text.
     */
    value?: string;
  };

/**
 * State used in rendering Option
 */
export type OptionState = ComponentState<OptionSlots> &
  OptionCommons & {
    /* If true, this is the currently highlighted option */
    active: boolean;

    /* If true, the option is selected */
    selected: boolean;
  };
