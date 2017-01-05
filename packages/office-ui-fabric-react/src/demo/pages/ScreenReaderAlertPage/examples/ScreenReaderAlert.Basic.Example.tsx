import * as React from 'react';
import {
  ScreenReaderAlert,
  ReadingMode,
  Button,
  ButtonType,
  Toggle,
  autobind
} from '../../../../index';

const alertMessages: string[] = [
  '',
  'Click the button to read messages.',
  'It changes every click.',
  'It will be read out by screen reader every click.'
];

export interface IScreenReaderAlertBasicExampleState {
  shouldRead?: boolean;
  messageIndex?: number;
}

export class ScreenReaderAlertBasicExample extends React.Component<any, IScreenReaderAlertBasicExampleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      shouldRead: true,
      messageIndex: 0
    };
  }

  public render() {
    const currentMessage: string = alertMessages[this.state.messageIndex];

    return (
      <div>
        <ScreenReaderAlert readingMode={ this.state.shouldRead ? ReadingMode.ReadImmediately : ReadingMode.DoNotRead }>
          { currentMessage }
        </ScreenReaderAlert>
        <Toggle
          defaultChecked={ true }
          onChanged={ this._onToggleChanged }
          label='Should read screen reader alert'
          onText='Enabled'
          offText='Disabled'
          />
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

  @autobind
  private _onToggleChanged(checked: boolean): void {
    this.setState({
      shouldRead: checked
    });
  }
}
