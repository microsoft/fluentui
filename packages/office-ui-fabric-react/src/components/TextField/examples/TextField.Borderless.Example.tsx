import * as React from 'react';
import { DefaultTextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldBorderlessExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='docs-TextFieldExample'>
        <DefaultTextField
          label='Borderless Multiline TextField'
          multiline
          rows={ 4 }
          borderless
          placeholder='No borders here, folks.'
        />
        <DefaultTextField
          label='Borderless Standard TextField'
          borderless
          placeholder='No borders here, folks.'
        />
      </div>
    );
  }
}