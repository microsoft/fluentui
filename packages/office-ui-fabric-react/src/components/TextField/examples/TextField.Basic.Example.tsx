import * as React from 'react';
import {
  DefaultTextField,
  MaskedTextField
} from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <DefaultTextField
          label='Standard'
        />
        <DefaultTextField
          label='Disabled'
          disabled={ true }
        />
        <DefaultTextField
          label='Required '
          required={ true }
        />
        <DefaultTextField
          label='With error message'
          errorMessage='Error message'
        />
        <MaskedTextField
          label='With input mask'
          mask='Phone Number: (999) 999 - 9999'
          maskChar='_'
        />
      </div>
    );
  }
}