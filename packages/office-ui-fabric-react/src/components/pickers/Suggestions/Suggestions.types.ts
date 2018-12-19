import * as React from 'react';

import { IRefObject, IRenderFunction, KeyCodes, IStyleFunctionOrObject } from '../../../Utilities';
import { IStyle, ITheme } from '../../../Styling';
import { IPersonaProps } from '../../Persona/Persona.types';

/** Suggestions component. */
export interface ISuggestions {}

/**
 * Suggestions props interface. Refers to the entire container holding all the suggestions.
 * Type T is the type of the items that are displayed.
 */
export interface ISuggestionsProps<T> extends React.Props<any> {
  /**
   * Optional callback to access the ISuggestions interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISuggestions>;

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
   * The text that should appear at the top of the most recently used box.
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
   * The text that appears indicating to the use to force resolve the input
   */
  forceResolveText?: string;

  /**
   * The callback that should be called to see if the force resolve command should be shown
   */
  showForceResolve?: () => boolean;

  /**
   * The callback that should be called when the user attempts to use the input text as as item
   */
  createGenericItem?: () => void;

  /**
   * The CSS className of the suggestions root.
   */
  className?: string;

  /**
   * The CSS className of the suggestions list
   */
  suggestionsClassName?: string;

  /**
   * The text that should appear if there is a search error.
   */
  searchErrorText?: string;

  /**
   * The text that should appear if no results are found when searching.
   */
  noResultsFoundText?: string;

  /**
   * The className of the suggestion item.
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
   * The text to display while searching for more results in a limited suggestions list.
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
   * @defaultvalue true
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

  /**
   * A function that resets focus to the expected item in the suggestion list
   */
  refocusSuggestions?: (keyCode: KeyCodes) => void;

  /**
   * An ARIA label for the container that is the parent of the suggestions.
   */
  suggestionsContainerAriaLabel?: string;

  /**
   * An ARIA label to use for the buttons to remove individual suggestions.
   */
  removeSuggestionAriaLabel?: string;

  /**
   * The string that will be used as the suggestionsListId.
   * Will be used by the BasePicker to keep track of the list for aria.
   */
  suggestionsListId?: string;
}

/**
 * SuggestionModel interface.
 * Type T is the type of the item that is suggested (Persona, Tag or any other custom picker).
 */
export interface ISuggestionModel<T> {
  /** The suggested item of the type T */
  item: T;

  /** Whether the suggested item is selected or not. */
  selected: boolean;

  /** Aria-label string for each suggested item. */
  ariaLabel?: string;
}

/** SuggestionItem component. */
export interface ISuggestionItem {}

/**
 * Suggestion item props. Refers to the each individual suggested items rendered within Suggestions callout.
 * Type T is the type of the item that is displayed.
 */
export interface ISuggestionItemProps<T> {
  /**
   * Optional callback to access the ISuggestionItem interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISuggestionItem>;

  /** Individual suggestion object containing its properties. */
  suggestionModel: ISuggestionModel<T>;

  /** Optional renderer to override the default one for each type of picker. */
  RenderSuggestion: (item: T, suggestionItemProps?: ISuggestionItemProps<T>) => JSX.Element;

  /** Callback for when the user clicks on the suggestion. */
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /** Callback for when the item is removed from the array of suggested items. */
  onRemoveItem: (ev: React.MouseEvent<HTMLButtonElement>) => void;

  /** Optional className for the root element of the suggestion item. */
  className?: string;

  /** Unique id of the suggested item. */
  id?: string;

  /** Whether the remove button should be rendered or not. */
  showRemoveButton?: boolean;

  /** An override for the 'selected' property of the SuggestionModel. */
  isSelectedOverride?: boolean;

  /**
   * The ARIA label for the button to remove the suggestion from the list.
   */
  removeButtonAriaLabel?: string;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<ISuggestionItemStyleProps, ISuggestionItemStyles>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
}

/** The props needed to construct SuggestionItem styles. */
export type ISuggestionItemStyleProps = Required<Pick<ISuggestionItemProps<any>, 'theme'>> &
  Pick<ISuggestionItemProps<any>, 'className'> & {
    /** Whether the suggestion item is selected or not. */
    suggested?: boolean;
  };

/** Represents the stylable areas of the SuggestionItem. */
export interface ISuggestionItemStyles {
  /** Root element of the suggested item. */
  root: IStyle;

  /** Refers to the CommandButton holding the content of the suggested item. */
  itemButton: IStyle;

  /** Refers to the remove button in case it's rendered. */
  closeButton: IStyle;
}

export enum SuggestionActionType {
  none,
  forceResolve,
  searchMore
}
