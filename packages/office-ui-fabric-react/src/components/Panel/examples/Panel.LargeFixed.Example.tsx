import * as React from 'react';
import { autobind } from '../../../Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelLargeFixedExample extends React.Component<any, any> {

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
          description='Opens the Sample Panel'
          onClick={ this._showPanel }
          text='Open Panel'
        />
        <Panel
          isOpen={ this.state.showPanel }
          onDismiss={ this._closePanel }
          type={ PanelType.largeFixed }
          headerText='Large Panel'
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
