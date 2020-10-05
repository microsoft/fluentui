import * as React from 'react';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { IStyle } from '@uifabric/styling';
import {
  IFloatingSuggestionItemProps,
  IFloatingSuggestionOnRenderItemProps,
  IFloatingSuggestionItem,
} from './FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import { IRenderFunction, IRefObject } from '@uifabric/utilities';
import { IBaseFloatingPickerSuggestionProps } from 'office-ui-fabric-react/lib/FloatingPicker';

/**
 * FloatingSuggestions component props
 * Type T is option data parameter to render custom suggestions
 */
export interface IBaseFloatingSuggestionsProps<T> {
  /**
   * Component reference in case needed to focus FloatingSuggestions
   */
  componentRef?: IRefObject<HTMLDivElement>;
  /**
   * List of suggestions to be displayed with Type T
   */
  suggestions: IFloatingSuggestionItem<T>[];
  /**
   * This param decides whether to display suggestions or not
   * Must be set by parent component
   */
  isSuggestionsVisible: boolean;
  /**
   * Custom component to render suggestion
   */
  onRenderSuggestion?: (renderProps: IFloatingSuggestionOnRenderItemProps<T>) => JSX.Element;
  /**
   * Callback function on remove of suggestion from list
   */
  onRemoveSuggestion?: (ev: React.MouseEvent<HTMLElement>, item: IFloatingSuggestionItemProps<T>) => void;
  /**
   * Callback function on selection of suggestion from list
   */
  onSuggestionSelected?: (ev: React.MouseEvent<HTMLElement>, item: IFloatingSuggestionItemProps<T>) => void;
  /**
   * Custom header renderer which takes suggestions and headertext if passed
   * Going forward, this should accept the user defined type as parameter
   */
  onRenderHeader?: (suggestionItems?: IFloatingSuggestionItemProps<T>[], suggestionsHeaderText?: string) => JSX.Element;
  /**
   * Custom footer renderer which takes suggestions as param
   * Going forward, this should accept the user defined type as param
   */
  onRenderFooter?: (suggestionItems?: IFloatingSuggestionItemProps<T>[]) => JSX.Element;
  /**
   * Callback when the callout dismiss is called
   * When this callback is called parent comoponent must handle suggestion visibility
   */
  onFloatingSuggestionsDismiss?: (ev?: React.MouseEvent) => void;
  /**
   * Option to show suggestion remove button
   * By default this is false
   */
  showSuggestionRemoveButton?: boolean;
  /**
   * class name for the FloatingSuggestions div
   */
  className?: string;
  /**
   * Target element here callout should be mounted
   * Pass the element current value to position the callout
   */
  targetElement: HTMLInputElement | undefined | null;
  /**
   * Callout width
   */
  calloutWidth?: number;
  /**
   * Callout props
   */
  calloutProps?: ICalloutProps;
  /**
   * Class name for suggestion list container
   */
  suggestionListClassName?: string;
  /**
   * Clas name for Suggestion item
   */
  suggestionsItemClassName?: string;
  /**
   * Header text to display
   */
  suggestionsHeaderText?: string;
  /**
   * Custom renderer when there are no results found
   */
  onRenderNoResultFound?: IRenderFunction<void>;
  /**
   * Text to display when there are no results found
   */
  noResultsFoundText?: string;
  /**
   * Maximum suggestions to how
   * Might not be used as showing suggestion must be by sending the suggestions
   */
  maximumSuggestionsToShow?: number;
  /**
   * Aria label for suggestions container
   */
  suggestionsContainerAriaLabel?: string;
  /**
   * Aria label for suggestions list container
   */
  suggestionListAriaLabel?: string;
  /**
   * Aria label for suggestion remove button
   */
  removeItemButtonAriaLabel?: string;
  /**
   * Index to indicate the selected suggestion
   * This logic must be driven by parent component by setting isSelected in data model
   * There should be no logic to handle this in Suggestion component as the focus is never on this component
   */
  selectedSuggestionIndex?: number;
  /**
   * If set, the picker will be this width. If not, picker will be as wide as necessary
   * to fully display input values.
   */
  pickerWidth?: string;
  /**
   * Arrow key callback
   */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLElement>) => void;

  pickerSuggestionsProps?: IBaseFloatingPickerSuggestionProps;

  selectedFooterIndex?: number;
  selectedHeaderIndex?: number;

  suggestionsHeaderContainerAriaLabel?: string;
  suggestionsFooterContainerAriaLabel?: string;
}

/**
 * FLoatingSuggestions style props
 */
export interface IBaseFloatingSuggestionsStylesProps {}

/**
 * FLoatingSuggestions styles
 */
export interface IBaseFloatingSuggestionsStyles {
  root: IStyle;
  callout: IStyle;
}
