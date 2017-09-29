import * as React from 'react';
import { IPickerItemProps } from './PickerItem.Props';
import { IPersonaProps } from '../Persona/Persona.Props';
import { IRenderFunction } from '../../Utilities';
import { ISuggestionModel } from './Suggestions/SuggestionsController';
import { BaseAutoFill } from './AutoFill/BaseAutoFill';
import {
  IInputProps,
  ValidationState,
  IBasePickerSuggestionsProps
} from './BasePicker.Props';

export interface IBaseFloatingPicker<T> {
  /* on queryString changed*/
  onQueryStringChanged: (input: string) => void;
}

// Type T is the type of the item that is displayed
// and searched for by the people picker. For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
export interface IBaseFloatingPickerProps<T> extends React.Props<any> {
  componentRef?: (component?: IBaseFloatingPicker<T>) => void;

  /**
   * The input element to listen on events
   */
  inputElement: HTMLDivElement;

  /**
   * Function that specifies how an individual suggestion item will appear.
   */
  onRenderSuggestionsItem?: (props: T, itemProps: any) => JSX.Element;
  /**
   * A callback for what should happen when a person types text into the input.
   * Returns the already selected items so the resolver can filter them out.
   */
  onResolveSuggestions: (
    filter: string,
    selectedItems?: T[]
  ) => T[] | PromiseLike<T[]>;

  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;

  // /**
  //  * A callback to get text from an item. Used to autofill text in the pickers.
  //  */
  // getTextFromItem?: (item: T, currentValue?: string) => string;
  /**
   * A callback that gets the rest of the results when a user clicks get more results.
   */
  onGetMoreResults?: (
    filter: string,
    selectedItems?: T[]
  ) => T[] | PromiseLike<T[]>;
  /**
   * ClassName for the picker.
   */
  className?: string;
  /**
   * The properties that will get passed to the Suggestions component.
   */
  pickerSuggestionsProps?: IBasePickerSuggestionsProps;
  /**
   * A callback for when a persona is removed from the suggestion list
   */
  onRemoveSuggestion?: (item: IPersonaProps) => void;
  /**
   * A function used to validate if raw text entered into the well can be added
   */
  onValidateInput?: (input: string) => ValidationState;
  /**
   * The text to display while searching for more results in a limited suggestions list
   */
  searchingText?: ((props: { input: string }) => string) | string;

  /**
   * Function that specifies how arbitrary text entered into the well is handled.
   */
  createGenericItem?: (
    input: string,
    ValidationState: ValidationState
  ) => ISuggestionModel<T>;
  /**
   * Aria label for the 'X' button in the selected item component.
   * @default ''
   */
  removeButtonAriaLabel?: string;
  // /**
  //  * A callback to process a selection after the user selects something from the picker.
  //  */
  // onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
  /**
   * The items that the base picker should currently display as selected. If this is provided then the picker will act as a controlled component.
   */
  selectedItems?: T[];

  /**
   * A callback to get text from an item. Used to autofill text in the pickers.
   */
  getTextFromItem?: (item: T, currentValue?: string) => string;
}
