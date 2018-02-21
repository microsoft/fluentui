import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import './TextField.Examples.scss';

export class TextFieldIconExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <TextField
          label='TextField with an icon'
          iconProps={ { iconName: 'Calendar' } }
          onChanged={ this._onChanged }
        />
      </div>
    );
  }

  @autobind
  private _onChanged(text: string) {
    console.log(text);
  }
}