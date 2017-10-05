import * as React from 'react';
import { ISuggestionModel, ValidationState, IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export interface IBaseFloatingPicker {
  /** Whether the suggestions are shown */
  isSuggestionsShown: boolean;

  /** The selected suggestion alert */
  selectedSuggestionAlert: string | undefined;

  /** On queryString changed */
  onQueryStringChanged: (input: string) => void;

  /** Hides the picker */
  hidePicker: () => void;

  /** Shows the picker */
  showPicker: () => void;
}

// Type T is the type of the item that is displayed
// and searched for by the people picker. For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
// tslint:disable-next-line:no-any
export interface IBaseFloatingPickerProps<T> extends React.Props<any> {
  componentRef?: (component?: IBaseFloatingPicker) => void;

  /**
   * The suggestions to show on zero query
   */
  onZeroQuerySuggestion?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;

  /**
   * The input element to listen on events
   */
  inputElement?: HTMLElement;

  /**
   * Function that specifies how an individual suggestion item will appear.
   */
  // tslint:disable-next-line:no-any
  onRenderSuggestionsItem?: (props: T, itemProps: any) => JSX.Element;
  /**
   * A callback for what should happen when a person types text into the input.
   * Returns the already selected items so the resolver can filter them out.
   */
  onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;

  /**
   * A callback for when a suggestion is clicked
   */
  onChange?: (item: T) => void;

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
   * The items that the base picker should currently display as selected. If this is provided then the picker will act as a controlled
   * component.
   */
  selectedItems?: T[];

  /**
   * A callback to get text from an item. Used to autofill text in the pickers.
   */
  getTextFromItem?: (item: T, currentValue?: string) => string;
}
