import * as React from 'react';
import { ISuggestionModel } from '../../../Pickers';
import { IPersonaProps } from '../../../Persona';
import { IRefObject } from '../../../Utilities';
import { ISuggestionItemProps } from '../../pickers/Suggestions/SuggestionsItem.types';

// tslint:disable-next-line:no-any
export interface ISuggestionsCoreProps<T> extends React.ClassAttributes<any> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;
  /**
   * How the suggestion should look in the suggestion list.
   */
  onRenderSuggestion?: (props: T, suggestionItemProps: ISuggestionItemProps<T>) => JSX.Element;

  /**
   * What should occur when a suggestion is clicked
   */
  // tslint:disable-next-line:no-any
  onSuggestionClick: (ev?: React.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
  /**
   * The list of Suggestions that will be displayed
   */
  suggestions: ISuggestionModel<T>[];
  /**
   * Function to fire when one of the optional remove buttons on a suggestion is clicked.
   */
  onSuggestionRemove?: (ev?: React.MouseEvent<HTMLElement>, item?: IPersonaProps, index?: number) => void;
  /**
   * Screen reader message to read when there are suggestions available.
   */
  suggestionsAvailableAlertText?: string;
  /**
   * An ARIA label for the container that is the parent of the suggestions.
   */
  suggestionsContainerAriaLabel?: string;
  /**
   * the classname of the suggestionitem.
   */
  suggestionsItemClassName?: string;
  /**
   * Maximum number of suggestions to show in the full suggestion list.
   */
  resultsMaximumNumber?: number;
  /**
   * Indicates whether to show a button with each suggestion to remove that suggestion.
   */
  showRemoveButtons?: boolean;
  /**
   * Indicates whether to loop around to the top or bottom of the suggestions
   * on calling nextSuggestion and previousSuggestion, respectively
   */
  shouldLoopSelection: boolean;
}

// tslint:disable-next-line:no-any
export interface ISuggestionsControlProps<T> extends React.ClassAttributes<any>, ISuggestionsCoreProps<T> {
  /**
   * An ARIA label for the container that is the parent of the suggestions header items.
   */
  suggestionsHeaderContainerAriaLabel?: string;
  /**
   * An ARIA label for the container that is the parent of the suggestions footer items.
   */
  suggestionsFooterContainerAriaLabel?: string;
  /**
   * The header items props
   */
  headerItemsProps?: ISuggestionsHeaderFooterProps[];
  /**
   * The footer items props
   */
  footerItemsProps?: ISuggestionsHeaderFooterProps[];
  /**
   * Whether or not the first selectable item in the suggestions list should be selected
   */
  shouldSelectFirstItem?: () => boolean;
  /**
   * The CSS classname of the suggestions list.
   */
  className?: string;
  /**
   * Completes the suggestion
   */
  completeSuggestion: () => void;
}

export interface ISuggestionsHeaderFooterProps {
  renderItem: () => JSX.Element;
  onExecute?: () => void;
  className?: string;
  ariaLabel?: string;
  shouldShow: () => boolean;
}

export interface ISuggestionsHeaderFooterItemProps {
  componentRef?: IRefObject<{}>;
  renderItem: () => JSX.Element;
  onExecute?: () => void;
  isSelected: boolean;
  id: string;
  className: string | undefined;
}
