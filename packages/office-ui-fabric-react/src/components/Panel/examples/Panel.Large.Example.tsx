import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelLargeExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          description='Opens the Sample Panel'
          onClick={ () => this.setState({ showPanel: true }) }
          text='Open Panel'
        />
        <Panel
          isOpen={ this.state.showPanel }
          onDismiss={ () => this.setState({ showPanel: false }) }
          type={ PanelType.large }
          headerText='Large Panel'
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }
}
