import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type OptionSlots = {
  /** The root option slot, with role="option" */
  root: NonNullable<Slot<'div'>>;

  /** The check icon that is visible for selected options */
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
   * Defines a unique identifier for the option.
   * Use this to control selectedOptions, or to get the option value in the onOptionSelect callback.
   * Defaults to `text` if not provided.
   */
  value?: string;
} & (
    | {
        /**
         * An optional override the string value of the Option's display text,
         * defaulting to the Option's child content.
         * This is used as the Dropdown button's or Combobox input's value when the option is selected,
         * and as the comparison for type-to-find keyboard functionality.
         */
        text?: string;
        children: string;
      }
    | {
        /**
         * The string value of the Option's display text when the Option's children are not a string.
         * This is used as the Dropdown button's or Combobox input's value when the option is selected,
         * and as the comparison for type-to-find keyboard functionality.
         */
        text: string;
        children?: React.ReactNode;
      }
  );

/**
 * State used in rendering Option
 */
export type OptionState = ComponentState<OptionSlots> &
  Pick<OptionProps, 'disabled'> & {
    /**
     * @deprecated - no longer used internally
     */
    active: boolean;

    /**
     * @deprecated - no longer used internally
     */
    focusVisible: boolean;

    /** If true, the option is part of a multiselect combobox or listbox */
    multiselect?: boolean;

    /** If true, the option is selected */
    selected: boolean;
  };
