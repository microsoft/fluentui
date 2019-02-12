import { KeyCodes } from '@uifabric/utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import * as React from 'react';

export interface IPanelPreventDefaultExampleState {
  showPanel: boolean;
  allowEsc: boolean;
}

export class PanelPreventDefaultExample extends React.Component<{}, IPanelPreventDefaultExampleState> {
  public state = {
    showPanel: false,
    allowEsc: true
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <Panel isOpen={this.state.showPanel} type={PanelType.smallFixedNear} onDismiss={this._hidePanel} headerText="Panel">
          <div>Hitting escape inside the text area will not close the Panel</div>
          <textarea onKeyDown={this._onKeyDown} />

          <Toggle checked={this.state.allowEsc} onChange={this._toggleAllowEsc} label="Allow ESC key to close panel" />
        </Panel>
      </div>
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.keyCode === KeyCodes.escape) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  private _toggleAllowEsc = () => {
    this.setState({ allowEsc: !this.state.allowEsc });
  };

  private _hidePanel = (ev?: React.KeyboardEvent<HTMLElement>) => {
    if (ev && ev.keyCode === KeyCodes.escape && !this.state.allowEsc) {
      ev.preventDefault();
      return;
    }

    this.setState({ showPanel: false });
  };

  private _showPanel = (): void => {
    this.setState({ showPanel: true });
  };
}
