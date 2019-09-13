import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { lorem } from '@uifabric/example-data';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';

export interface ITextFieldMultilineExampleState {
  multiline: boolean;
}

export class TextFieldMultilineExample extends React.Component<{}, ITextFieldMultilineExampleState> {
  public state: ITextFieldMultilineExampleState = { multiline: false };
  private _lorem: string = lorem(100);

  public render(): JSX.Element {
    // TextFields don't have to be inside Stacks, we're just using Stacks for layout
    const columnProps: Partial<IStackProps> = {
      tokens: { childrenGap: 15 },
      styles: { root: { width: 300 } }
    };

    return (
      <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
        <Stack {...columnProps}>
          <TextField label="Standard" multiline rows={3} />
          <TextField label="Disabled" multiline rows={3} disabled defaultValue={this._lorem} />
          <TextField label="Non-resizable" multiline resizable={false} />
        </Stack>

        <Stack {...columnProps}>
          <TextField label="With auto adjusting height" multiline autoAdjustHeight />
          <TextField
            label="Switches from single to multiline if more than 50 characters are entered"
            multiline={this.state.multiline}
            onChange={this._onChange}
          />
        </Stack>
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
