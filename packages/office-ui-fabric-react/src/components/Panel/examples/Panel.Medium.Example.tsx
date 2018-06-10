import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export class PanelMediumExample extends React.Component<{}, {
  showPanel: boolean;
}> {

  constructor(props: {}) {
    super(props);
    this.state = { showPanel: false };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          secondaryText='Opens the Sample Panel'
          onClick={ this._setShowPanel(true) }
          text='Open Panel'
        />
        <Panel
          isOpen={ this.state.showPanel }
          onDismiss={ this._setShowPanel(false) }
          type={ PanelType.medium }
          headerText='Medium Panel'
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
