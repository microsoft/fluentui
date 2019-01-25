import * as React from 'react';
import { Toggle } from '@uifabric/experiments';
import { Label, Spinner } from 'office-ui-fabric-react';

export interface IToggleExampleState {
  checked: boolean;
}

// tslint:disable:jsx-no-lambda
export class ToggleExample extends React.Component<{}, IToggleExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = { checked: true };
  }

  public render(): JSX.Element {
    const { checked } = this.state;
    return (
      <div>
        <Toggle defaultChecked={true} onText="No Label" offText="No Label" onChange={this._onChange} />
        <Toggle defaultChecked={true} label="No Text" onChange={this._onChange} />
        <Toggle defaultChecked={true} label="Enabled and checked" onText="On" offText="Off" onChange={this._onChange} />
        <Toggle defaultChecked={false} label="Enabled and unchecked" onText="On" offText="Off" onChange={this._onChange} />
        <Toggle defaultChecked={true} disabled={true} label="Disabled and checked" onText="On" offText="Off" />
        <Toggle defaultChecked={false} disabled={true} label="Disabled and unchecked" onText="On" offText="Off" />
        <Toggle defaultChecked={false} label="Text prop overrides" onText="Shouldn't see me" offText="Shouldn't see me" text="Override" />
        <Toggle
          defaultChecked={true}
          label="Custom On/Off render functions"
          onChange={this._onCustomRenderChange}
          text={props => {
            return <Label {...props}>{checked ? <Spinner /> : 'Spinner Off'}</Label>;
          }}
        />
      </div>
    );
  }

  private _onChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  };

  private _onCustomRenderChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
    this.setState({ checked });
  };
}
