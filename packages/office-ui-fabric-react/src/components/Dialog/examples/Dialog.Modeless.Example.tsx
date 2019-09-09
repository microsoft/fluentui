import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';

export interface IDialogModelessExampleState {
  hideDialog: boolean;
  isDraggable: boolean;
}

export class DialogModelessExample extends React.Component<{}, IDialogModelessExampleState> {
  public state: IDialogModelessExampleState = {
    hideDialog: true,
    isDraggable: false
  };

  private _dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu
  };

  public render() {
    const { hideDialog, isDraggable } = this.state;
    return (
      <div>
        <input type="text" placeholder="Focus Me While Open" />
        <div>
          <Checkbox label="Is draggable" onChange={this._toggleDraggable} checked={isDraggable} disabled={!hideDialog} />
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
          <DefaultButton secondaryText="Closes the Sample Dialog" onClick={this._closeDialog} text="Close Dialog" />
        </div>
        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Missing Subject',
            subText: 'Do you want to send this message without a subject?'
          }}
          modalProps={{
            styles: { main: { maxWidth: 450 } },
            isModeless: true,
            dragOptions: isDraggable ? this._dragOptions : undefined,
            onDismissed: this._closeDialog
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

  private _toggleDraggable = (): void => {
    this.setState({ isDraggable: !this.state.isDraggable });
  };
}
