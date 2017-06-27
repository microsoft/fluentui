import * as React from 'react';
import {
  SwatchColorPicker,
  SwatchColorPickerItemType
} from 'office-ui-fabric-react/lib/SwatchColorPicker';

export interface IBasicSwatchColorPickerExampleState {
  color: string;
  previewColor: string;
}

export class SwatchColorPickerBasicExample extends React.Component<any, IBasicSwatchColorPickerExampleState> {

  private width: number = 4;

  constructor(props: any) {
    super(props);

    this.state = {
      color: null,
      previewColor: null
    };
  }
  public render() {

    return (
      <div>
        <div>Simple swatch color picker:</div>
        <SwatchColorPicker
          columnCount={ 4 }
          cellShape={ 'circle' }
          swatchColorPickerItems={
            [
              { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500' },
              { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000' }
            ]
          } />
        <div style={ { height: '235px', position: 'relative' } }>
          <div>Simple swatch color picker with multiple sections:</div>
          <SwatchColorPicker
            columnCount={ this.width }
            cellShape={ 'circle' }
            swatchColorPickerItems={
              [
                { id: '0', label: 'Colors', type: SwatchColorPickerItemType.Header },
                { id: 'd1', type: SwatchColorPickerItemType.Divider },
                { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
                { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500' },
                { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
                { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000' },
                { id: 'e', type: SwatchColorPickerItemType.Divider },
                { id: 'f', label: 'More Colors', type: SwatchColorPickerItemType.Header },
                { id: 'd2', type: SwatchColorPickerItemType.Divider },
                { id: 'g', label: 'green', type: SwatchColorPickerItemType.Cell, color: 'green' },
                { id: 'h', label: 'orange', type: SwatchColorPickerItemType.Cell, color: 'orange' },
                { id: 'i', label: 'blue', type: SwatchColorPickerItemType.Cell, color: 'blue' },
                { id: 'j', label: 'red', type: SwatchColorPickerItemType.Cell, color: 'red' },
                { id: 'k', label: 'black', type: SwatchColorPickerItemType.Cell, color: 'black' },
                { id: 'l', label: 'grey', type: SwatchColorPickerItemType.Cell, color: 'grey' },
                { id: 'm', label: 'purple', type: SwatchColorPickerItemType.Cell, color: 'purple' },
                { id: 'n', label: 'yellow', type: SwatchColorPickerItemType.Cell, color: 'yellow' }

              ]
            } />
        </div>
        <div>Simple expandable swatch color picker with multiple sections:</div>
        <SwatchColorPicker
          menuButtonProps={ { iconProps: { iconName: 'color' }, menuIconProps: { iconName: 'add' } } }
          columnCount={ 4 }
          cellShape={ 'square' }
          swatchColorPickerItems={
            [
              { id: '0', label: 'Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd1', type: SwatchColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500' },
              { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000' },
              { id: 'e', type: SwatchColorPickerItemType.Divider },
              { id: 'f', label: 'More Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd2', type: SwatchColorPickerItemType.Divider },
              { id: 'g', label: 'green', type: SwatchColorPickerItemType.Cell, color: 'green' },
              { id: 'h', label: 'orange', type: SwatchColorPickerItemType.Cell, color: 'orange' },
              { id: 'i', label: 'blue', type: SwatchColorPickerItemType.Cell, color: 'blue' },
              { id: 'j', label: 'red', type: SwatchColorPickerItemType.Cell, color: 'red' },
              { id: 'k', type: SwatchColorPickerItemType.Divider },
              { id: 'l', label: 'Find Colors', type: SwatchColorPickerItemType.MenuItem },
              { id: 'm', label: 'Find More Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'glasses' } } },
              { id: 'n', label: '...More Colors...', type: SwatchColorPickerItemType.MenuItem },
              { id: 'o', label: 'Find Even More Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'redEye' } } }
            ]
          } />
        <div>Simple expandable swatch color picker with multiple sections that updates it's icon color:</div>
        <SwatchColorPicker
          menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
          setSelectedColorForIcon={ true }
          columnCount={ 4 }
          cellShape={ 'circle' }
          swatchColorPickerItems={
            [
              { id: '0', label: 'Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd1', type: SwatchColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500' },
              { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000' },
              { id: 'e', type: SwatchColorPickerItemType.Divider },
              { id: 'f', label: 'More Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd2', type: SwatchColorPickerItemType.Divider },
              { id: 'g', label: 'green', type: SwatchColorPickerItemType.Cell, color: 'green' },
              { id: 'h', label: 'orange', type: SwatchColorPickerItemType.Cell, color: 'orange' },
              { id: 'i', label: 'blue', type: SwatchColorPickerItemType.Cell, color: 'blue' },
              { id: 'j', label: 'red', type: SwatchColorPickerItemType.Cell, color: 'red' },
              { id: 'k', label: 'black', type: SwatchColorPickerItemType.Cell, color: 'black' },
              { id: 'l', label: 'grey', type: SwatchColorPickerItemType.Cell, color: 'grey' },
              { id: 'm', label: 'purple', type: SwatchColorPickerItemType.Cell, color: 'purple' },
              { id: 'n', label: 'yellow', type: SwatchColorPickerItemType.Cell, color: 'yellow' },
              { id: 'o', label: 'Find More Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'glasses' } } }
            ]
          } />
        <div>Simple expandable swatch color picker with multiple sections that updates it's icon color and shows a preview color:</div>
        <div style={ { color: this.state.previewColor ? this.state.previewColor : this.state.color ? this.state.color : null, fontSize: '24px' } } >Sample Text</div>
        <SwatchColorPicker
          menuButtonProps={ { iconProps: { iconName: 'fontColor' }, title: 'Font Color' } }
          setSelectedColorForIcon={ true }
          onCellHovered={ (color) => this.setState({ previewColor: color }) }
          onCellFocused={ (color) => this.setState({ previewColor: color }) }
          onColorChanged={ (newColor) => this.setState({ color: newColor }) }
          onMenuItemClick={ (item) => item.label && alert(item.label + ' was clicked') }
          columnCount={ 4 }
          cellShape={ 'circle' }
          swatchColorPickerItems={
            [
              { id: '0', label: 'Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd1', type: SwatchColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500' },
              { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000' },
              { id: 'e', type: SwatchColorPickerItemType.Divider },
              { id: 'f', label: 'More Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd2', type: SwatchColorPickerItemType.Divider },
              { id: 'g', label: 'green', type: SwatchColorPickerItemType.Cell, color: 'green' },
              { id: 'h', label: 'orange', type: SwatchColorPickerItemType.Cell, color: 'orange' },
              { id: 'i', label: 'blue', type: SwatchColorPickerItemType.Cell, color: 'blue' },
              { id: 'j', label: 'red', type: SwatchColorPickerItemType.Cell, color: 'red' },
              { id: 'k', label: 'black', type: SwatchColorPickerItemType.Cell, color: 'black' },
              { id: 'l', label: 'grey', type: SwatchColorPickerItemType.Cell, color: 'grey' },
              { id: 'm', label: 'purple', type: SwatchColorPickerItemType.Cell, color: 'purple' },
              { id: 'n', label: 'yellow', type: SwatchColorPickerItemType.Cell, color: 'yellow' },
              { id: 'o', label: 'Find More Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'glasses' } } }

            ]
          } />
        <div>Simple disabled swatch color picker:</div>
        <SwatchColorPicker
          menuButtonProps={ { iconProps: { iconName: 'fontColor' }, menuIconProps: { iconName: 'chevronDown' } } }
          disabled={ true }
          columnCount={ 4 }
          cellShape={ 'square' }
          swatchColorPickerItems={
            [
              { id: '0', label: 'Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd1', type: SwatchColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500', disabled: true },
              { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000', disabled: true },
            ]
          } />
        <div>Simple expandable swatch color picker with a few disabled items:</div>
        <SwatchColorPicker
          menuButtonProps={ { iconProps: { iconName: 'fontColor' }, menuIconProps: { iconName: 'chevronDown' } } }
          columnCount={ 4 }
          cellShape={ 'square' }
          swatchColorPickerItems={
            [
              { id: '0', label: 'Colors', type: SwatchColorPickerItemType.Header },
              { id: 'd1', type: SwatchColorPickerItemType.Divider },
              { id: 'a', label: 'green', type: SwatchColorPickerItemType.Cell, color: '#00ff00' },
              { id: 'b', label: 'orange', type: SwatchColorPickerItemType.Cell, color: '#ffa500', disabled: true },
              { id: 'c', label: 'blue', type: SwatchColorPickerItemType.Cell, color: '#0000ff' },
              { id: 'd', label: 'red', type: SwatchColorPickerItemType.Cell, color: '#ff0000', disabled: true },
              { id: 'e', label: 'Find Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'glasses' } }, disabled: true },
              { id: 'f', label: 'Find More Colors', type: SwatchColorPickerItemType.MenuItem, menuItemButtonProps: { iconProps: { iconName: 'redEye' } } }
            ]
          } />
      </div>
    );
  }
}
