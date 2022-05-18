import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type OptionSlots = {
  /* The root option slot, with role="option" */
  root: NonNullable<Slot<'div'>>;

  /* The check icon that is visible for selected options */
  checkIcon: Slot<'span'>;
};

/**
 * Option Props
 */
export type OptionProps = ComponentProps<Partial<OptionSlots>> & {
  /**
   * Sets an option to the `disabled` state.
   * Disabled options cannot be selected, but are still keyboard navigable
   */
  disabled?: boolean;

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
  Pick<OptionProps, 'disabled'> & {
    /* If true, this is the currently highlighted option */
    active: boolean;

    /* If true, the option is part of a multiselect combobox or listbox */
    multiselect?: boolean;

    /* If true, the option is selected */
    selected: boolean;
  };
