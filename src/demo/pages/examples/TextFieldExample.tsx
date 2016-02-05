import * as React from 'react';
import { TextField } from '../../../index';
import { Label } from '../../../index';

export default class TextFieldExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='TextFieldExample'>
        <h1>TextField</h1>

        <h2>Default text field</h2>
        <TextField label="Some Label" />
        
        <h2>Placeholder</h2>
        <TextField label="Now I am a Placeholder" placeholder />
        
        <h2>Placeholder with Label</h2>
        <Label>A Label</Label>
        <TextField label="A Placeholder" placeholder />
        
        <h2>Multiline</h2>
        <TextField label="Label" multiline />
        
        <h2>Underlined</h2>
        <TextField label="Label" underlined />
      </div>
    );
  }

}
