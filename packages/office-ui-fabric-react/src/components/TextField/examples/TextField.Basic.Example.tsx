import * as React from 'react';
import {
  TextField,
  MaskedTextField
} from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className='docs-TextFieldExample'>
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
        <MaskedTextField
          label='With input mask'
          mask='m\ask: (999) 999 - 9999'
        />
      </div>
    );
  }
}
