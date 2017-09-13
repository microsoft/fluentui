import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelSmallLeftExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = { showPanel: false };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          description='Opens the Sample Panel'
          onClick={ this._setShowPanel(true) }
          text='Open Panel'
        />
        <Panel
          isOpen={ this.state.showPanel }
          type={ PanelType.smallFixedNear }
          onDismiss={ this._setShowPanel(false) }
          headerText='Panel - Small, left-aligned, fixed'
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  @autobind
  private _setShowPanel(showPanel: boolean): () => void {
    return (): void => {
      this.setState({ showPanel });
    };
  }
}
