import * as React from 'react';
import {
  ProgressIndicator
} from '../../../../components/index';

export interface IProgressIndicatorBasicExampleState {
    percentComplete: number;
}

export default class ProgressIndicatorBasicExample extends React.Component<any, IProgressIndicatorBasicExampleState> {
  private _interval: number;

  constructor() {
    super();

    this.state = {
        percentComplete: 0
    };
  }

  public componentDidMount() {
    this._interval = setInterval(() => {
      this.setState({
          percentComplete: (this.state.percentComplete + .1) % 1
      });
    }, 250);
  }

  public componentWillUnmount() {
    clearInterval(this._interval);
  }

  public render() {
    let { percentComplete } = this.state;

    return (
      <ProgressIndicator
        title='Example title'
        description='Example description'
        percentComplete={ percentComplete } />
    );
  }
}
