import * as React from 'react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';

export interface IBasicColorPickerExampleState {
  color: string;
}

export class ColorPickerBasicExample extends React.Component<any, IBasicColorPickerExampleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      color: '#ffffff'
    };

    this._updateColor = this._updateColor.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div style={{ display: 'flex' }}>
        <ColorPicker color={this.state.color} onColorChanged={this._updateColor} />
        <div style={{ backgroundColor: this.state.color, width: 100, height: 100, margin: 16, border: '1px solid #c8c6c4' }} />
      </div>
    );
  }

  private _updateColor = (color: string): void => {
    this.setState({
      color: color
    });
  };
}
