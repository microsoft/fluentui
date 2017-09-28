import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export class TextFieldUnderlinedExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField
          label='Standard:'
          underlined
        />
        <TextField
          label='Disabled:'
          underlined
          disabled={ true }
        />
        <TextField
          label='Required:'
          underlined
          required={ true }
        />
        <TextField
          label='With error message:'
          underlined
          errorMessage='Error message'
        />
      </div>
    );
  }
}