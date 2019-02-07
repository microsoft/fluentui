import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

interface IState {
  showPanel: boolean;
}

export class PanelLargeFixedExample extends React.Component<{}, IState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel isOpen={this.state.showPanel} onDismiss={this._closePanel} type={PanelType.largeFixed} headerText="Large Panel">
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _showPanel = () => {
    this.setState({ showPanel: true });
  };

  private _closePanel = () => {
    this.setState({ showPanel: false });
  };
}
