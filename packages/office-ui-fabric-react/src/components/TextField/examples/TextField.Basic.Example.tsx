import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <TextField
          label='Standard'
        />
        <TextField
          label='Standard with a blank value attribute'
          value=''
          description='Can not be edited by the user.'
        />
        <TextField
          label='Standard with value attribute'
          value='With a set value.'
          description='Can not be edited by the user.'
        />
        <TextField
          label='Standard with defaultValue attribute'
          defaultValue='With a set defaultValue.'
          description='Can be edited by the user.'
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