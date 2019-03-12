import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelNonModalExampleState {
  showPanel: boolean;
}

export class PanelNonModalExample extends React.Component<{}, IPanelNonModalExampleState> {
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
          onDismiss={this._hidePanel}
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

  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  };
}
