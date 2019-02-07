import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IState {
  showPanel: boolean;
}

export class PanelNonModalExample extends React.Component<{}, IState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton text="Open panel" onClick={this._showPanel} />
        <Panel
          isBlocking={false}
          isOpen={this.state.showPanel}
          onDismiss={this._closePanel}
          type={PanelType.medium}
          headerText="Non-Modal Panel"
          closeButtonAriaLabel="Close"
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _showPanel = (): void => {
    this.setState({ showPanel: true });
  };

  private _closePanel = (): void => {
    this.setState({ showPanel: false });
  };
}
