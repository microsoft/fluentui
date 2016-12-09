import * as React from 'react';
import {
  ScreenReaderAlert,
  Button,
  ButtonType,
  Spinner,
  autobind
} from '../../../../index';

const loadingMessages: string[] = [
  '',
  'Connecting',
  'Downloading',
  'Loaded successfully'
];

export interface IScreenReaderAlertSpinnerExampleState {
  loadingStatus: number;
}

export class ScreenReaderAlertSpinnerExample extends React.Component<any, IScreenReaderAlertSpinnerExampleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loadingStatus: 0
    };
  }

  public render() {
    const currentMessage: string = loadingMessages[this.state.loadingStatus];

    return (
      <div>
        <ScreenReaderAlert >
          { currentMessage }
        </ScreenReaderAlert>
        <Button
          onClick={ this._onButtonClicked }
          buttonType={ ButtonType.primary }
          >
          { 'Read spinner status.' }
        </Button>
        { this.state.loadingStatus > 0 && (
          <Spinner label={ currentMessage } />
        ) }
      </div>
    );
  }

  @autobind
  private _onButtonClicked(): void {
    if (this.state.loadingStatus === 0) {
      this._startLoadingInterval();
    }
  }

  @autobind
  private _startLoadingInterval(): void {
    this.setState({
      loadingStatus: 1
    });

    const interval: NodeJS.Timer = setInterval(() => {
      const currentStatus: number = this.state.loadingStatus;
      const newStatus: number = (currentStatus + 1) % 4;
      this.setState({
        loadingStatus: newStatus
      });

      if (newStatus === 0) {
        clearInterval(interval);
      }
    }, 3000);
  }
}
