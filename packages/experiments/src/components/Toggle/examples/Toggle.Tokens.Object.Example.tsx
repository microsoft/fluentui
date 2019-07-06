import * as React from 'react';
import { IToggleTokens, Toggle } from '@uifabric/experiments';

const tokens1: IToggleTokens = {
  pillHoveredBackground: 'black',
  textColor: 'red'
};

const tokens2: IToggleTokens = {
  pillBackground: 'orange',
  pillJustifyContent: 'center',
  textColor: 'purple',
  thumbBackground: 'green'
};

const tokens3: IToggleTokens = {
  pillBackground: 'dimgrey',
  pillBorderColor: 'brown',
  textColor: 'darkred'
};

export class ToggleTokensObjectExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Toggle defaultChecked={true} label="Example 1" onText="On" offText="Off" onChange={this._onChange} tokens={tokens1} />
        <Toggle defaultChecked={false} label="Example 2" onText="On" offText="Off" onChange={this._onChange} tokens={tokens2} />
        <Toggle defaultChecked={true} disabled={true} label="Example 3" onText="On - Disabled" offText="Off" tokens={tokens3} />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
