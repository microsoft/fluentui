import * as React from 'react';
import {
  Pane,
  PaneType,
  Button
} from '../../../../index';

export class PaneExtraLargeExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPane: false
    };
  }

  public render() {
    return (
      <div>
        <Pane
          isOpen={ this.state.showPane }
          onDismiss= { this._closePane.bind(this) }
          type={ PaneType.extraLarge }
          headerText='Extra Large Pane'
          closeButtonAriaLabel='Close'
          >
          <div>
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
            [Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block][Main content block]
          </div>
          <span className='ms-font-m'>Pane content goes here.</span>
        </Pane>
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
