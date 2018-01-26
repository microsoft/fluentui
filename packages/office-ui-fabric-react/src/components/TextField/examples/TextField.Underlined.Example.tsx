import * as React from 'react';
import { DefaultTextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldUnderlinedExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <DefaultTextField
          label='Standard:'
          underlined
        />
        <DefaultTextField
          label='Disabled:'
          underlined
          disabled={ true }
        />
        <DefaultTextField
          label='Required:'
          underlined
          required={ true }
        />
        <DefaultTextField
          label='With error message:'
          underlined
          errorMessage='Error message'
        />
      </div>
    );
  }
}