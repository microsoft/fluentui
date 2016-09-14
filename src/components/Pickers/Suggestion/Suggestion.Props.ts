import * as React from 'react';
import { ISuggestionModel } from './SuggestionController';

export interface ISuggestionProps<T> extends React.Props<any> {
  onRenderSuggestion: (props: any) => JSX.Element;
  onSuggestionClick: (ev: React.MouseEvent, item: any, index: number) => void;
  suggestions: ISuggestionModel<T>[];
  suggestionsHeaderText?: string;
  searchForMoreText?: string;
  onGetMoreResults?: () => void;
  className?: string;
  searchErrorText?: string;
  noResultsFound?: string;
}

export interface ISuggestionItemProps<T> {
  suggestionModel: ISuggestionModel<T>;
  RenderSuggestion: (item: any) => JSX.Element;
  onClick: (ev: React.MouseEvent) => void;
}