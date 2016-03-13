import * as React from 'react';
import {
  TextField
} from '../../../../components/index';

export default class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField label='Default TextField'/>
        <TextField label='TextField with a placeholder' placeholder='Now I am a Placeholder' />
        <TextField label='Multiline TextField' multiline />
        <TextField label='Underlined TextField' underlined />
      </div>
    );
  }
}
