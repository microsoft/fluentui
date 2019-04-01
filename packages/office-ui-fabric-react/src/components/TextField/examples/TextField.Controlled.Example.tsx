import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export interface ITextFieldControlledExampleState {
  value1: string;
  value2: string;
}

export class TextFieldControlledExample extends React.Component<{}, ITextFieldControlledExampleState> {
  public state: ITextFieldControlledExampleState = { value1: '', value2: '' };

  public render() {
    return (
      <Stack tokens={{ childrenGap: 15 }}>
        <TextField
          label="Basic controlled TextField"
          value={this.state.value1}
          onChange={this._onChange1}
          styles={{ fieldGroup: { width: 300 } }}
        />

        <TextField
          label="Controlled TextField limiting length of value to 5"
          value={this.state.value2}
          onChange={this._onChange2}
          styles={{ fieldGroup: { width: 100 } }}
        />
      </Stack>
    );
  }

  private _onChange1 = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ value1: newValue || '' });
  };

  private _onChange2 = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    if (!newValue || newValue.length <= 5) {
      this.setState({ value2: newValue || '' });
    } else {
      // This block should NOT be necessary, but there's currently a bug (#1350) where a controlled
      // TextField will continue to accept input even if its `value` prop isn't updated.
      // (The correct behavior is that the displayed value should *always* match the `value` prop.
      // If the `value` prop isn't updated in response to user input, the input should be ignored.)
      // Because this is a large behavior change, the bug won't be fixed until Fabric 7.
      // As a workaround, force re-rendering with the existing value.
      this.setState({ value2: this.state.value2 });
    }
  };
}
