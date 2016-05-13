import * as React from 'react';
import {
  Panel,
  PanelType,
  Button
} from '../../../../index';

export default class PanelMediumExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPanel: false
    };
  }

  public render() {
    return (
      <div>
        <Button description='Opens the Sample Panel' onClick={ this._showPanel.bind(this) }>Open Panel</Button>
        <Panel
          isOpen={ this.state.showPanel }
          onDismiss= { this._closePanel.bind(this) }
          type={ PanelType.medium }
          headerText='Medium Panel'
        >
          <span className='ms-font-m'>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _showPanel() {
    this.setState( {showPanel: true } );
  }
  private _closePanel() {
    this.setState( {showPanel: false } );
  }
}
