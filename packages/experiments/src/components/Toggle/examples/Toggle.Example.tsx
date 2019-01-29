import * as React from 'react';
import { Toggle } from '@uifabric/experiments';
import { Label, Spinner } from 'office-ui-fabric-react';

export interface IToggleExampleState {
  checked: boolean;
}

// TODO: just consider removing these examples if CollapsibleSections's are similar
// Mock async data container component
interface IAsyncDataProps {
  render: (data?: string) => JSX.Element;
  data?: string;
}

class AsyncData extends React.Component<IAsyncDataProps, { loading: boolean }> {
  constructor(props: IAsyncDataProps) {
    super(props);
    this.state = { loading: true };
  }

  public componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 3000);
  }

  public render() {
    const { loading } = this.state;
    const { render, data } = this.props;

    return render(loading ? undefined : data);
  }
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
          text={render => render((TextType, props) => <Label {...props}>{checked ? <Spinner /> : 'Spinner Off'}</Label>)}
        />
        <Toggle
          defaultChecked={true}
          label="Custom On/Off render functions"
          onChange={this._onCustomRenderChange}
          text={render => {
            return render((ComponentType, props) => <Label {...props} />, 'shorthand value');
          }}
        />
        <Toggle
          defaultChecked={true}
          label="Custom On/Off render functions"
          onChange={this._onCustomRenderChange}
          text={render => render((ComponentType, props) => <Label {...props} />, 'shorthand value')}
        />
        <Toggle
          defaultChecked={true}
          label="Custom On/Off render functions"
          onChange={this._onCustomRenderChange}
          text={render => (
            <AsyncData
              data="done"
              render={data => render((ComponentType, props) => (data ? <ComponentType {...props} /> : <Spinner {...props} />), data)}
            />
          )}
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
