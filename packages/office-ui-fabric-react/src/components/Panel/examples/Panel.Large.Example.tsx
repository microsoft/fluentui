import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

interface IState {
  showPanel: boolean;
}

export class PanelLargeExample extends React.Component<{}, IState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._onShowPanel} text="Open Panel" />
        <Panel isOpen={this.state.showPanel} onDismiss={this._onDismissPanel} type={PanelType.large} headerText="Large Panel">
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _onDismissPanel = () => {
    this.setState({ showPanel: false });
  };

  private _onShowPanel = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ showPanel: true });
  };
}
