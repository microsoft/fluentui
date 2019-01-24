// @codepen

import * as React from 'react';
import { ColorPicker, Toggle } from 'office-ui-fabric-react/lib/index';

export interface IBasicColorPickerExampleState {
  color: string;
  alphaSliderHidden: boolean;
}

export class ColorPickerBasicExample extends React.Component<{}, IBasicColorPickerExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      color: '#ffffff',
      alphaSliderHidden: false
    };
  }

  public render(): JSX.Element {
    const { color, alphaSliderHidden } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <ColorPicker color={color} onColorChanged={this._updateColor} alphaSliderHidden={alphaSliderHidden} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: color, width: 100, height: 100, margin: 16, border: '1px solid #c8c6c4' }} />
          <Toggle label="Hide alpha slider" onChange={this._onHideAlphaClick} checked={alphaSliderHidden} />
        </div>
      </div>
    );
  }

  private _updateColor = (color: string): void => {
    this.setState({ color: color });
  };

  private _onHideAlphaClick = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    this.setState({ alphaSliderHidden: !!checked });
  };
}
