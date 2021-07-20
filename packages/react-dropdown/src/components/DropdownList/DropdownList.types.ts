import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export interface DropdownListCommons<O = string | Object> extends React.HTMLAttributes<HTMLElement> {
  /**
   * Map of all checked values
   */
  selectedValues?: Record<string, string[]>;

  /**
   * Default selected option(s) on mount
   */
  defaultSelection?: Record<string, string[]>;

  /**
   * Callback when checked items change for value with a name
   *
   * @param name - the name of the value
   * @param checkedItems - the items for this value that are checked
   */
  onSelectionChange?: (e: React.MouseEvent | React.KeyboardEvent, selectedItems: string[]) => void;

  /**
   * Array of options. If not using a string array, renderOption is required.
   */
  options: O[];

  /**
   * Custom render function for options. Defaults to the identity function.
   * @default (option) => option;
   */
  renderOption?: (option: O) => string | JSX.Element;

  /**
   * Optional function that returns the string value of an option. Used for the input value and filtering.
   * Required if the option array is not a string array.
   * @default (option) => option;
   */
  getOptionValue?: (option: O) => string;
}

export interface DropdownListProps extends ComponentProps<Partial<DropdownListSlots>>, Partial<DropdownListCommons> {}

export interface DropdownListState extends DropdownListCommons, ComponentState<DropdownListSlots> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;

  resolveOptionProps: (option: string | Object, index: number) => React.HTMLAttributes<HTMLElement>;
}

export type DropdownListSlots = {
  /**
   * slot for a single option within the DropdownList
   */
  option: React.HTMLAttributes<HTMLElement>;
};
