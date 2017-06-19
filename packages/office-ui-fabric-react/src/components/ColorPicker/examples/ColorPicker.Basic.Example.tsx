import * as React from 'react';
import {
  ColorPicker
} from 'office-ui-fabric-react/lib/ColorPicker';
import {
  PredefinedColorPicker, CellShape, ColorPickerItemType
} from 'office-ui-fabric-react/lib/ColorPicker';

export interface IBasicColorPickerExampleState {
  color: string;
}

export class ColorPickerBasicExample extends React.Component<any, IBasicColorPickerExampleState> {

  private width: number = 4;
  public render() {

    return (
      <div>
        <ColorPicker color='#FFFFFF' />
        <div>Simple predefiend color picker:</div>
        <PredefinedColorPicker
          width={ 4 }
          cellShape={ CellShape.circle }
          colorPickerItems={
            [
              { key: 'a', label: 'green', type: ColorPickerItemType.Normal, color: '#00ff00' },
              { key: 'b', label: 'orange', type: ColorPickerItemType.Normal, color: '#ffa500' },
              { key: 'c', label: 'blue', type: ColorPickerItemType.Normal, color: '#0000ff' },
              { key: 'd', label: 'red', type: ColorPickerItemType.Normal, color: '#ff0000' }
            ]
          } />
        <div style={ { height: '220px' } }>
          <div>Simple predefiend color picker with multiple sections:</div>
          <div style={ { border: '1px solid black', position: 'absolute', display: 'block' } } >
            <PredefinedColorPicker
              width={ this.width }
              cellShape={ CellShape.circle }
              colorPickerItems={
                [
                  { key: '0', label: 'Colors', type: ColorPickerItemType.Header },
                  { key: 'd1', type: ColorPickerItemType.Divider },
                  { key: 'a', label: 'green', type: ColorPickerItemType.Normal, color: '#00ff00' },
                  { key: 'b', label: 'orange', type: ColorPickerItemType.Normal, color: '#ffa500' },
                  { key: 'c', label: 'blue', type: ColorPickerItemType.Normal, color: '#0000ff' },
                  { key: 'd', label: 'red', type: ColorPickerItemType.Normal, color: '#ff0000' },
                  { key: 'e', type: ColorPickerItemType.Divider },
                  { key: 'f', label: 'More Colors', type: ColorPickerItemType.Header },
                  { key: 'd2', type: ColorPickerItemType.Divider },
                  { key: 'g', label: 'green', type: ColorPickerItemType.Normal, color: 'green' },
                  { key: 'h', label: 'orange', type: ColorPickerItemType.Normal, color: 'orange' },
                  { key: 'i', label: 'blue', type: ColorPickerItemType.Normal, color: 'blue' },
                  { key: 'j', label: 'red', type: ColorPickerItemType.Normal, color: 'red' },
                  { key: 'k', label: 'black', type: ColorPickerItemType.Normal, color: 'black' },
                  { key: 'l', label: 'grey', type: ColorPickerItemType.Normal, color: 'grey' },
                  { key: 'm', label: 'purple', type: ColorPickerItemType.Normal, color: 'purple' },
                  { key: 'n', label: 'yellow', type: ColorPickerItemType.Normal, color: 'yellow' }

                ]
              } />
          </div>
        </div>
        <div>Simple expandable predefiend color picker with multiple sections:</div>
        <PredefinedColorPicker
          colorPickerButtonIconProps={ { iconName: 'fontColor' } }
          width={ 4 }
          cellShape={ CellShape.square }
          colorPickerItems={
            [
              { key: '0', label: 'Colors', type: ColorPickerItemType.Header },
              { key: 'd1', type: ColorPickerItemType.Divider },
              { key: 'a', label: 'green', type: ColorPickerItemType.Normal, color: '#00ff00' },
              { key: 'b', label: 'orange', type: ColorPickerItemType.Normal, color: '#ffa500' },
              { key: 'c', label: 'blue', type: ColorPickerItemType.Normal, color: '#0000ff' },
              { key: 'd', label: 'red', type: ColorPickerItemType.Normal, color: '#ff0000' },
              { key: 'e', type: ColorPickerItemType.Divider },
              { key: 'f', label: 'More Colors', type: ColorPickerItemType.Header },
              { key: 'd2', type: ColorPickerItemType.Divider },
              { key: 'g', label: 'green', type: ColorPickerItemType.Normal, color: 'green' },
              { key: 'h', label: 'orange', type: ColorPickerItemType.Normal, color: 'orange' },
              { key: 'i', label: 'blue', type: ColorPickerItemType.Normal, color: 'blue' },
              { key: 'j', label: 'red', type: ColorPickerItemType.Normal, color: 'red' }
            ]
          } />
        <div>Simple expandable predefiend color picker with multiple sections that updates it's icon color:</div>
        <PredefinedColorPicker
          colorPickerButtonIconProps={ { iconName: 'fontColor' } }
          updateButtonIconWithColor={ true }
          width={ 4 }
          cellShape={ CellShape.circle }
          colorPickerItems={
            [
              { key: '0', label: 'Colors', type: ColorPickerItemType.Header },
              { key: 'd1', type: ColorPickerItemType.Divider },
              { key: 'a', label: 'green', type: ColorPickerItemType.Normal, color: '#00ff00' },
              { key: 'b', label: 'orange', type: ColorPickerItemType.Normal, color: '#ffa500' },
              { key: 'c', label: 'blue', type: ColorPickerItemType.Normal, color: '#0000ff' },
              { key: 'd', label: 'red', type: ColorPickerItemType.Normal, color: '#ff0000' },
              { key: 'e', type: ColorPickerItemType.Divider },
              { key: 'f', label: 'More Colors', type: ColorPickerItemType.Header },
              { key: 'd2', type: ColorPickerItemType.Divider },
              { key: 'g', label: 'green', type: ColorPickerItemType.Normal, color: 'green' },
              { key: 'h', label: 'orange', type: ColorPickerItemType.Normal, color: 'orange' },
              { key: 'i', label: 'blue', type: ColorPickerItemType.Normal, color: 'blue' },
              { key: 'j', label: 'red', type: ColorPickerItemType.Normal, color: 'red' },
              { key: 'k', label: 'black', type: ColorPickerItemType.Normal, color: 'black' },
              { key: 'l', label: 'grey', type: ColorPickerItemType.Normal, color: 'grey' },
              { key: 'm', label: 'purple', type: ColorPickerItemType.Normal, color: 'purple' },
              { key: 'n', label: 'yellow', type: ColorPickerItemType.Normal, color: 'yellow' }

            ]
          } />
      </div>
    );
  }
}
