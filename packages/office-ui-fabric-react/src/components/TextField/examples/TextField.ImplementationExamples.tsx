import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class TextFieldImplementationExamples extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField
          label='TextField with an icon'
          iconProps={ { iconName: 'Calendar' } }
          onChanged={ this._onChanged }
        />
        <TextField
          label='Textfield with an addon'
          addonString='https://'
        />
      </div>
    );
  }

  @autobind
  private _onChanged(text: string) {
    console.log(text);
  }
}