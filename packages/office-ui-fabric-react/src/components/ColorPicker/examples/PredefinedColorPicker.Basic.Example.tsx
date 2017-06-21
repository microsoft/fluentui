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
            { id: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
            { id: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500' },
            { id: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
            { id: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000' }
          ]
        } />
    );
  }
}
