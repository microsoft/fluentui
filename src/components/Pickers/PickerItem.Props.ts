import * as React from 'react';
export interface IPickerItemProps<T> extends React.Props<any> {
  item: T;
  index: number;
  isSelected: boolean;
  onRemoveItem?: () => void;
}