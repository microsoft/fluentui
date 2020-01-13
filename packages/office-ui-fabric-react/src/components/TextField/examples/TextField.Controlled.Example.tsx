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
          styles={{ fieldGroup: { width: 100 } }}
          maxLength={5}
          onChange={this._onChange2}
        />
      </Stack>
    );
  }

  private _onChange1 = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ value1: newValue || '' });
  };

  private _onChange2 = (ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ value2: newValue || '' });
  };
}
