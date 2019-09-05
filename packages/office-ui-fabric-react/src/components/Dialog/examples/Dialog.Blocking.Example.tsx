import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IDialogBlockingExampleState {
  hideDialog: boolean;
}

export class DialogBlockingExample extends React.Component<{}, IDialogBlockingExampleState> {
  public state: IDialogBlockingExampleState = { hideDialog: true };

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Missing Subject',
            subText: 'Do you want to send this message without a subject?'
          }}
          modalProps={{
            isBlocking: true,
            styles: { main: { maxWidth: 450 } }
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Send" />
            <DefaultButton onClick={this._closeDialog} text="Don't send" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };
}
