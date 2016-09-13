import * as React from 'react';
export interface IPickerItemProps extends React.Props<any> {
  item: any;
  index: number;
  isSelected: boolean;
  onRemoveItem?: () => void;
}