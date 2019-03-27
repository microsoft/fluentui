import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { lorem } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export interface ITextFieldMultilineExampleState {
  multiline: boolean;
}

export class TextFieldMultilineExample extends React.Component<{}, ITextFieldMultilineExampleState> {
  private _lorem: string;
  constructor(props: {}) {
    super(props);
    this.state = { multiline: false };
    this._lorem = lorem(100);
  }

  public render(): JSX.Element {
    return (
      <Stack gap={15} maxWidth={300}>
        <TextField label="Standard" multiline rows={3} />
        <TextField label="Disabled" multiline rows={3} disabled value={this._lorem} />
        <TextField label="Non-resizable" multiline resizable={false} />
        <TextField label="With auto adjusting height" multiline autoAdjustHeight />
        <TextField
          label="Switches from single to multiline if more than 50 characters are entered"
          multiline={this.state.multiline}
          onChange={this._onChange}
        />
      </Stack>
    );
  }

  private _onChange = (ev: any, newText: string): void => {
    const newMultiline = newText.length > 50;
    if (newMultiline !== this.state.multiline) {
      this.setState({ multiline: newMultiline });
    }
  };
}
