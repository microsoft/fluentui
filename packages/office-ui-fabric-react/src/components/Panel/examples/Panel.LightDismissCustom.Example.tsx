import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface IPanelLightDismissCustomExampleState {
  showPanel: boolean;
  hideDialog: boolean;
}

export class PanelLightDismissCustomExample extends React.Component<{}, IPanelLightDismissCustomExampleState> {
  public state = {
    showPanel: false,
    hideDialog: true
  };

  public render() {
    return (
      <div>
        <DefaultButton text="Open panel" onClick={this._showPanel} />
        <Panel
          isOpen={this.state.showPanel}
          isLightDismiss={true}
          headerText="Light Dismiss Panel"
          onDismiss={this._hidePanel}
          onLightDismissClick={this._showDialog}
        >
          <span>Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.</span>
        </Panel>
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Are you sure you want to close the panel?'
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialogAndHidePanel} text="Yes" />
            <DefaultButton onClick={this._closeDialog} text="No" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showPanel = () => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };

  private _showDialog = () => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = () => {
    this.setState({ hideDialog: true });
  };

  private _closeDialogAndHidePanel = () => {
    this._hidePanel();
    this._closeDialog();
  };
}
