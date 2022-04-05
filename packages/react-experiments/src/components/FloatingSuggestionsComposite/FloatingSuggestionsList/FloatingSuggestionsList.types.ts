import * as React from 'react';
import type {
  IFloatingSuggestionOnRenderItemProps,
  IFloatingSuggestionItemProps,
  IFloatingSuggestionItem,
} from '../FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import type { IRenderFunction } from '@fluentui/utilities';
import type { IStyle } from '@fluentui/style-utilities';
import type { IFloatingSuggestionsHeaderFooterProps } from '../FloatingSuggestionsHeaderFooterItem/FloatingSuggestionsHeaderFooterItem.types';

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
  headerItemsProps?: IFloatingSuggestionsHeaderFooterProps[];
  selectedHeaderIndex?: number;
  suggestionsHeaderContainerAriaLabel?: string;
  footerItemsProps?: IFloatingSuggestionsHeaderFooterProps[];
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
