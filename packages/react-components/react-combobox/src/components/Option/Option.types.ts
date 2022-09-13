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
   * Add optional custom data to options, which will be passed through to onOptionSelect
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;

  /**
   * Sets an option to the `disabled` state.
   * Disabled options cannot be selected, but are still keyboard navigable
   */
  disabled?: boolean;

  /*
   * Defines a string value for the option, used for the parent Combobox's value and filtering/typing logic.
   * Use this if the children use JSX instead of a simple string (e.g. options that include an icon or image).
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

    // Whether the keyboard focus outline style should be visible
    focusVisible: boolean;

    /* If true, the option is part of a multiselect combobox or listbox */
    multiselect?: boolean;

    /* If true, the option is selected */
    selected: boolean;
  };
