import * as React from 'react';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export interface IFocusTrapZoneDialogInPanelExampleState {
  hideDialog: boolean;
  showPanel: boolean;
}

export class FocusTrapZoneDialogInPanelExample extends React.Component<{}, IFocusTrapZoneDialogInPanelExampleState> {
  public state: IFocusTrapZoneDialogInPanelExampleState = {
    hideDialog: true,
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton text="Open Panel" secondaryText="Opens the Sample Panel" onClick={this._onShowPanel} />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._onClosePanel}
          headerText="This panel makes use of FocusTrapZone. Focus should be trapped in the panel."
          closeButtonAriaLabel="Close"
        >
          <DefaultButton text="Open Dialog" secondaryText="Opens the Sample Dialog" onClick={this._showDialog} />
          <Dialog
            hidden={this.state.hideDialog}
            onDismiss={this._closeDialog}
            isBlocking={true}
            dialogContentProps={{
              type: DialogType.normal,
              title: 'This dialog also makes use of FocusTrapZone. Focus should be trapped in the dialog.',
              subText: "Focus will move back to the panel if you press 'OK' or 'Cancel'."
            }}
            modalProps={{
              titleAriaId: 'myLabelId',
              subtitleAriaId: 'mySubTextId',
              isBlocking: false,
              styles: { main: { maxWidth: 450 } }
            }}
          >
            <DialogFooter>
              <PrimaryButton onClick={this._closeDialog} text="OK" />
              <DefaultButton onClick={this._closeDialog} text="Cancel" />
            </DialogFooter>
          </Dialog>
        </Panel>
      </div>
    );
  }

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };

  private _onClosePanel = (): void => {
    this.setState({ showPanel: false });
  };

  private _onShowPanel = (): void => {
    this.setState({ showPanel: true });
  };
}
