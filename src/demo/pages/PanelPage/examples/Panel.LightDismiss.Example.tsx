import * as React from 'react';
import {
  Panel,
  Button
} from '../../../../index';

export default class PanelLightDismissExample extends React.Component<any, any> {

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
          isLightDismiss={ true }
          onDismiss= { this._closePanel.bind(this) }
          headerText='Light Dismiss Panel'
        >
          <span className='ms-font-m'>Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.</span>
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
