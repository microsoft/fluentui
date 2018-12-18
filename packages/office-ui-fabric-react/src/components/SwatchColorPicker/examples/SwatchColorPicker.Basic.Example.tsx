import * as React from 'react';
import { SwatchColorPicker } from 'office-ui-fabric-react/lib/SwatchColorPicker';

export interface IBasicSwatchColorPickerExampleState {
  color: string | undefined;
  previewColor: string | undefined;
  color2: string | undefined;
  previewColor2: string | undefined;
}

export class SwatchColorPickerBasicExample extends React.Component<any, IBasicSwatchColorPickerExampleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      color: undefined,
      previewColor: undefined,
      color2: undefined,
      previewColor2: undefined
    };
  }
  public render(): JSX.Element {
    return (
      <div>
        <div>Simple circle swatch color picker:</div>
        <SwatchColorPicker
          columnCount={5}
          selectedId={this.state.color}
          cellShape={'circle'}
          colorCells={[
            { id: 'a', label: 'green', color: '#00ff00' },
            { id: 'b', label: 'orange', color: '#ffa500' },
            { id: 'c', label: 'blue', color: '#0000ff' },
            { id: 'd', label: 'red', color: '#ff0000' },
            { id: 'e', label: 'white', color: '#ffffff' }
          ]}
        />
        <div>Simple square swatch color picker:</div>
        <SwatchColorPicker
          columnCount={5}
          selectedId={this.state.color}
          cellShape={'square'}
          colorCells={[
            { id: 'a', label: 'green', color: '#00ff00' },
            { id: 'b', label: 'orange', color: '#ffa500' },
            { id: 'c', label: 'blue', color: '#0000ff' },
            { id: 'd', label: 'red', color: '#ff0000' },
            { id: 'e', label: 'white', color: '#ffffff' }
          ]}
        />
        <div>Simple swatch color picker with multiple rows and larger cells that updates its icon color and shows a preview color:</div>
        <div
          style={{
            color: this.state.previewColor ? this.state.previewColor : this.state.color ? this.state.color : undefined,
            fontSize: '24px'
          }}
        >
          Sample Text
        </div>
        <SwatchColorPicker
          selectedId={this.state.color}
          // tslint:disable:jsx-no-lambda
          onCellHovered={(id, color) => this.setState({ previewColor: color! })}
          onCellFocused={(id, color) => this.setState({ previewColor: color! })}
          // tslint:enable:jsx-no-lambda
          columnCount={4}
          cellShape={'circle'}
          cellHeight={35}
          cellWidth={35}
          cellBorderWidth={3}
          colorCells={[
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
          ]}
        />
        <div>Simple disabled circle swatch color picker:</div>
        <SwatchColorPicker
          disabled={true}
          columnCount={5}
          selectedId={this.state.color}
          cellShape={'circle'}
          colorCells={[
            { id: 'a', label: 'green', color: '#00ff00' },
            { id: 'b', label: 'orange', color: '#ffa500' },
            { id: 'c', label: 'blue', color: '#0000ff' },
            { id: 'd', label: 'red', color: '#ff0000' },
            { id: 'e', label: 'white', color: '#ffffff' }
          ]}
        />
      </div>
    );
  }
}
