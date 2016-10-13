import * as React from 'react';
import { IPickerItemProps } from './PickerItem.Props';

// Type T is the type of the item that is displayed
// and searched for by the people picker. For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
export interface IBasePickerProps<T> extends React.Props<any> {
  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem?: (props: IPickerItemProps<T>) => JSX.Element;
  /**
   * Function that specifies how an individual suggestion item will appear.
   */
  onRenderSuggestionsItem?: (props: T) => JSX.Element;
  /**
   * A callback for what should happen when a person types text into the input.
   * Returns the already selected items so the resolver can filter them out.
   */
  onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  /**
   * Initial items that have already been selected and should appear in the people picker.
   */
  defaultSelectedItems?: T[];
  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;
  /**
   * A callback to get text from an item. Used to autofill text in the pickers.
   */
  getTextFromItem?: (item: T, currentValue?: string) => string;
  /**
   * A callback that gets the rest of the results when a user clicks get more results.
   */
  onGetMoreResults?: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
  /**
   * ClassName for the picker.
   */
  className?: string;
  /**
   * The properties that will get passed to the Suggestions component.
   */
  pickerSuggestionsProps?: IBasePickerSuggestionsProps;
}

export interface IBasePickerSuggestionsProps {
  /**
   * The text that should appear at the top of the suggestion box.
   */
  suggestionsHeaderText?: string;
  /**
   * the text that should appear when no results are returned.
   */
  noResultsFoundText?: string;
  /**
   * ClassName for the picker.
   */
  className?: string;
  /**
   * Classname for the suggestion box.
   */
  suggestionsClassName?: string;
  /**
   * ClassName for suggestion items.
   */
  suggestionsItemClassName?: string;
  /**
   * The text that should appear on the button to search for more.
   */
  searchForMoreText?: string;
}