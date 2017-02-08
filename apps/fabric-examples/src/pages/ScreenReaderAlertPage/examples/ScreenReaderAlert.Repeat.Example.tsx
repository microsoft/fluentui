import * as React from 'react';
import { ScreenReaderAlert } from 'office-ui-fabric-react/lib/ScreenReaderAlert';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';

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

    this._onButtonClicked = this._onButtonClicked.bind(this);
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

  private _onButtonClicked(): void {
    this.setState({
      screenReaderIndicator: this.state.screenReaderIndicator + 1
    });
  }
}
