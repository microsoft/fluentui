import * as React from 'react';
import { ScreenReaderAlert } from 'office-ui-fabric-react/lib/ScreenReaderAlert';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const alertMessage: string = `This message should be read after the content of button B.`;

export interface IScreenReaderAlertAfterExampleState {
  screenReaderIndicator?: number;
}

export class ScreenReaderAlertAfterExample extends React.Component<any, IScreenReaderAlertAfterExampleState> {
  private _lateFocusedButton: Button;

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
        <Button
          onClick={ this._onButtonClicked }
          buttonType={ ButtonType.primary }
        >
          { 'Button A: Move focus to button B and read message' }
        </Button>
        <Button ref={ (instance) => this._lateFocusedButton = instance }>
          { 'Button B: Get focused when first button is clicked' }
        </Button>
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
