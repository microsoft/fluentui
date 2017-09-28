import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export class TextFieldBorderlessExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField
          label='Borderless Standard TextField'
          borderless
          placeholder='No borders here, folks.'
        />
        <TextField
          label='Borderless Multiline TextField'
          multiline
          rows={ 4 }
          borderless
          placeholder='No borders here, folks.'
        />
      </div>
    );
  }
}