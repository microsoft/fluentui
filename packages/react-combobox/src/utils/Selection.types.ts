import * as React from 'react';

export type SelectedOption = {
  /** The `key` prop of the option. */
  key: string;

  /** The desired display value of the options */
  value: string;
};

export type SelectionProps = {
  /* For an uncontrolled component, sets the initial selection */
  defaultSelectedOptions?: SelectedOption[];

  /**
   * Sets the selection type to multiselect.
   * Set this to true for multiselect, even if fully controlling selection state.
   * This enables styles and accessibility properties to be set.
   * @default false
   */
  multiselect?: boolean;

  /* Callback when an option is selected */
  onSelect?(event: SelectionEvents, data: OnSelectData): void;

  /**
   * An array of selected option keys.
   * Use this with `onSelect` to directly control the selected option(s)
   */
  selectedOptions?: SelectedOption[];
};

export type SelectionState = Required<Pick<SelectionProps, 'selectedOptions'>>;

/* Values returned by the useSelection hook */
export type SelectionValue = {
  selectedOptions: SelectedOption[];
  selectOption: (event: SelectionEvents, option: SelectedOption) => void;
};

/* Data for the onSelect callback */
export type OnSelectData = { option: SelectedOption; selectedOptions: SelectedOption[] };

/* Possible event types for onSelect */
export type SelectionEvents = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
