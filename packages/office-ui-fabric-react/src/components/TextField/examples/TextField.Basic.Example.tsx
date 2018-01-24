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
          label='Standard with value attribute'
          value="With a set value. (Can't be edited)" // tslint:disable-line quotemark
        />
        <TextField
          label='Standard with defaultValue attribute'
          defaultValue='With a set defaultValue.'
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