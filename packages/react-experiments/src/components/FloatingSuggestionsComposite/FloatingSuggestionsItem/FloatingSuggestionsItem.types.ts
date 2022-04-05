import * as React from 'react';
import type { ITheme, IStyle } from '@fluentui/style-utilities';

export interface IFloatingSuggestionItemProps<T> {
  item: T;
  isSelected: boolean;
  onClick?: (ev: React.MouseEvent<HTMLElement>, item: IFloatingSuggestionItemProps<T>) => void;
  onRemoveItem?: (ev: React.MouseEvent<HTMLElement>, item: IFloatingSuggestionItemProps<T>) => void;
  displayText?: string;
  className?: string;
  /**
   * Takes precedence over showSuggestionRemoveButton
   */
  showRemoveButton?: boolean;
  ariaLabel?: string;
  removeButtonAriaLabel?: string;
  key?: string;
  id?: string;
  theme?: ITheme;
  onRenderSuggestion?: (renderProps: IFloatingSuggestionOnRenderItemProps<T>) => JSX.Element;
}

export type IFloatingSuggestionItem<T> = Omit<
  IFloatingSuggestionItemProps<T>,
  'onRenderSuggestion' | 'onClick' | 'onRemoveItem' | 'theme'
>;

export type IFloatingSuggestionOnClickItemProps<T> = Pick<
  IFloatingSuggestionItemProps<T>,
  'item' | 'isSelected' | 'key' | 'id'
>;

export type IFloatingSuggestionOnRenderItemProps<T> = Omit<IFloatingSuggestionItemProps<T>, 'onRenderSuggestion'>;

export interface IFloatingSuggestionItemStylesProps {
  isSelected?: boolean;
}

export interface IFloatingSuggestionItemStyles {
  root: IStyle;
  itemButton: IStyle;
  closeButton: IStyle;
  displayText: IStyle;
}
