import * as React from 'react';
import {
  TextField
} from '../../../../components/index';

export default class TextFieldBasicExample extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);

    this._getErrorMessage = this._getErrorMessage.bind(this);
  }

  public render() {
    return (
      <div>
        <TextField label='Default TextField' />
        <TextField label='Disabled TextField' disabled />
        <TextField label='TextField with a placeholder' placeholder='Now I am a Placeholder' ariaLabel='Please enter text here' />
        <TextField
          label='TextField with a validator. Hint: the length of the input string must be less than 3.'
          onGetErrorMessage={this._getErrorMessage}
        />
        <TextField label='Multiline TextField' multiline />
        <TextField label='Underlined TextField' underlined />
      </div>
    );
  }

  private _getErrorMessage(value: string): Promise<any> {
    if (value.length < 3) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('The length of the input string is greater than or equal to 3.'));
    }
  }
}
