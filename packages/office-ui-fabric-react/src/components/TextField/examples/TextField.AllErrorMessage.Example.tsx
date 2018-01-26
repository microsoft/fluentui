import * as React from 'react';
import { DefaultTextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldAllErrorMessageExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <DefaultTextField
          errorMessage='Error message'
          label='Default with error message'
        />
        <DefaultTextField
          errorMessage='Error message'
          placeholder='Placeholder with error message'
        />
        <DefaultTextField
          errorMessage='Error message'
          label='Underlined with error message:'
          underlined
        />
        <DefaultTextField
          errorMessage='Error message'
          label='Multiline with error message'
          multiline
          rows={ 4 }
        />
      </div>
    );
  }
}