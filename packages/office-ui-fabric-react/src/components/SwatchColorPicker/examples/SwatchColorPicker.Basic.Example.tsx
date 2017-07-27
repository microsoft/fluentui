import * as React from 'react';
import { SwatchColorPicker } from 'office-ui-fabric-react/lib/SwatchColorPicker';

export interface IBasicSwatchColorPickerExampleState {
  color: string | undefined;
  previewColor: string | undefined;
}

export class SwatchColorPickerBasicExample extends React.Component<any, IBasicSwatchColorPickerExampleState> {

  private width: number = 4;

  constructor(props: any) {
    super(props);

    this.state = {
      color: undefined,
      previewColor: undefined
    };
  }
  public render() {

    return (
      <div>
        <div>Simple circle swatch color picker:</div>
        <SwatchColorPicker
          columnCount={ 4 }
          cellShape={ 'circle' }
          swatchColorPickerItems={
            [
              { id: 'a', label: 'green', color: '#00ff00' },
              { id: 'b', label: 'orange', color: '#ffa500' },
              { id: 'c', label: 'blue', color: '#0000ff' },
              { id: 'd', label: 'red', color: '#ff0000' }
            ]
          } />
        <div>Simple square swatch color picker:</div>
        <SwatchColorPicker
          columnCount={ 4 }
          cellShape={ 'square' }
          swatchColorPickerItems={
            [
              { id: 'a', label: 'green', color: '#00ff00' },
              { id: 'b', label: 'orange', color: '#ffa500' },
              { id: 'c', label: 'blue', color: '#0000ff' },
              { id: 'd', label: 'red', color: '#ff0000' }
            ]
          } />
        <div>Simple swatch color picker with multiple rows that updates it's icon color and shows a preview color:</div>
        <div style={ { color: this.state.previewColor ? this.state.previewColor : this.state.color ? this.state.color : null, fontSize: '24px' } } >Sample Text</div>
        <SwatchColorPicker
          onCellHovered={ (id, color) => this.setState({ previewColor: color! }) }
          onCellFocused={ (id, color) => this.setState({ previewColor: color! }) }
          onColorChanged={ (id, newColor) => this.setState({ color: newColor }) }
          columnCount={ 4 }
          cellShape={ 'circle' }
          swatchColorPickerItems={
            [
              { id: 'a', label: 'green', color: '#00ff00' },
              { id: 'b', label: 'orange', color: '#ffa500' },
              { id: 'c', label: 'blue', color: '#0000ff' },
              { id: 'd', label: 'red', color: '#ff0000' },
              { id: 'g', label: 'green', color: 'green' },
              { id: 'h', label: 'orange', color: 'orange' },
              { id: 'i', label: 'blue', color: 'blue' },
              { id: 'j', label: 'red', color: 'red' },
              { id: 'k', label: 'black', color: 'black' },
              { id: 'l', label: 'grey', color: 'grey' },
              { id: 'm', label: 'purple', color: 'purple' },
              { id: 'n', label: 'yellow', color: 'yellow' }

            ]
          } />
        <div>Simple disabled circle swatch color picker:</div>
        <SwatchColorPicker
          disabled={ true }
          columnCount={ 4 }
          cellShape={ 'circle' }
          swatchColorPickerItems={
            [
              { id: 'a', label: 'green', color: '#00ff00' },
              { id: 'b', label: 'orange', color: '#ffa500' },
              { id: 'c', label: 'blue', color: '#0000ff' },
              { id: 'd', label: 'red', color: '#ff0000' }
            ]
          } />
        <div>Simple disabled square swatch color picker with a few disabled items:</div>
        <SwatchColorPicker
          disabled={ true }
          columnCount={ 4 }
          cellShape={ 'square' }
          swatchColorPickerItems={
            [
              { id: 'a', label: 'green', color: '#00ff00' },
              { id: 'b', label: 'orange', color: '#ffa500', disabled: true },
              { id: 'c', label: 'blue', color: '#0000ff' },
              { id: 'd', label: 'red', color: '#ff0000', disabled: true },
            ]
          } />
      </div>
    );
  }
}
