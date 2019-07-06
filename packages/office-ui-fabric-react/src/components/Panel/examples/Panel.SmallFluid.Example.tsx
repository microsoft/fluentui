import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelSmallFluidExampleState {
  showPanel: boolean;
}

export class PanelSmallFluidExample extends React.Component<{}, IPanelSmallFluidExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFluid}
          onDismiss={this._hidePanel}
          headerText="Panel - Small, right-aligned, fixed"
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _showPanel = () => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };
}
