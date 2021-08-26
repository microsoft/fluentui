import * as React from 'react';
import type { ISuggestionModel } from '@fluentui/react/lib/Pickers';
import type { ISuggestionItemProps } from './SuggestionsItem.types';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { IRefObject } from '@fluentui/react/lib/Utilities';

export interface ISuggestionsCoreProps<T> extends React.ClassAttributes<any> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;
  /**
   * How the suggestion should look in the suggestion list.
   */
  onRenderSuggestion: ISuggestionItemProps<T>['onRenderSuggestion'];
  /**
   * What should occur when a suggestion is clicked
   */
  onSuggestionClick: (ev: React.MouseEvent<HTMLElement>, item: T, index: number) => void;
  /**
   * The list of Suggestions that will be displayed
   */
  suggestions: ISuggestionModel<T>[];
  /**
   * Function to fire when one of the optional remove buttons on a suggestion is clicked.
   */
  onSuggestionRemove?: (ev: React.MouseEvent<HTMLElement>, item: IPersonaProps, index: number) => void;
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
   * Called when the current highlighted suggestion has been completed
   * by the control.
   *
   * Not called for header/footer items. Instead the item's onExecute is called.
   */
  onCurrentlySelectedSuggestionChosen: () => void;
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
