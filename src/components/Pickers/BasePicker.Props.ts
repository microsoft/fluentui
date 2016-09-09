import * as React from 'react';
import { IPickerItemProps } from './PickerItem.Props';

export interface IBasePickerProps<T> extends React.Props<any> {
  /**
   *
   */
  onRenderItem?: (item: IPickerItemProps<T>) => JSX.Element;
  /**
   *
   */
  onRenderSuggestion?: (props: T) => JSX.Element;
  /**
   *
   */
  onResolveSuggestions: (filter: string) => T[];
  /**
   *
   */
  startingItems?: T[];
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
  onGetMoreResults?: (filter: string) => T[];
  /**
   *
   */
  className?: string;
  /**
   *
   */
  suggestionsClassName?: string;
}