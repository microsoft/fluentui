import * as React from 'react';

import { IRefObject, IRenderFunction, KeyCodes, IStyleFunctionOrObject } from '../../../Utilities';
import { IPersonaProps } from '../../Persona/Persona.types';
import { IStyle, ITheme } from '../../../Styling';
import { ISpinnerStyleProps } from '../../Spinner/Spinner.types';
import { ISuggestionItemProps } from './SuggestionsItem.types';

/**
 * Suggestions component.
 * {@docCategory Pickers}
 */
export interface ISuggestions<T> {
  /** Execute the action selected. Can be SearchMore or ForceResolve actions. */
  executeSelectedAction: () => void;

  /** Focus on the ForceResolve action above the suggestions. If not available then focus on SearchMore action. */
  focusAboveSuggestions: () => void;

  /** Focus on the SearchMore action below the suggestions. If not available then focus on ForceResolve action. */
  focusBelowSuggestions: () => void;

  /** Focus the SearchMore action button. */
  focusSearchForMoreButton: () => void;

  /** Whether it has any suggested actions like ForceResolve or SearchMore. */
  hasSuggestedAction: () => boolean;

  /** Whether any of the suggested actions (ForceResolve or SearchMore) is selected. */
  hasSuggestedActionSelected: () => boolean;

  /** Returns true if the event was handled, false otherwise. */
  tryHandleKeyDown: (keyCode: number, currentSuggestionIndex: number) => boolean;
}

/**
 * Suggestions props interface. Refers to the entire container holding all the suggestions.
 * Type T is the type of the items that are displayed.
 * {@docCategory Pickers}
 */
// tslint:disable-next-line:deprecation
export interface ISuggestionsProps<T> extends React.Props<any> {
  /**
   * Optional callback to access the ISuggestions interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISuggestions<T>>;

  /**
   * How the suggestion should look in the suggestion list.
   */
  onRenderSuggestion: (props: T, suggestionItemProps: ISuggestionItemProps<T>) => JSX.Element;

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
   *
   * @deprecated Use noResultsFoundText instead.
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
   *
   * TODO (adjective-object) remove IPersonaprops before the next major version bump
   */
  onSuggestionRemove?: (ev?: React.MouseEvent<HTMLElement>, item?: T | IPersonaProps, index?: number) => void;

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

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<any, any>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
}

/**
 * The props needed to construct Suggestions styles.
 * {@docCategory Pickers}
 */
export type ISuggestionsStyleProps = Required<Pick<ISuggestionsProps<any>, 'theme'>> &
  Pick<ISuggestionsProps<any>, 'className' | 'suggestionsClassName'> & {
    /** Whether the forceResolve actionButton is selected. */
    forceResolveButtonSelected?: boolean;

    /** Whether the searchForMore actionButton is selected. */
    searchForMoreButtonSelected?: boolean;
  };

/**
 * Represents the stylable areas of the Suggestions.
 * {@docCategory Pickers}
 */
export interface ISuggestionsStyles {
  /** Root element of the suggestions outer wrapper. */
  root: IStyle;

  /** Refers to the suggestions container. */
  suggestionsContainer: IStyle;

  /** Refers to the title rendered for suggestions container header and/or footer (if provided). */
  title: IStyle;

  /** Refers to the 'Force resolve' actionButton. */
  forceResolveButton: IStyle;

  /** Refers to the 'Search for more' actionButton. */
  searchForMoreButton: IStyle;

  /** Refers to the text rendered when no suggestions are found. */
  noSuggestions: IStyle;

  /** Refers to the text displaying if more suggestions available. */
  suggestionsAvailable: IStyle;

  /** SubComponents (Spinner) styles. */
  subComponentStyles: ISuggestionsSubComponentStyles;
}

/**
 * Styles interface of the SubComponents rendered within PeoplePickerItemSelected.
 * {@docCategory Pickers}
 */
export interface ISuggestionsSubComponentStyles {
  /** Refers to the Spinner rendered within the Suggestions when searching or loading suggestions. */
  spinner: IStyleFunctionOrObject<ISpinnerStyleProps, any>;
}

/**
 * SuggestionModel interface.
 * Type T is the type of the item that is suggested (Persona, Tag or any other custom picker).
 * {@docCategory Pickers}
 */
export interface ISuggestionModel<T> {
  /** The suggested item of the type T */
  item: T;

  /** Whether the suggested item is selected or not. */
  selected: boolean;

  /** Aria-label string for each suggested item. */
  ariaLabel?: string;
}

/**
 * Enum to help identify which suggestions action button is selected.
 * {@docCategory Pickers}
 */
export enum SuggestionActionType {
  /** None of the actions is selected. */
  none,

  /** ForceResolve action is selected. */
  forceResolve,

  /** SearchMore action is selected. */
  searchMore,
}
