import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

export interface ISpinButtonControlledExampleState {
  value: string;
}

// tslint:disable:jsx-no-lambda
export class SpinButtonControlledExample extends React.Component<{}, ISpinButtonControlledExampleState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      value: '37'
    };
  }

  public render(): JSX.Element {
    return (
      <div style={{ width: '400px' }}>
        <SpinButton
          label="SpinButton as controlled component:"
          value={this.state.value}
          onValidValueUpdated={value => this.setState({ value })}
        />
        <br />
        <SpinButton
          label="SpinButton synchronous the value:"
          value={this.state.value}
          onValidValueUpdated={value => this.setState({ value })}
        />
      </div>
    );
  }
}
