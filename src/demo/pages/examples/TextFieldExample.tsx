import * as React from 'react';
import TextField from '../../../components/textField/TextField';
import Label from '../../../components/label/Label';

export default class TextFieldExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='TextFieldExample'>
        <h1>TextField</h1>

        <h2>Default text field</h2>
        <TextField label="Some Label" />

        <h2>Placeholder</h2>
        <TextField placeholder="Now I am a Placeholder" />

        <h2>Placeholder with Label</h2>
        <TextField placeholder="A Placeholder" label="A Label" />

        <h2>Multiline</h2>
        <TextField label="Label" multiline />

        <h2>Underlined</h2>
        <TextField label="Label" underlined />
      </div>
    );
  }

}
