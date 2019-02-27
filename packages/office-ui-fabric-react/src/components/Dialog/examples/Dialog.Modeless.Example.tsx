import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IDialogModelessExampleState {
  hideDialog: boolean;
}

export class DialogModelessExample extends React.Component<{}, IDialogModelessExampleState> {
  public state: IDialogModelessExampleState = {
    hideDialog: true
  };

  public render() {
    return (
      <div>
        <input type="text" placeholder="Focus Me While Open" />
        <div>
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
          <DefaultButton secondaryText="Closes the Sample Dialog" onClick={this._closeDialog} text="Close Dialog" />
        </div>
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          }}
          modalProps={{
            containerClassName: 'ms-dialogMainOverride',
            isModeless: true
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Save" />
            <DefaultButton onClick={this._closeDialog} text="Cancel" />
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
