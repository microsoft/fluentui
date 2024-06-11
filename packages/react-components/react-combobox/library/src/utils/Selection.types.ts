import * as React from 'react';
import { OptionValue } from './OptionCollection.types';

export type SelectionProps = {
  /**
   * For an uncontrolled component, sets the initial selection.
   * If this is set, the `defaultValue` prop MUST also be set.
   */
  defaultSelectedOptions?: string[];

  /**
   * Sets the selection type to multiselect.
   * Set this to true for multiselect, even if fully controlling selection state.
   * This enables styles and accessibility properties to be set.
   * @default false
   */
  multiselect?: boolean;

  /** Callback when an option is selected */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onOptionSelect?: (event: SelectionEvents, data: OptionOnSelectData) => void;

  /**
   * An array of selected option keys.
   * Use this with `onOptionSelect` to directly control the selected option(s)
   * If this is set, the `value` prop MUST also be controlled.
   */
  selectedOptions?: string[];
};

/** Values returned by the useSelection hook */
export type SelectionState = {
  clearSelection: (event: SelectionEvents) => void;
  selectedOptions: string[];
  selectOption: (event: SelectionEvents, option: OptionValue) => void;
};

/**
 * Data for the onOptionSelect callback.
 * `optionValue` and `optionText` will be undefined if multiple options are modified at once.
 */
export type OptionOnSelectData = {
  optionValue: string | undefined;
  optionText: string | undefined;
  selectedOptions: string[];
};

/** Possible event types for onOptionSelect */
export type SelectionEvents =
  | React.ChangeEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;
