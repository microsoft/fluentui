import * as React from 'react';
import { autobind } from '../../../Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelCustomExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showPanel: false
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          text='Open Panel'
          description='Opens the Sample Panel'
          onClick={ this._showPanel }
        />
        <Panel
          isOpen={ this.state.showPanel }
          onDismiss={ this._closePanel }
          type={ PanelType.custom }
          customWidth='888px'
          headerText='Custom Panel with custom 888px width'
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  @autobind
  private _showPanel() {
    this.setState({ showPanel: true });
  }

  @autobind
  private _closePanel() {
    this.setState({ showPanel: false });
  }
}
