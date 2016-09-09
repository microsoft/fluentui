import * as React from 'react';
import {
  TextField
} from '../../../../index';

export class TextFieldBasicExample extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this._handleChanged = this._handleChanged.bind(this);
  }

  public render() {
    return (
      <div>
        <TextField label='Default TextField' />
        <TextField label='Disabled TextField' disabled />
        <TextField label='Multiline TextField' multiline />
        <TextField label='Multiline TextField Unresizable' multiline resizable={ false } />
        <TextField label='Underlined TextField' underlined />
        <TextField label='TextField with placeholder' placeholder='placeholder text' />
        <TextField label='TextField with description'
          description='The description of the TextField' />
        <TextField label='TextField with an error message'
          errorMessage='The value in invalid!' />
        <TextField label='TextField with default value'
          defaultValue='foo' />
        <TextField label='Controlled TextField'
          value={ this.state.value }
          onChanged={ this._handleChanged } />
      </div>
    );
  }

  private _handleChanged(value: string) {
    this.setState({ value });

    console.log('Value of TextField changed:', value);
  }
}
