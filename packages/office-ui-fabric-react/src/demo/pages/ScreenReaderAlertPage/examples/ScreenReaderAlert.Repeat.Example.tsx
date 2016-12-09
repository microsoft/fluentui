import * as React from 'react';
import {
  ScreenReaderAlert,
  Button,
  ButtonType,
  autobind
} from '../../../../index';

const alertMessage: string = `This is a string that never changes. Use 'indicator' props to repeat the same text.`;

export interface IScreenReaderAlertRepeatExampleState {
  screenReaderIndicator: number;
}

export class ScreenReaderAlertRepeatExample extends React.Component<any, IScreenReaderAlertRepeatExampleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      screenReaderIndicator: 0
    };
  }

  public render() {
    return (
      <div>
        <ScreenReaderAlert indicator={ this.state.screenReaderIndicator }>
          { alertMessage }
        </ScreenReaderAlert>
        <Button
          onClick={ this._onButtonClicked }
          buttonType={ ButtonType.primary }
          >
          { 'Read the same message' }
        </Button>
        <p>Message: <strong>{ alertMessage }</strong></p>
      </div>
    );
  }

  @autobind
  private _onButtonClicked(): void {
    this.setState({
      screenReaderIndicator: this.state.screenReaderIndicator + 1
    });
  }
}
