import * as React from 'react';
import { SignalField, SignalFieldMode } from '../SignalField';
import { YouCheckedOutSignal, AwaitingApprovalSignal } from '../Signals';
import { lorem } from '@uifabric/example-app-base';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export interface ISignalFieldBasicExampleState {
  mode: SignalFieldMode;
}

const text = lorem(4);

export class SignalFieldBasicExample extends React.Component<{}, ISignalFieldBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      mode: 'compact'
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <Checkbox label="Wide?" onChange={this._onModeChange} checked={this.state.mode === 'wide'} />
        <SignalField
          signalsFieldMode={this.state.mode}
          before={[<YouCheckedOutSignal key="a" />]}
          after={[<AwaitingApprovalSignal key="b" />]}
        >
          {text}
        </SignalField>
      </div>
    );
  }

  private _onModeChange = (event: React.MouseEvent<HTMLElement>, checked?: boolean | undefined): void => {
    this.setState({
      mode: checked ? 'wide' : 'compact'
    });
  };
}
