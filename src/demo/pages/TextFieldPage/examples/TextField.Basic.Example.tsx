import * as React from 'react';
import {
  autobind,
  TextField
} from '../../../../index';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField label='Default TextField' onChanged={ this._onChanged } />
        <TextField label='Disabled TextField' disabled={ true } />
        <TextField label='Required TextField' required={ true } />
        <TextField label='TextField with a placeholder' placeholder='Now I am a Placeholder' ariaLabel='Please enter text here' />
        <TextField label='Multiline TextField' multiline />
        <TextField label='Multiline TextField Unresizable' multiline resizable={ false } />
        <TextField label='Underlined TextField' underlined />
      </div>
    );
  }

  @autobind
  private _onChanged(text) {
    console.log(text);
  }
}
