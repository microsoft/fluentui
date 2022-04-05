import * as React from 'react';
import { SuggestionsStore } from './Suggestions/SuggestionsStore';
import type { ISuggestionModel } from '@fluentui/react/lib/Pickers';
import type { ISuggestionsControlProps, ISuggestionsCoreProps } from './Suggestions/Suggestions.types';
import type { IBaseProps } from '@fluentui/react/lib/Utilities';

export interface IFloatingSuggestions<TItem> {
  /** Whether the suggestions are shown */
  isSuggestionsShown: boolean;

  /** On queryString changed */
  onQueryStringChanged: (input: string) => void;

  /** Hides the picker */
  hidePicker: () => void;

  /** Shows the picker
   * @param updateValue - Optional param to indicate whether to update the query string
   */
  showPicker: (updateValue?: boolean) => void;

  /** Gets the suggestions */
  suggestions: ISuggestionModel<TItem>[];

  /** Gets the input text */
  inputText: string;

  /** Gets the current selected index in the suggestions box*/
  currentSelectedSuggestionIndex: number;

  /** Forces the current selection to resolve, if it is valid */
  forceResolveSuggestion: () => void;
}

// Type T is the type of the item that is displayed
// and searched for by the people picker. For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
export interface IFloatingSuggestionsProps<T> extends IBaseProps<IFloatingSuggestions<T>> {
  /**
   * The suggestions store
   */
  suggestionsStore: SuggestionsStore<T>;

  /**
   * The suggestions to show on zero query, return null if using as a controlled component
   */
  onZeroQuerySuggestion?: (selectedItems?: T[]) => T[] | PromiseLike<T[]> | null;

  /**
   * The input element to listen on events
   */
  inputElement?: HTMLInputElement | null;

  /**
   * Function that specifies how an individual suggestion item will appear.
   */
  onRenderSuggestionsItem: ISuggestionsCoreProps<T>['onRenderSuggestion'];
  /**
   * A callback for what should happen when a person types text into the input.
   * Returns the already selected items so the resolver can filter them out.
   * If used in conjunction with resolveDelay this will only kick off after the delay throttle.
   * Return null if using as a controlled component
   */
  onResolveSuggestions: (filter: string) => T[] | PromiseLike<T[]> | null;

  /**
   * A callback for when the input has been changed
   */
  onInputChanged?: (filter: string) => void;

  /**
   * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
   * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
   * Only until after the timer completes will onResolveSuggestions be called.
   */
  resolveDelay?: number;

  /**
   * A callback for when a suggestion is clicked
   */
  onSuggestionSelected?: (item: T) => void;

  /**
   * ClassName for the picker.
   */
  className?: string;
  /**
   * How to render the Suggestions control used by this floating picker.
   */
  onRenderSuggestionControl?: React.ComponentType<IFloatingSuggestionsInnerSuggestionProps<T>>;

  /**
   * A callback for when a persona is removed from the suggestion list
   */
  onRemoveSuggestion?: (item: T) => void;

  /**
   * Determines if the input string should be resolved to an item in the well.
   *
   * Called only if the suggestion list is empty and we are not focused on a
   * focusable header / footer item.
   *
   * If unset, all insertions of unmatched content will not be inserted.
   */
  isQueryForceResolveable?: (inputQuery: string) => boolean;

  /**
   * Function that specifies how a force resolved suggestion is entered into the well.
   */
  createForceResolvedItem?: (input: string) => ISuggestionModel<T>;

  /**
   * The text to display while searching for more results in a limited suggestions list
   */
  searchingText?: ((props: { input: string }) => string) | string;

  /**
   * Width for the suggestions callout
   */
  calloutWidth?: number;

  /**
   * The callback that should be called when the suggestions are shown
   */
  onSuggestionsShown?: () => void;

  /**
   * The callback that should be called when the suggestions are hiden
   */
  onSuggestionsHidden?: () => void;

  /**
   * If using as a controlled component, the items to show in the suggestion list
   */
  suggestionItems?: T[];
}

/**
 * Props which are passed on to the inner Suggestions component by
 * BaseFloatingPicker.
 */
export type IFloatingSuggestionsInnerSuggestionProps<T> = Pick<
  ISuggestionsControlProps<T>,
  | 'onSuggestionClick'
  | 'onSuggestionRemove'
  | 'suggestions'
  | 'componentRef'
  | 'onCurrentlySelectedSuggestionChosen'
  | 'shouldLoopSelection'
  | 'onRenderSuggestion'
>;
