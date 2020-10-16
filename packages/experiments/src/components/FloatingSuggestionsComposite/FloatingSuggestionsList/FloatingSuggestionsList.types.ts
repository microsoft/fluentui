import * as React from 'react';
import {
  IFloatingSuggestionOnRenderItemProps,
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
} from '../FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import { IRenderFunction } from '@uifabric/utilities';
import { IStyle } from '@uifabric/styling';
import { ISuggestionsHeaderFooterProps } from 'office-ui-fabric-react/lib/FloatingPicker';

export interface IFloatingSuggestionsListProps<T> {
  suggestionItems: IFloatingSuggestionItem<T>[];
  className?: string;
  suggestionsItemClassName?: string;
  suggestionsHeaderText?: string;
  onRenderItem?: (renderProps: IFloatingSuggestionOnRenderItemProps<T>) => JSX.Element;
  onItemClick?: (ev: React.MouseEvent<HTMLElement>, item: IFloatingSuggestionItemProps<T>) => void;
  onSuggestionRemove?: (ev: React.MouseEvent<HTMLElement>, item: IFloatingSuggestionItemProps<T>) => void;
  onRenderNoResultFound?: IRenderFunction<void>;
  noResultsFoundText?: string;
  maximumSuggestionsToShow?: number;
  showSuggestionRemoveButton?: boolean;
  ariaLabel?: string;
  removeItemAriaLabel?: string;
  id?: string | number;
  onRenderHeader?: (suggestionItems?: IFloatingSuggestionItemProps<T>[], suggestionsHeaderText?: string) => JSX.Element;
  onRenderFooter?: (suggestionItems?: IFloatingSuggestionItemProps<T>[]) => JSX.Element;
  suggestionsContainerAriaLabel?: string;
  selectedSuggestionIndex?: number;
  pickerWidth?: string;
  headerItemsProps?: ISuggestionsHeaderFooterProps[];
  selectedHeaderIndex?: number;
  suggestionsHeaderContainerAriaLabel?: string;
  footerItemsProps?: ISuggestionsHeaderFooterProps[];
  selectedFooterIndex?: number;
  suggestionsFooterContainerAriaLabel?: string;
}

export interface IFloatingSuggestionsListStyleProps {}

export interface IFloatingSuggestionsListStyle {
  root: IStyle;
  suggestionsContainer: IStyle;
  title: IStyle;
  noSuggestions: IStyle;
}
