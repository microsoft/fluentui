import { Promise } from 'es6-promise';
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { NumberTextField } from './NumberTextField';

export class TextFieldErrorMessageExample extends React.Component<{}, {}> {
  public constructor(props: any) {
    super(props);

    this._getErrorMessage = this._getErrorMessage.bind(this);
    this._getErrorMessagePromise = this._getErrorMessagePromise.bind(this);
  }

  public render() {
    return (
      <div>
        <TextField
          label='TextField with a string-based validator. Hint: the length of the input string must be less than 3.'
          onGetErrorMessage={ this._getErrorMessage }
        />
        <TextField
          label='TextField with a Promise-based validator. Hint: the length of the input string must be less than 3.'
          onGetErrorMessage={ this._getErrorMessagePromise }
        />
        <TextField
          label='TextField with a string-based validator. Hint: the length of the input string must be less than 3.'
          value='It should show an error message under this error message on render.'
          onGetErrorMessage={ this._getErrorMessage }
        />
        <TextField
          label='TextField with a string-based validator. Hint: the length of the input string must be less than 3.'
          value='It will run validation only on input change and not on render.'
          onGetErrorMessage={ this._getErrorMessage }
          validateOnLoad={ false }
        />
        <TextField
          label='TextField with a Promise-based validator. Hint: the length of the input string must be less than 3.'
          value='It should show an error message under this error message 5 seconds after render.'
          onGetErrorMessage={ this._getErrorMessagePromise }
        />
        <TextField
          label='TextField has both description and error message.'
          value='It should show description and error message on render at the same time.'
          description='This field has description and error message both under the input box.'
          onGetErrorMessage={ this._getErrorMessage }
        />
        <TextField
          label='TextField with a string-based validator. Hint: the length of the input string must be less than 3.'
          placeholder='Validation will start after users stop typing for 2 seconds.'
          onGetErrorMessage={ this._getErrorMessage }
          deferredValidationTime={ 2000 }
        />
        <TextField
          label='TextField that validates only on focus and blur. Hint: the length of the input string must be less than 3.'
          placeholder='Validation will start only on input focus and blur'
          onGetErrorMessage={ this._getErrorMessage }
          validateOnFocusIn
          validateOnFocusOut
        />
        <TextField
          label='TextField that validates only on blur. Hint: the length of the input string must be less than 3.'
          placeholder='Validation will start only on input blur.'
          onGetErrorMessage={ this._getErrorMessage }
          validateOnFocusOut
        />
        <TextField label='Underlined TextField' underlined onGetErrorMessage={ this._getErrorMessage } />

        <TextField
          label='TextField that uses the errorMessage property to set an error state.'
          placeholder='This field always has an error.'
          errorMessage='This is a statically set error message.'
        />
        <NumberTextField
          label='Number TextField with valid initial value'
          initialValue='100'
        />
        <NumberTextField
          label='Number TextField with invalid initial value'
          initialValue='Not a number'
        />
      </div>
    );
  }

  private _getErrorMessage(value: string): string {
    return value.length < 3
      ? ''
      : `The length of the input value should less than 3, actual is ${value.length}.`;
  }

  private _getErrorMessagePromise(value: string): Promise<string> {
    return new Promise((resolve) => {
      // resolve the promise after 3 second.
      setTimeout(() => resolve(this._getErrorMessage(value)), 5000);
    });
  }
}
