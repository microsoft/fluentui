import * as React from 'react';
import { Toggle } from '../index';

export class ToggleExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Toggle defaultChecked={true} label="Enabled and checked" onText="On" offText="Off" onChange={this._onChange} />
        <Toggle defaultChecked={false} label="Enabled and unchecked" onText="On" offText="Off" onChange={this._onChange} />
        <Toggle defaultChecked={true} disabled={true} label="Disabled and checked" onText="On" offText="Off" />
        <Toggle defaultChecked={false} disabled={true} label="Disabled and unchecked" onText="On" offText="Off" />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
