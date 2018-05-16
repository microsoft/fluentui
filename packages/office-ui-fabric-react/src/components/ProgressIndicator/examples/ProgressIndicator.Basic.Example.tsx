import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IProgressIndicatorBasicExampleState {
  percentComplete: number;
}

const INTERVAL_DELAY = 100;
const INTERVAL_INCREMENT = 0.01;

export class ProgressIndicatorBasicExample extends React.Component<{}, IProgressIndicatorBasicExampleState> {
  private _interval: number;
  private _async: Async;

  constructor(props: {}) {
    super(props);

    this._async = new Async(this);

    this.state = {
      percentComplete: 0
    };
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { percentComplete } = this.state;

    return (
      <div>
        <ProgressIndicator label="Example title" description="Example description" percentComplete={percentComplete} />
        <DefaultButton text="Reset" onClick={this._resetProgress} />
        <DefaultButton text="Start" onClick={this._startProgressDemo} />
      </div>
    );
  }

  private _resetProgress = (): void => {
    this.setState({ percentComplete: 0 });
    this._async.clearInterval(this._interval);
  };

  private _startProgressDemo = (): void => {
    this._interval = this._async.setInterval(() => {
      let percentComplete = this.state.percentComplete + INTERVAL_INCREMENT;

      if (percentComplete >= 1.0) {
        percentComplete = 1.0;
        this._async.clearInterval(this._interval);
      }

      this.setState({
        percentComplete: percentComplete
      });
    }, INTERVAL_DELAY);
  };
}
