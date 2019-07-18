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
            { id: 'a', label: 'orange', color: '#ca5010' },
            { id: 'b', label: 'cyan', color: '#038387' },
            { id: 'c', label: 'blueMagenta', color: '#8764b8' },
            { id: 'd', label: 'magenta', color: '#881798' },
            { id: 'e', label: 'white', color: '#ffffff' }
          ]}
        />
        <div>Simple square swatch color picker with default size of 20px:</div>
        <SwatchColorPicker
          columnCount={5}
          selectedId={this.state.color}
          cellShape={'square'}
          colorCells={[
            { id: 'a', label: 'orange', color: '#ca5010' },
            { id: 'b', label: 'cyan', color: '#038387' },
            { id: 'c', label: 'blueMagenta', color: '#8764b8' },
            { id: 'd', label: 'magenta', color: '#881798' },
            { id: 'e', label: 'white', color: '#ffffff' }
          ]}
        />
        <div>Simple square swatch color picker with custom size of 35px:</div>
        <SwatchColorPicker
          columnCount={5}
          cellHeight={35}
          cellWidth={35}
          selectedId={this.state.color}
          cellShape={'square'}
          colorCells={[
            { id: 'a', label: 'orange', color: '#ca5010' },
            { id: 'b', label: 'cyan', color: '#038387' },
            { id: 'c', label: 'blueMagenta', color: '#8764b8' },
            { id: 'd', label: 'magenta', color: '#881798' },
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
            { id: 'a', label: 'red', color: '#a4262c' },
            { id: 'b', label: 'orange', color: '#ca5010' },
            { id: 'c', label: 'orangeYellow', color: '#986f0b' },
            { id: 'd', label: 'yellowGreen', color: '#8cbd18' },
            { id: 'e', label: 'green', color: '#0b6a0b' },
            { id: 'f', label: 'cyan', color: '#038387' },
            { id: 'g', label: 'cyanBlue', color: '#004e8c' },
            { id: 'h', label: 'magenta', color: '#881798' },
            { id: 'i', label: 'magentaPink', color: '#9b0062' },
            { id: 'j', label: 'black', color: '#000000' },
            { id: 'k', label: 'gray', color: '#7a7574' },
            { id: 'l', label: 'gray20', color: '#69797e' }
          ]}
        />
        <div>Simple disabled circle swatch color picker:</div>
        <SwatchColorPicker
          disabled={true}
          columnCount={5}
          selectedId={this.state.color}
          cellShape={'circle'}
          colorCells={[
            { id: 'a', label: 'orange', color: '#ca5010' },
            { id: 'b', label: 'cyan', color: '#038387' },
            { id: 'c', label: 'blueMagenta', color: '#8764b8' },
            { id: 'd', label: 'magenta', color: '#881798' },
            { id: 'e', label: 'white', color: '#ffffff' }
          ]}
        />
      </div>
    );
  }
}
