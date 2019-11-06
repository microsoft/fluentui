import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface ITextFieldErrorMessageExampleState {
  /**
   * Screen readers will read all errors on a page as soon as they are present,
   * making this demo potentially unpleasant when using a screen reader.
   * Not rendering the controls by default makes for a more pleasant experience.
   */
  showFields: boolean;
}

export class TextFieldErrorMessageExample extends React.Component<{}, ITextFieldErrorMessageExampleState> {
  public state: ITextFieldErrorMessageExampleState = {
    showFields: false
  };

  public render(): JSX.Element {
    const { showFields } = this.state;

    const stackTokens: IStackTokens = {
      childrenGap: 20,
      maxWidth: 350
    };

    return (
      <Stack tokens={stackTokens}>
        <Toggle label="Show text fields" inlineLabel checked={showFields} onChange={this._toggleShowFields} />
        {showFields && (
          <>
            <strong>Hint: the input length must be less than 3.</strong>

            <TextField label="String-based validation" onGetErrorMessage={this._getErrorMessage} />
            <TextField label="Promise-based validation" onGetErrorMessage={this._getErrorMessagePromise} />
            <TextField
              label="String-based validation on render"
              defaultValue="Shows an error message on render"
              onGetErrorMessage={this._getErrorMessage}
            />
            <TextField
              label="String-based validation only on change"
              defaultValue="Validates only on input change, not on render"
              onGetErrorMessage={this._getErrorMessage}
              validateOnLoad={false}
            />
            <TextField
              label="Promise-based validation"
              defaultValue="Shows an error message 5 seconds after render"
              onGetErrorMessage={this._getErrorMessagePromise}
            />
            <TextField
              label="Both description and error message"
              defaultValue="Shows description and error message on render"
              description="Field description"
              onGetErrorMessage={this._getErrorMessage}
            />
            <TextField
              label="Deferred string-based validation"
              placeholder="Validates after user stops typing for 2 seconds"
              onGetErrorMessage={this._getErrorMessage}
              deferredValidationTime={2000}
            />
            <TextField
              label="Validates only on focus and blur"
              placeholder="Validates only on input focus and blur"
              onGetErrorMessage={this._getErrorMessage}
              validateOnFocusIn
              validateOnFocusOut
            />
            <TextField
              label="Validates only on blur"
              placeholder="Validates only on input blur"
              onGetErrorMessage={this._getErrorMessage}
              validateOnFocusOut
            />
            <TextField
              label="Underlined field:"
              defaultValue="This value is too long"
              underlined
              onGetErrorMessage={this._getErrorMessage}
            />
            <TextField
              label="Uses the errorMessage property to set an error state"
              placeholder="This field always has an error"
              errorMessage="This is a statically set error message"
            />
          </>
        )}
      </Stack>
    );
  }

  private _toggleShowFields = (_: any, displayEnabled: boolean) => {
    this.setState({ showFields: displayEnabled });
  };

  private _getErrorMessage = (value: string): string => {
    return value.length < 3 ? '' : `Input value length must be less than 3. Actual length is ${value.length}.`;
  };

  private _getErrorMessagePromise = (value: string): Promise<string> => {
    return new Promise(resolve => {
      // resolve the promise after 3 second.
      setTimeout(() => resolve(this._getErrorMessage(value)), 5000);
    });
  };
}
