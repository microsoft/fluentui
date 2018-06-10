import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldAllErrorMessageExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className='docs-TextFieldExample'>
        <TextField
          errorMessage='Error message'
          label='Default with error message'
        />
        <TextField
          errorMessage='Error message'
          placeholder='Placeholder with error message'
        />
        <TextField
          errorMessage='Error message'
          label='Underlined with error message:'
          underlined
        />
        <TextField
          errorMessage='Error message'
          label='Multiline with error message'
          multiline
          rows={ 4 }
        />
      </div>
    );
  }
}