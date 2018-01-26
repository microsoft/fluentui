import * as React from 'react';
import { DefaultTextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldMultilineExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <DefaultTextField
          label='Standard'
          multiline
          rows={ 4 }
        />
        <DefaultTextField
          label='Disabled'
          multiline
          rows={ 4 }
          disabled={ true }
        />
        <DefaultTextField
          label='Required'
          multiline
          rows={ 4 }
          required={ true }
        />
        <DefaultTextField
          label='With error message'
          multiline
          rows={ 4 }
          errorMessage='This is an error message.'
        />
        <DefaultTextField
          label='Non-resizable'
          multiline
          resizable={ false }
        />
        <DefaultTextField
          label='With auto adjusting height'
          multiline
          autoAdjustHeight
        />
      </div>
    );
  }
}