import * as React from 'react';
import { ISuggestionModel } from './SuggestionController';

export interface ISuggestionProps extends React.Props<any> {
  onRenderSuggestion: (props: any) => JSX.Element;
  onSuggestionClick: (ev: React.MouseEvent, item: any, index: number) => void;
  suggestions: ISuggestionModel[];
  suggestionsHeaderText?: string;
  searchForMoreText?: string;
  onGetMoreResults?: () => void;
  className?: string;
  searchErrorText?: string;
  noResultsFound?: string;
}

export interface ISuggestionItemProps {
  suggestionModel: ISuggestionModel;
  RenderSuggestion: (item: any) => JSX.Element;
  onClick: (ev: React.MouseEvent) => void;
}