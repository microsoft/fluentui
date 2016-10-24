import * as React from 'react';
import { ISuggestionModel } from './SuggestionsController';

export interface ISuggestionsProps<T> extends React.Props<any> {
  /**
   * How the suggestion should look in the suggestion list.
   */
  onRenderSuggestion: (props: any) => JSX.Element;
  /**
   * What should occur when a suggestion is clicked
   */
  onSuggestionClick: (ev?: React.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
  /**
   * The list of Suggestions that will be displayed
   */
  suggestions: ISuggestionModel<T>[];
  /**
   * The text that appears at the top of the suggestions list.
   */
  suggestionsHeaderText?: string;
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
   * The text to display while the results are loading.
   */
  loadingText?: string;
}

export interface ISuggestionItemProps<T> {
  suggestionModel: ISuggestionModel<T>;
  RenderSuggestion: (item: any) => JSX.Element;
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}