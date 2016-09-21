import * as React from 'react';
import {
  Pane,
  PaneType,
  Button
} from '../../../../index';

export class PaneSmallLeftExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPane: false
    };
  }

  public render() {
    return (
      <div>
        <Button description='Opens the Sample Pane' onClick={ this._showPane.bind(this) }>Open Pane</Button>
        <Pane
          isOpen={ this.state.showPane }
          type={ PaneType.smallFixedNear }
          onDismiss= { this._closePane.bind(this) }
          headerText='Pane - Small, left-aligned, fixed'
        >
          <span className='ms-font-m'>Content goes here.</span>
        </Pane>
      </div>
    );
  }

  private _showPane() {
    this.setState( {showPane: true } );
  }
  private _closePane() {
    this.setState( {showPane: false } );
  }
}
