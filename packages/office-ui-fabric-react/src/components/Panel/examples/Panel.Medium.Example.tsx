import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelMediumExampleState {
  showPanel: boolean;
}

export class PanelMediumExample extends React.Component<{}, IPanelMediumExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel isOpen={this.state.showPanel} onDismiss={this._hidePanel} type={PanelType.medium} headerText="Medium Panel">
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
