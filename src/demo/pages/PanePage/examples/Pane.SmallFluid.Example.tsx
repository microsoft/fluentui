import * as React from 'react';
import {
  Button,
  Pane,
  PaneContent,
  PaneType,
  WrappedContent
} from '../../../../index';

export class PaneSmallFluidExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPane: false,
      mainContent: null
    };
  }

  // ref={(element) => this.state.mainContent = element}
  public render() {
    return (
      <div>
        <Button description='Opens the Sample Pane' onClick={ this._showPane.bind(this) }>Open Pane</Button>
      </div>
    );
  }

  private _showPane() {
    this.setState({ showPane: true });
  }
  private _closePane() {
    this.setState({ showPane: false });
  }
}
