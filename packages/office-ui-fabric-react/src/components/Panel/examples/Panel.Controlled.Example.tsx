import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelMediumExampleState {
  showPanel: boolean;
}

export class PanelControlledExample extends React.Component<{}, IPanelMediumExampleState> {
  public state = {
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel isOpen={this.state.showPanel} type={PanelType.medium} headerText="Controlled Panel">
          <p>
            Because <code>isOpen</code> is specified and <code>onDismiss</code> does not modify the example's <code>state</code>, clicking
            the button below is the only way to close this Panel.
          </p>

          <DefaultButton onClick={this._hidePanel} text="Close Panel" />
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
