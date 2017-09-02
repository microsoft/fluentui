import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField
          label='Default TextField' onChanged={ this._onChanged } />
        <TextField label='Disabled TextField' disabled={ true } placeholder='Placeholder text' />
        <TextField label='Required TextField' required={ true } />
        <TextField label='TextField with a placeholder' placeholder='Now I am a Placeholder' ariaLabel='Please enter text here' />
        <TextField label='TextField with an icon' iconProps={ { iconName: 'Calendar' } } />
        <TextField label='Textfield with an addon' addonString='https://' />
        <TextField label='Multiline TextField' multiline={ true } rows={ 4 } iconProps={ { iconName: 'Calendar' } } />
        <TextField label='Multiline TextField Unresizable' multiline={ true } resizable={ false } />
        <TextField label='Multiline TextField with auto adjust height' multiline={ true } autoAdjustHeight={ true } />
        <TextField label='Underlined TextField' underlined={ true } />
        <TextField label='Underlined TextField Disabled' underlined={ true } disabled={ true } />
        <TextField label='Borderless TextField' borderless={ true } placeholder='No borders here, folks.' />
        <TextField label='Multiline Borderless TextField' multiline={ true } rows={ 4 } borderless={ true } placeholder='Example TextField without a border' />
      </div>
    );
  }

  @autobind
  private _onChanged(text: string) {
    console.log(text);
  }
}
