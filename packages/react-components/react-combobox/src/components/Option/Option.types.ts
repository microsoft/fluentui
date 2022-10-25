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

  /**
   * A string used as the option's display value if no children are present.
   * This is used as the Dropdown button's or Combobox input's value when the option is selected,
   * and as the comparison for type-to-find keyboard functionality.
   */
  label: string;

  /*
   * Defines a string value for the option, used as a unique identifier for the option.
   * Use this to control selectedOptions, or to get the option value in the onOptionSelect callback.
   * Defaults to `label` if not provided.
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
