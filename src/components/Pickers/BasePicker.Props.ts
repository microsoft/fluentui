import * as React from 'react';
import { IPickerItemProps } from './PickerItem.Props';

export interface IBasePickerProps extends React.Props<any> {
  /**
   *
   */
  onRenderItem?: (item: IPickerItemProps) => JSX.Element;
  /**
   *
   */
  onRenderSuggestion?: (props: any) => JSX.Element;
  /**
   *
   */
  onResolveSuggestions: (filter: string) => any[];
  /**
   *
   */
  onSuggestionClick?: (ev: React.MouseEvent, item: any) => void;
  /**
   *
   */
  startingItems?: any[];
  /**
   *
   */
  onChange?: (items: any[]) => void;
  /**
   *
   */
  getTextFromItem?: (T) => string;
  /**
   *
   */
  suggestionsHeaderText?: string;
  /**
   *
   */
  onGetMoreResults?: (filter: string) => any[];
  /**
   *
   */
  className?: string;
  /**
   *
   */
  suggestionsClassName?: string;
  /**
   *
   */
  searchText?: string;
}