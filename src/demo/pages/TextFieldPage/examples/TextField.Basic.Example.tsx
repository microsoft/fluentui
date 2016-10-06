import * as React from 'react';
import {
  autobind,
  TextField
} from '../../../../index';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TextField
          label='Default TextField'
          onChanged={ this._onChanged }
          deferredValidationTime={ 250 }
          />

      </div>
    );
  }

  @autobind
  private _onChanged(text) {
    console.log(text);
    throw "hi";
  }
}
