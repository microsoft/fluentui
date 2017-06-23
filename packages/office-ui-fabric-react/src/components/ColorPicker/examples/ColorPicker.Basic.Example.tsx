import * as React from 'react';
import {
  ColorPicker
} from 'office-ui-fabric-react/lib/ColorPicker';
// import {
//   PredefinedColorPicker, CellShape, ColorPickerItemType
// } from 'office-ui-fabric-react/lib/ColorPicker';

export interface IBasicColorPickerExampleState {
  color: string;
}

export class ColorPickerBasicExample extends React.Component<any, IBasicColorPickerExampleState> {
  // private width: number = 4;

  // constructor(props: any) {
  //   super(props);

  //   this.state = {
  //     color: null,
  //     previewColor: null
  //   };
  // }

  public render() {

    return (
      <div>
        <ColorPicker color='#FFFFFF' />
        {/*<div>Simple predefiend color picker:</div>
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
        <div style={ { height: '235px', position: 'relative' } }>
          <div>Simple predefiend color picker with multiple sections:</div>
          <PredefinedColorPicker
            width={ this.width }
            cellShape={ CellShape.circle }
            colorPickerItems={
              [
                { id: '0', label: 'Colors', type: ColorPickerItemType.Header },
                { id: 'd1', type: ColorPickerItemType.Divider },
                { id: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
                { id: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500' },
                { id: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
                { id: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000' },
                { id: 'e', type: ColorPickerItemType.Divider },
                { id: 'f', label: 'More Colors', type: ColorPickerItemType.Header },
                { id: 'd2', type: ColorPickerItemType.Divider },
                { id: 'g', label: 'green', type: ColorPickerItemType.Cell, color: 'green' },
                { id: 'h', label: 'orange', type: ColorPickerItemType.Cell, color: 'orange' },
                { id: 'i', label: 'blue', type: ColorPickerItemType.Cell, color: 'blue' },
                { id: 'j', label: 'red', type: ColorPickerItemType.Cell, color: 'red' },
                { id: 'k', label: 'black', type: ColorPickerItemType.Cell, color: 'black' },
                { id: 'l', label: 'grey', type: ColorPickerItemType.Cell, color: 'grey' },
                { id: 'm', label: 'purple', type: ColorPickerItemType.Cell, color: 'purple' },
                { id: 'n', label: 'yellow', type: ColorPickerItemType.Cell, color: 'yellow' }

              ]
            } />
        </div>
        <div>Simple expandable predefiend color picker with multiple sections:</div>
        <PredefinedColorPicker
          colorPickerButtonProps={ { iconProps: { iconName: 'color' }, menuIconProps: { iconName: 'add' } } }
          width={ 4 }
          cellShape={ CellShape.square }
          colorPickerItems={
            [
              { id: '0', label: 'Colors', type: ColorPickerItemType.Header },
              { id: 'd1', type: ColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500' },
              { id: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000' },
              { id: 'e', type: ColorPickerItemType.Divider },
              { id: 'f', label: 'More Colors', type: ColorPickerItemType.Header },
              { id: 'd2', type: ColorPickerItemType.Divider },
              { id: 'g', label: 'green', type: ColorPickerItemType.Cell, color: 'green' },
              { id: 'h', label: 'orange', type: ColorPickerItemType.Cell, color: 'orange' },
              { id: 'i', label: 'blue', type: ColorPickerItemType.Cell, color: 'blue' },
              { id: 'j', label: 'red', type: ColorPickerItemType.Cell, color: 'red' },
              { id: 'k', type: ColorPickerItemType.Divider },
              { id: 'l', label: 'Find Colors', type: ColorPickerItemType.MenuItem },
              { id: 'm', label: 'Find More Colors', type: ColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'glasses' } } },
              { id: 'n', label: '...More Colors...', type: ColorPickerItemType.MenuItem },
              { id: 'o', label: 'Find Even More Colors', type: ColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'redEye' } } }
            ]
          } />
        <div>Simple expandable predefiend color picker with multiple sections that updates it's icon color:</div>
        <PredefinedColorPicker
          colorPickerButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
          updateButtonIconWithColor={ true }
          width={ 4 }
          cellShape={ CellShape.circle }
          colorPickerItems={
            [
              { id: '0', label: 'Colors', type: ColorPickerItemType.Header },
              { id: 'd1', type: ColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500' },
              { id: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000' },
              { id: 'e', type: ColorPickerItemType.Divider },
              { id: 'f', label: 'More Colors', type: ColorPickerItemType.Header },
              { id: 'd2', type: ColorPickerItemType.Divider },
              { id: 'g', label: 'green', type: ColorPickerItemType.Cell, color: 'green' },
              { id: 'h', label: 'orange', type: ColorPickerItemType.Cell, color: 'orange' },
              { id: 'i', label: 'blue', type: ColorPickerItemType.Cell, color: 'blue' },
              { id: 'j', label: 'red', type: ColorPickerItemType.Cell, color: 'red' },
              { id: 'k', label: 'black', type: ColorPickerItemType.Cell, color: 'black' },
              { id: 'l', label: 'grey', type: ColorPickerItemType.Cell, color: 'grey' },
              { id: 'm', label: 'purple', type: ColorPickerItemType.Cell, color: 'purple' },
              { id: 'n', label: 'yellow', type: ColorPickerItemType.Cell, color: 'yellow' }

            ]
          } />
        <div>Simple expandable predefiend color picker with multiple sections that updates it's icon color and shows a preview color:</div>
        <div style={ { color: this.state.previewColor ? this.state.previewColor : this.state.color ? this.state.color : null, fontSize: '24px' } } >Sample Text</div>
        <PredefinedColorPicker
          colorPickerButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
          updateButtonIconWithColor={ true }
          onCellHovered={ (color) => this.setState({ previewColor: color }) }
          onCellFocused={ (color) => this.setState({ previewColor: color }) }
          onColorChanged={ (newColor) => this.setState({ color: newColor }) }
          width={ 4 }
          cellShape={ CellShape.circle }
          colorPickerItems={
            [
              { id: '0', label: 'Colors', type: ColorPickerItemType.Header },
              { id: 'd1', type: ColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500' },
              { id: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000' },
              { id: 'e', type: ColorPickerItemType.Divider },
              { id: 'f', label: 'More Colors', type: ColorPickerItemType.Header },
              { id: 'd2', type: ColorPickerItemType.Divider },
              { id: 'g', label: 'green', type: ColorPickerItemType.Cell, color: 'green' },
              { id: 'h', label: 'orange', type: ColorPickerItemType.Cell, color: 'orange' },
              { id: 'i', label: 'blue', type: ColorPickerItemType.Cell, color: 'blue' },
              { id: 'j', label: 'red', type: ColorPickerItemType.Cell, color: 'red' },
              { id: 'k', label: 'black', type: ColorPickerItemType.Cell, color: 'black' },
              { id: 'l', label: 'grey', type: ColorPickerItemType.Cell, color: 'grey' },
              { id: 'm', label: 'purple', type: ColorPickerItemType.Cell, color: 'purple' },
              { id: 'n', label: 'yellow', type: ColorPickerItemType.Cell, color: 'yellow' }

            ]
          } />
        <div>Simple disabled predefiend color picker:</div>
        <PredefinedColorPicker
          colorPickerButtonProps={ { iconProps: { iconName: 'fontColor' }, menuIconProps: { iconName: 'chevronDown' } } }
          disabled={ true }
          width={ 4 }
          cellShape={ CellShape.square }
          colorPickerItems={
            [
              { id: '0', label: 'Colors', type: ColorPickerItemType.Header },
              { id: 'd1', type: ColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500', disabled: true },
              { id: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000', disabled: true },
            ]
          } />
        <div>Simple expandable predefiend color picker with a few disabled items:</div>
        <PredefinedColorPicker
          colorPickerButtonProps={ { iconProps: { iconName: 'fontColor' }, menuIconProps: { iconName: 'chevronDown' } } }
          width={ 4 }
          cellShape={ CellShape.square }
          colorPickerItems={
            [
              { id: '0', label: 'Colors', type: ColorPickerItemType.Header },
              { id: 'd1', type: ColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: ColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: ColorPickerItemType.Cell, color: '#ffa500', disabled: true },
              { id: 'c', label: 'blue', type: ColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: ColorPickerItemType.Cell, color: '#ff0000', disabled: true },
              { id: 'e', label: 'Find Colors', type: ColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'glasses' } }, disabled: true },
              { id: 'f', label: 'Find More Colors', type: ColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'redEye' } } }
            ]
          } />*/}
      </div>
    );
  }
}
