import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface INumberTextFieldProps {
  label: string;
  initialValue: string;
}

export interface INumberTextFieldState {
  value: string;
}

export class NumberTextField extends React.Component<INumberTextFieldProps, INumberTextFieldState> {
  constructor(props: INumberTextFieldProps) {
    super(props);

    this._restore = this._restore.bind(this);
    this._onChanged = this._onChanged.bind(this);
    this._validateNumber = this._validateNumber.bind(this);

    this.state = {
      value: props.initialValue
    };
  }

  public render(): JSX.Element {
    return (
      <div className='NumberTextField'>
        <TextField
          className='NumberTextField-textField'
          label={ this.props.label }
          value={ this.state.value }
          onChanged={ this._onChanged }
          onGetErrorMessage={ this._validateNumber }
        />
        <div className='NumberTextField-restoreButton'>
          <DefaultButton onClick={ this._restore }>
            Restore
          </DefaultButton>
        </div>
      </div>
    );
  }

  private _validateNumber(value: string): string {
    return isNaN(Number(value))
      ? `The value should be a number, actual is ${value}.`
      : '';
  }

  private _onChanged(value: string): void {
    return this.setState({
      value
    });
  }

  private _restore(): void {
    this.setState({
      value: this.props.initialValue
    });
  }
}
