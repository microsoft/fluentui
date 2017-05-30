import * as React from 'react';
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
          onClick={ () => this.setState({ showPanel: true }) }
        />
        <Panel
          isOpen={ this.state.showPanel }
          isLightDismiss={ true }
          headerText='Light Dismiss Panel'
          onDismiss={ () => this.setState({ showPanel: false }) }
        >
          <span>Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.</span>
        </Panel>
      </div>
    );
  }
}
