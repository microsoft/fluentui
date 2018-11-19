import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';
import { lorem } from 'office-ui-fabric-react/lib/utilities/exampleData';

export interface IState {
  multiline: boolean;
}

export class TextFieldMultilineExample extends React.Component<any, IState> {
  private _lorem: string;
  constructor(props: any) {
    super(props);
    this.state = { multiline: false };
    this._lorem = lorem(100);
  }

  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField label="Standard" multiline rows={4} />
        <TextField label="Disabled" multiline rows={4} disabled={true} value={this._lorem} />
        <TextField label="Required" multiline rows={4} required={true} />
        <TextField label="With error message" multiline rows={4} errorMessage="This is an error message." />
        <TextField label="Non-resizable" multiline resizable={false} />
        <TextField label="With auto adjusting height" multiline autoAdjustHeight />
        <TextField
          label="Switches from single to multiline if more than 50 characters are entered"
          multiline={this.state.multiline}
          onChange={this._onChange}
        />
      </div>
    );
  }

  private _onChange = (ev: any, newText: string): void => {
    const newMultiline = newText.length > 50;
    if (newMultiline !== this.state.multiline) {
      this.setState({ multiline: newMultiline });
    }
  };
}
