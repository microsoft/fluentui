import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelSmallLeftExampleState {
  showPanel: boolean;
}

export class PanelSmallLeftExample extends React.Component<{}, IPanelSmallLeftExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedNear}
          onDismiss={this._hidePanel}
          headerText="Panel - Small, left-aligned, fixed"
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
