import * as React from 'react';
import { Toggle } from '../index';
import { Label, Spinner } from 'office-ui-fabric-react';

// tslint:disable:jsx-no-lambda
export class ToggleExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Toggle defaultChecked={true} onText="No Label" offText="No Label" onChange={this._onChange} />
        <Toggle defaultChecked={true} label="No Text" onChange={this._onChange} />
        <Toggle defaultChecked={true} label="Enabled and checked" onText="On" offText="Off" onChange={this._onChange} />
        <Toggle defaultChecked={false} label="Enabled and unchecked" onText="On" offText="Off" onChange={this._onChange} />
        <Toggle defaultChecked={true} disabled={true} label="Disabled and checked" onText="On" offText="Off" />
        <Toggle defaultChecked={false} disabled={true} label="Disabled and unchecked" onText="On" offText="Off" />
        <Toggle
          defaultChecked={true}
          label="Functional Text Props"
          onText={props => <Spinner {...props} />}
          offText={props => (
            <Label {...props} styles={{ root: { background: 'lightgrey' } }}>
              Spinner Disabled
            </Label>
          )}
        />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
