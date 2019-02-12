import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelLargeExampleState {
  showPanel: boolean;
}

export class PanelLargeExample extends React.Component<{}, IPanelLargeExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel isOpen={this.state.showPanel} onDismiss={this._hidePanel} type={PanelType.large} headerText="Large Panel">
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };

  private _showPanel = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ showPanel: true });
  };
}
