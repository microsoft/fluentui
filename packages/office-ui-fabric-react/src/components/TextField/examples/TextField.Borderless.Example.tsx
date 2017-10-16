import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldBorderlessExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-TextFieldExample'>
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