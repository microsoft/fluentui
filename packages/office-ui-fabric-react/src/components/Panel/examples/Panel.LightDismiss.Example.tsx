import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';

export class PanelLightDismissExample extends React.Component<any, any> {

  constructor() {
    super();

    this.state = { showPanel: false };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          text='Open panel'
          onClick={ this._showPanel }
        />
        <Panel
          isOpen={ this.state.showPanel }
          isLightDismiss={ true }
          headerText='Light Dismiss Panel'
          onDismiss={ this._hidePanel }
        >
          <span>Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.</span>
        </Panel>
      </div>
    );
  }

  @autobind
  private _showPanel(): void {
    this.setState({ showPanel: true });
  }

  @autobind
  private _hidePanel(): void {
    this.setState({ showPanel: false });
  }
}
