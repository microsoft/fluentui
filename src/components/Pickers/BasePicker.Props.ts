import * as React from 'react';
import { IPickerItemProps } from './PickerItem.Props';

export interface IBasePickerProps<T> extends React.Props<any> {
  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem?: (item: IPickerItemProps<T>) => JSX.Element;
  /**
   * Function that specifies how the suggestion will appear
   */
  onRenderSuggestion?: (props: T) => JSX.Element;
  /**
   * A callback for what should happen when a person types text into the input.
   */
  onResolveSuggestions: (filter: string) => any[];
  /**
   * Initial items that have already been selected and should appear in the people picker.
   */
  startingItems?: T[];
  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items: T[]) => void;
  /**
   * A callback to get text from an item. Used to autofill text in the pickers.
   */
  getTextFromItem?: (item: T) => string;
  /**
   * The text that should appear at the top of the suggestion box.
   */
  suggestionsHeaderText?: string;
  /**
   * A callback that get's the rest of the results when a user clicks get more results.
   */
  onGetMoreResults?: (filter: string) => any[];
  /**
   * the text that should appear when no results are returned.
   */
  noResultsText?: string;
  /**
   * ClassName for the picker.
   */
  className?: string;
  /**
   * Classname for the suggestion box.
   */
  suggestionsClassName?: string;

  suggestionItemClassName?: string;
  /**
   * The text that should appear on the button to search for more.
   */
  searchForMoreText?: string;
}