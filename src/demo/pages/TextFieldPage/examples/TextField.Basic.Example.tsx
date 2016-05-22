import * as React from 'react';
import {
  TextField
} from '../../../../index';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField label='Default TextField' />
        <TextField label='Disabled TextField' disabled />
        <TextField label='TextField with a placeholder' placeholder='Now I am a Placeholder' ariaLabel='Please enter text here' />
        <TextField label='Multiline TextField' multiline />
        <TextField label='Underlined TextField' underlined />
      </div>
    );
  }
}
