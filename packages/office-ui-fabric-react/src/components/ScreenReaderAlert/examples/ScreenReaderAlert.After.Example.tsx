import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ScreenReaderAlert } from 'office-ui-fabric-react/lib/ScreenReaderAlert';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const alertMessage: string = `This message should be read after the content of button B.`;

export interface IScreenReaderAlertAfterExampleState {
  screenReaderIndicator?: number;
}

export class ScreenReaderAlertAfterExample extends React.Component<any, IScreenReaderAlertAfterExampleState> {
  private _lateFocusedButton: HTMLButtonElement;

  constructor(props: any) {
    super(props);

    this.state = {
      screenReaderIndicator: 0
    };

    this._onButtonClicked = this._onButtonClicked.bind(this);
  }

  public render() {
    return (
      <div>
        <ScreenReaderAlert
          indicator={ this.state.screenReaderIndicator }
          text={ alertMessage }
        />
        <PrimaryButton onClick={ this._onButtonClicked }>
          { 'Button A: Trigger to move focus to button B and read message' }
        </PrimaryButton>
        <DefaultButton
          ref={ (instance) => this._lateFocusedButton = ReactDOM.findDOMNode(instance) as HTMLButtonElement }
        >
          { 'Button B: Get focused when first button is triggered' }
        </DefaultButton>
        <p>Message: <strong>{ alertMessage }</strong></p>
      </div>
    );
  }

  private _onButtonClicked(): void {
    if (this._lateFocusedButton && this._lateFocusedButton.focus) {
      this._lateFocusedButton.focus();
    }

    this.setState({
      screenReaderIndicator: this.state.screenReaderIndicator + 1
    });
  }
}
