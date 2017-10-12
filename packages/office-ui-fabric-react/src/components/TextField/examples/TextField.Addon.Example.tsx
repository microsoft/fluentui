import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldAddonExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-TextFieldExample'>
        <TextField
          addonString='https://'
        />
      </div>
    );
  }
}