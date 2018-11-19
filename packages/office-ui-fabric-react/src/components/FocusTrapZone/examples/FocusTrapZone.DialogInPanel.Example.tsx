import * as React from 'react';

/* tslint:disable:no-string-literal */

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

export interface IFocusTrapZoneDialogInPanelExampleState {
  hideDialog: boolean;
  showPanel: boolean;
}

export default class FocusTrapDialogInPanelExample extends React.Component<{}, IFocusTrapZoneDialogInPanelExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      hideDialog: true,
      showPanel: false
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._onShowPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._onClosePanel}
          headerText="This panel makes use of FocusTrapZone. Focus should be trapped in the panel."
          closeButtonAriaLabel="Close"
        >
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
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
              containerClassName: 'ms-dialogMainOverride'
            }}
          >
            {null /** You can also include null values as the result of conditionals */}
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
