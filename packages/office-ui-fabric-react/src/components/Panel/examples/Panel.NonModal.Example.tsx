import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelNonModalExample extends React.Component<{}, {
  showPanel: boolean;
}> {

  constructor(props: {}) {
    super(props);
    this.state = { showPanel: false };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          text='Open panel'
          onClick={ this._setShowPanel(true) }
        />
        <Panel
          isBlocking={ false }
          isOpen={ this.state.showPanel }
          onDismiss={ this._setShowPanel(false) }
          type={ PanelType.medium }
          headerText='Non-Modal Panel'
          closeButtonAriaLabel='Close'
        >
          <span>Content goes here.</span>
        </Panel>
      </div>
    );
  }

  private _setShowPanel = (showPanel: boolean): () => void => {
    return (): void => {
      this.setState({ showPanel });
    };
  }
}
