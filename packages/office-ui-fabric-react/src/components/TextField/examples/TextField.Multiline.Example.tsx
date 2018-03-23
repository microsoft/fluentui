import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';
import { lorem } from '@uifabric/example-app-base';

export class TextFieldMultilineExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <TextField
          label='Standard'
          multiline
          rows={ 4 }
        />
        <TextField
          label='Disabled'
          multiline
          rows={ 4 }
          disabled={ true }
          value={ lorem(100) }
        />
        <TextField
          label='Required'
          multiline
          rows={ 4 }
          required={ true }
        />
        <TextField
          label='With error message'
          multiline
          rows={ 4 }
          errorMessage='This is an error message.'
        />
        <TextField
          label='Non-resizable'
          multiline
          resizable={ false }
        />
        <TextField
          label='With auto adjusting height'
          multiline
          autoAdjustHeight
        />
      </div>
    );
  }
}