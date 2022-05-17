import * as React from 'react';

export type SelectionProps = {
  /* For an uncontrolled component, sets the initial selection */
  defaultSelectedOptions?: string[];

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
  selectedOptions?: string[];
};

export type SelectionState = Required<Pick<SelectionProps, 'selectedOptions'>> & Pick<SelectionProps, 'multiselect'>;

/* Values returned by the useSelection hook */
export type SelectionValue = {
  selectedOptions: string[];
  selectOption: (event: SelectionEvents, optionValue: string) => void;
};

/* Data for the onSelect callback */
export type OnSelectData = { optionValue: string; selectedOptions: string[] };

/* Possible event types for onSelect */
export type SelectionEvents = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
