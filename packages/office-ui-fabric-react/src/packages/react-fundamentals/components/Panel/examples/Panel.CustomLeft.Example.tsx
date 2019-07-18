import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelCustomLeftExample extends React.Component<
  {},
  {
    showPanel: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showPanel: false
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton text="Open Panel" secondaryText="Opens the Sample Panel" onClick={this._showPanel} />
        <Panel
          isOpen={this.state.showPanel}
          onDismiss={this._closePanel}
          type={PanelType.customNear}
          customWidth="888px"
          headerText="Custom Left Panel with custom 888px width"
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
