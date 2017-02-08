import * as React from 'react';
import { ScreenReaderAlert } from 'office-ui-fabric-react/lib/ScreenReaderAlert';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

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

    this._onButtonClicked = this._onButtonClicked.bind(this);
    this._startLoadingInterval = this._startLoadingInterval.bind(this);
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

  private _onButtonClicked(): void {
    if (this.state.loadingStatus === 0) {
      this._startLoadingInterval();
    }
  }

  private _startLoadingInterval(): void {
    this.setState({
      loadingStatus: 1
    });

    const interval: number = window.setInterval(() => {
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
