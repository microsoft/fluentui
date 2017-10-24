import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';

export class PanelLightDismissCustomExample extends React.Component<any, any> {

  constructor() {
    super();

    this.state = { showPanel: false, hideDialog: true };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          text='Open panel'
          onClick={ this._showPanel }
        />
        <Panel
          isOpen={ this.state.showPanel }
          isLightDismiss={ true }
          headerText='Light Dismiss Panel'
          onDismiss={ this._hidePanel }
          onLightDismissClick={ this._showDialog }
        >
          <span>Light Dismiss usage is meant for the Contextual Menu on mobile sized breakpoints.</span>
        </Panel>
        <Dialog
          hidden={ this.state.hideDialog }
          onDismiss={ this._closeDialog }
          dialogContentProps={ {
            type: DialogType.normal,
            title: 'Are you sure you want to close the panel?'
          } }
          modalProps={ {
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          } }
        >
          { null /** You can also include null values as the result of conditionals */ }
          <DialogFooter>
            <PrimaryButton onClick={ this._closeDialogAndHidePanel } text='Yes' />
            <DefaultButton onClick={ this._closeDialog } text='No' />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  @autobind
  private _showPanel(): void {
    this.setState({ showPanel: true });
  }

  @autobind
  private _hidePanel(): void {
    this.setState({ showPanel: false });
  }

  @autobind
  private _showDialog() {
    this.setState({ hideDialog: false });
  }

  @autobind
  private _closeDialog() {
    this.setState({ hideDialog: true });
  }

  @autobind
  private _closeDialogAndHidePanel() {
    this._hidePanel();
    this._closeDialog();
  }
}
