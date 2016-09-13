import * as React from 'react';
import {
  ContextualMenu, DirectionalHint, Button, getRTL,
  Panel,
  PanelType
} from '../../../../index';

export class PanelMediumExample extends React.Component<any, any> {

  public refs: {
    [key: string]: React.ReactInstance;
    headerCommandsButton: HTMLElement;
  };

  constructor() {
    super();
    this.state = {
      showPanel: false
    };
    this.state = {isContextMenuVisible: true};
    this._onClick = this._onClick.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
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
          <span className='ms-font-m'>Content goes here.</span><div>
                    <i className="ms-Icon ms-Icon--ellipsis"
                        onClick={ this._onClick }
                        ref='headerCommandsButton'
                        tabIndex={ 0 }>
                    </i>
                { this.state.isContextMenuVisible ? (
              <ContextualMenu
            targetElement={this.refs.headerCommandsButton}
                onDismiss={this._onDismiss}
                items={
                  [
                    {
                      key: 'upload',
                      icon: 'upload',
                      name: 'Upload',
                      title: 'Upload a file'
                    }
                  ]
                }
              />) : (null)}
          </div>
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

  private _onClick(event: any) {
    this.setState({isContextMenuVisible: true});
  }

  private _onDismiss(event: any) {
    this.setState({isContextMenuVisible: false});
  }
}
