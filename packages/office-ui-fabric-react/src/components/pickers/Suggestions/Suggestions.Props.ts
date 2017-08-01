import * as React from 'react';
import { ISuggestionModel } from './SuggestionsController';
import { IRenderFunction } from '../../../Utilities';
import { IPersonaProps } from '../../Persona/Persona.Props';

export interface ISuggestionsProps<T> extends React.Props<any> {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * How the suggestion should look in the suggestion list.
   */
  onRenderSuggestion?: (props: T, suggestionItemProps: T) => JSX.Element;
  /**
   * What should occur when a suggestion is clicked
   */
  onSuggestionClick: (ev?: React.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
  /**
   * The list of Suggestions that will be displayed
   */
  suggestions: ISuggestionModel<T>[];
  /**
  * How the "no result found" should look in the suggestion list.
  */
  onRenderNoResultFound?: IRenderFunction<void>;
  /**
   * The text that appears at the top of the suggestions list.
   */
  suggestionsHeaderText?: string;
  /**
   * The text that should appear at the top of the most recenty used box.
   */
  mostRecentlyUsedHeaderText?: string;
  /**
   * The text that appears indicating to the user that they can search for more results.
   */
  searchForMoreText?: string;
  /**
   * The callback that should be called when the user attempts to get more results
   */
  onGetMoreResults?: () => void;
  /**
   * The CSS classname of the suggestions list.
   */
  className?: string;
  /**
   * The text that should appear if there is a search error.
   */
  searchErrorText?: string;
  /**
   * The text that should appear if no results are found when searching.
   */
  noResultsFoundText?: string;
  /**
   * the classname of the suggestionitem.
   */
  suggestionsItemClassName?: string;
  /**
   * Used to indicate whether or not the user can request more suggestions.
   * Dictates whether or not the searchForMore button is displayed.
   */
  moreSuggestionsAvailable?: boolean;
  /**
   * Used to indicate whether or not the suggestions are loading.
   */
  isLoading?: boolean;
  /**
   * Used to indicate whether or not the component is searching for more results.
   */
  isSearching?: boolean;
  /**
   * The text to display while the results are loading.
   */
  loadingText?: string;
  /**
   * The text to display while searching for more results in a limited sugesstions list.
   */
  searchingText?: string;
  /**
   * Indicates if a short list of recent suggestions should be shown.
   */
  isMostRecentlyUsedVisible?: boolean;
  /**
   * Function to fire when one of the optional remove buttons on a suggestion is clicked.
   */
  onSuggestionRemove?: (ev?: React.MouseEvent<HTMLElement>, item?: IPersonaProps, index?: number) => void;
  /**
   * Indicates if the text in resultsFooter or resultsFooterFull should be shown at the end of the suggestion list.
   */
  isResultsFooterVisible?: boolean;
  /**
   * Maximum number of suggestions to show in the full suggestion list.
   */
  resultsMaximumNumber?: number;
  /**
   * A renderer that adds an element at the end of the suggestions list it has more items than resultsMaximumNumber.
   */
  resultsFooterFull?: (props: ISuggestionsProps<T>) => JSX.Element;
  /**
   * A renderer that adds an element at the end of the suggestions list it has fewer items than resultsMaximumNumber.
   */
  resultsFooter?: (props: ISuggestionsProps<T>) => JSX.Element;
  /**
   * Indicates whether to show a button with each suggestion to remove that suggestion.
   */
  showRemoveButtons?: boolean;
  /**
   * Screen reader message to read when there are suggestions available.
   */
  suggestionsAvailableAlertText?: string;
}

export interface ISuggestionItemProps<T> {
  componentRef?: () => void;
  suggestionModel: ISuggestionModel<T>;
  RenderSuggestion: (item: T, suggestionItemProps?: ISuggestionItemProps<T>) => JSX.Element;
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveItem: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  id?: string;
  showRemoveButton?: boolean;
}