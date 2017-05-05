import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField label='Default TextField' onChanged={ this._onChanged } />
        <TextField label='Disabled TextField' disabled={ true } />
        <TextField label='Required TextField' required={ true } />
        <TextField label='TextField with a placeholder' placeholder='Now I am a Placeholder' ariaLabel='Please enter text here' />
        <TextField label='TextField with an icon' iconClass='ms-Icon--Calendar ms-Icon' />
        <TextField label='Textfield with an addon' addonString='https://' />
        <TextField label='Multiline TextField' multiline rows={ 4 } iconClass='ms-Icon--Calendar ms-Icon' />
        <TextField label='Multiline TextField Unresizable' multiline resizable={ false } />
        <TextField label='Multiline TextField with auto adjust height' multiline autoAdjustHeight />
        <TextField label='Underlined TextField' underlined />
        <TextField label='Readonly TextField' readOnly value={ `The value of this TextField is readonly.` } />
        <TextField label='Multiline Readonly TextField' multiline readOnly value={ `The value of this TextField is readonly.` } />
      </div>
    );
  }

  @autobind
  private _onChanged(text) {
    console.log(text);
  }
}
