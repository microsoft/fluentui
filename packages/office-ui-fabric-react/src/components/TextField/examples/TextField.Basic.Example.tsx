import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-TextFieldExample'>
        <TextField
          label='Standard'
        />
        <TextField
          label='Disabled'
          disabled={ true }
        />
        <TextField
          label='Required '
          required={ true }
        />
        <TextField
          label='With error message'
          errorMessage='Error message'
        />
      </div>
    );
  }
}