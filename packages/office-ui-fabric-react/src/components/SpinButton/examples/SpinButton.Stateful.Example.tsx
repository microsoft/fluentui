import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface ISpinButtonStatefulExampleState {
  value: number;
  asyncResetTimer: undefined | NodeJS.Timer;
}

export class SpinButtonStatefulExample extends React.Component<{}, ISpinButtonStatefulExampleState> {
  private static _initialValue: number = 8;

  public constructor(props: {}) {
    super(props);

    this.state = {
      value: SpinButtonStatefulExample._initialValue,
      asyncResetTimer: undefined
    };
  }

  public componentWillUnmount() {
    if (this.state.asyncResetTimer) {
      clearTimeout(this.state.asyncResetTimer);
    }
  }

  public render(): JSX.Element {
    return (
      <div style={{ width: '400px' }}>
        <SpinButton label="Controlled SpinButton:" min={0} max={10} value={this.state.value.toString()} onChange={this._handleChange} />
        <SpinButton label="Shadow SpinButton:" min={5} max={15} value={this.state.value.toString()} onChange={this._handleChange} />
        <SpinButton label="SpinButton without onChange handler:" value={this.state.value.toString()} />
        <DefaultButton text="Reset" onClick={this._handleReset} styles={{ root: { marginRight: 10 } }} />
        <DefaultButton text="Async Reset" onClick={this._handleAsyncReset} disabled={this.state.asyncResetTimer !== undefined} />
      </div>
    );
  }

  private _handleChange = (value: string) => {
    this.setState({ value: Number(value) });
  };

  private _handleReset = () => {
    this.setState({ value: SpinButtonStatefulExample._initialValue });
  };

  private _handleAsyncReset = () => {
    const timer = setTimeout(() => {
      this.setState({
        value: SpinButtonStatefulExample._initialValue,
        asyncResetTimer: undefined
      });
    }, 3000);

    this.setState({ asyncResetTimer: timer });
  };
}
