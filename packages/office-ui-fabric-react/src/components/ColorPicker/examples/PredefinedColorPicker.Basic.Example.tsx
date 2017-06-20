import * as React from 'react';
import {
  PredefinedColorPicker, CellShape, ColorPickerItemType
} from 'office-ui-fabric-react/lib/ColorPicker';

export interface IBasicColorPickerExampleState {
  color: string;
}

export class PredefinedColorPickerBasicExample extends React.Component<any, IBasicColorPickerExampleState> {

  public render() {

    return (
      <PredefinedColorPicker
        width={ 4 }
        cellShape={ CellShape.circle }
        colorPickerItems={
          [
            { key: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
            { key: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500' },
            { key: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
            { key: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000' }
          ]
        } />
    );
  }
}
