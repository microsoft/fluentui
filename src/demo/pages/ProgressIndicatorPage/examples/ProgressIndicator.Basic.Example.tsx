import * as React from 'react';
import {
  ProgressIndicator
} from '../../../../index';
import { Async } from '../../../../utilities/Async/Async';

export interface IProgressIndicatorBasicExampleState {
    percentComplete: number;
}

const INTERVAL_DELAY: number = 100;
const INTERVAL_INCREMENT: number = .01;
const RESTART_WAIT_TIME: number = 2000;

export class ProgressIndicatorBasicExample extends React.Component<any, IProgressIndicatorBasicExampleState> {

  private _interval: number;
  private _async: Async;

  constructor() {
    super();

    this._async = new Async(this);

    this.state = {
        percentComplete: 0
    };
    this._startProgressDemo = this._startProgressDemo.bind(this);
  }

  public componentDidMount() {
    this._startProgressDemo();
  }

  public componentWillUnmount() {
    this._async.dispose();
  }

  public render() {
    let { percentComplete } = this.state;

    return (
      <ProgressIndicator
        label='Example title'
        description='Example description'
        percentComplete={ percentComplete } />
    );
  }

  private _startProgressDemo() {
    // reset the demo
    this.setState({
        percentComplete: 0
    });

    // update progress
    this._interval = this._async.setInterval(() => {
      let percentComplete = this.state.percentComplete + INTERVAL_INCREMENT;

      // once complete, set the demo to start again
      if (percentComplete >= 1.0) {
        percentComplete = 1.0;
        this._async.clearInterval(this._interval);
        this._async.setTimeout(this._startProgressDemo, RESTART_WAIT_TIME);
      }
      this.setState({
          percentComplete: percentComplete
      });
    }, INTERVAL_DELAY);
  }
}
