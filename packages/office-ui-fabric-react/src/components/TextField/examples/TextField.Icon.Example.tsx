import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
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

  private _onChanged = (text: string): void => {
    console.log(text);
  }
}