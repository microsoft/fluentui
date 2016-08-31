import * as React from 'react';

export interface IBasePickerProps<T> extends React.Props<any> {
  onRenderItem?: (item: IPickerItemProps<T>) => JSX.Element;
  onRenderSuggestion?: (props: T) => JSX.Element;
  onResolveSuggestions: (filter: string) => T[];
  defaultItems?: T[];
  onChange?: (items: any[]) => void;
  getTextFromItem?: (T)=> string;
  suggestionsHeaderText?: string;
  onGetMoreResults?: (filter: string) => T[];
  className?: string;
  suggestionsClassName?: string;
}

export interface IPickerItemProps<T> extends React.Props<any> {
  item: T;
  index: number;
  isSelected: boolean;
  onRemoveItem?: () => void;
}