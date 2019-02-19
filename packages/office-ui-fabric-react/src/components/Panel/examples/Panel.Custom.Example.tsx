import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelCustomExampleState {
  showPanel: boolean;
}

export class PanelCustomExample extends React.Component<{}, IPanelCustomExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton text="Open Panel" secondaryText="Opens the Sample Panel" onClick={this._showPanel} />
        <Panel
          isOpen={this.state.showPanel}
          onDismiss={this._hidePanel}
          type={PanelType.custom}
          customWidth="888px"
          headerText="Custom Panel with custom 888px width"
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
