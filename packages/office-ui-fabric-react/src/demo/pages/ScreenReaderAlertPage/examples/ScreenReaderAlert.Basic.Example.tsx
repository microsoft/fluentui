import * as React from 'react';
import {
  ScreenReaderAlert,
  Button,
  ButtonType,
  autobind
} from '../../../../index';

const alertMessages: string[] = [
  '',
  'Click the button to read messages.',
  'It changes every click.',
  'It will be read out by screen reader every click.'
];

export interface IScreenReaderAlertBasicExampleState {
  messageIndex: number;
}

export class ScreenReaderAlertBasicExample extends React.Component<any, IScreenReaderAlertBasicExampleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      messageIndex: 0
    };
  }

  public render() {
    const currentMessage: string = alertMessages[this.state.messageIndex];

    return (
      <div>
        <ScreenReaderAlert>
          { currentMessage }
        </ScreenReaderAlert>
        <Button
          onClick={ this._onButtonClicked }
          buttonType={ ButtonType.primary }
          >
          { 'Read message' }
        </Button>
        {
          currentMessage && (
            <p>Message: <strong>{ currentMessage }</strong></p>
          )
        }
      </div>
    );
  }

  @autobind
  private _onButtonClicked(): void {
    const prevIndex: number = this.state.messageIndex;
    const nextIndex: number = (prevIndex) % 3 + 1;

    this.setState({
      messageIndex: nextIndex
    });
  }
}
