import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as styles from './ProgressIndicator.Example.scss';

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
    const percentTitle = Math.floor(Math.min(100, Math.max(0, percentComplete * 100)));

    return (
      <div>
        <ProgressIndicator
          label={percentTitle + '% complete'}
          description="Example description"
          percentComplete={percentComplete}
        />
        <DefaultButton text="Reset" onClick={this._resetProgressDemo} className={styles.buttonControls} />
        <DefaultButton text="Start" onClick={this._startProgressDemo} className={styles.buttonControls} />
      </div>
    );
  }

  private _resetProgressDemo = (): void => {
    this.setState({ percentComplete: 0 });
    this._async.clearInterval(this._interval);
  };

  private _startProgressDemo = (): void => {
    this.setState({ percentComplete: 0 });
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
