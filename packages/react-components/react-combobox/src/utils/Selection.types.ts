import * as React from 'react';
import { OptionValue } from './OptionCollection.types';

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
  onOptionSelect?: (event: SelectionEvents, data: OptionOnSelectData) => void;

  /**
   * An array of selected option keys.
   * Use this with `onOptionSelect` to directly control the selected option(s)
   */
  selectedOptions?: string[];
};

export type SelectionState = Required<Pick<SelectionProps, 'selectedOptions'>> & Pick<SelectionProps, 'multiselect'>;

/* Values returned by the useSelection hook */
export type SelectionValue = {
  clearSelection: (event: SelectionEvents) => void;
  selectedOptions: string[];
  selectOption: (event: SelectionEvents, option: OptionValue) => void;
};

/*
 * Data for the onOptionSelect callback.
 * `optionValue` will be undefined if the multiple options are modified at once.
 */
export type OptionOnSelectData = { optionValue: string | undefined; selectedOptions: string[] };

/* Possible event types for onOptionSelect */
export type SelectionEvents =
  | React.ChangeEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;
