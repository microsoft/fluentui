import * as React from 'react';
import { ScreenReaderAlert } from 'office-ui-fabric-react/lib/ScreenReaderAlert';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const alertMessage: string = `This is a string that never changes. Use 'indicator' props to repeat the same text.`;

export interface IScreenReaderAlertRepeatExampleState {
  screenReaderIndicator?: number;
  shouldChangeIndicator?: boolean;
}

export class ScreenReaderAlertRepeatExample extends React.Component<any, IScreenReaderAlertRepeatExampleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      screenReaderIndicator: 0,
      shouldChangeIndicator: true
    };

    this._onButtonClicked = this._onButtonClicked.bind(this);
    this._onToggleChanged = this._onToggleChanged.bind(this);
  }

  public render() {
    return (
      <div>
        <ScreenReaderAlert
          indicator={ this.state.screenReaderIndicator }
          text={ alertMessage }
        />
        <Toggle
          defaultChecked={ true }
          onChanged={ this._onToggleChanged }
          label='Changing indicator each rendering'
          onText='Enabled'
          offText='Disabled'
        />
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
      screenReaderIndicator: this.state.screenReaderIndicator + (this.state.shouldChangeIndicator ? 1 : 0)
    });
  }

  private _onToggleChanged(checked: boolean): void {
    this.setState({
      shouldChangeIndicator: checked
    });
  }
}
