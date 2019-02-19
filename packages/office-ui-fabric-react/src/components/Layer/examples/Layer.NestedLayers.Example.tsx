import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

export interface ILayerNestedLayersExampleState {
  hideDialog: boolean;
  showPanel: boolean;
}

export class LayerNestedLayersExample extends React.Component<{}, ILayerNestedLayersExampleState> {
  public state = {
    hideDialog: true,
    showPanel: false
  };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._onShowPanel} text="Open Panel" />
        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this._dismissPanel}
          headerText="This panel makes use of Layer and FocusTrapZone. Focus should be trapped in the panel."
          closeButtonAriaLabel="Close"
        >
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
          <Dialog
            hidden={this.state.hideDialog}
            onDismiss={this._dismissDialog}
            isBlocking={true}
            dialogContentProps={{
              type: DialogType.normal,
              title: 'This dialog uses Modal, which also makes use of Layer and FocusTrapZone. Focus should be trapped in the dialog.',
              subText: "Focus will move back to the panel if you press 'OK' or 'Cancel'."
            }}
            modalProps={{
              titleAriaId: 'myLabelId',
              subtitleAriaId: 'mySubTextId',
              isBlocking: false,
              containerClassName: 'ms-dialogMainOverride'
            }}
          >
            <DialogFooter>
              <PrimaryButton onClick={this._dismissDialog} text="OK" />
              <DefaultButton onClick={this._dismissDialog} text="Cancel" />
            </DialogFooter>
          </Dialog>
        </Panel>
      </div>
    );
  }

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _dismissDialog = (): void => {
    this.setState({ hideDialog: true });
  };

  private _dismissPanel = (): void => {
    this.setState({ showPanel: false });
  };

  private _onShowPanel = (): void => {
    this.setState({ showPanel: true });
  };
}
