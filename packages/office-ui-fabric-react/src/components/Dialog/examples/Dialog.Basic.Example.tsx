import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import './Dialog.Basic.Example.scss';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export interface IDialogBasicExampleState {
  hideDialog: boolean;
  isDraggable: boolean;
}

export class DialogBasicExample extends React.Component<{}, IDialogBasicExampleState> {
  public state: IDialogBasicExampleState = {
    hideDialog: true,
    isDraggable: false
  };
  // Use getId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings without getId() and manually ensure uniqueness.)
  private _labelId: string = getId('dialogLabel');
  private _subTextId: string = getId('subTextLabel');

  public render() {
    const { hideDialog, isDraggable } = this.state;
    return (
      <div>
        <Checkbox label="Is Draggable" onChange={this._toggleDraggable} checked={isDraggable} />
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
        <label id={this._labelId} className="screenReaderOnly">
          My sample Label
        </label>
        <label id={this._subTextId} className="screenReaderOnly">
          My Sample description
        </label>

        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          }}
          modalProps={{
            titleAriaId: this._labelId,
            subtitleAriaId: this._subTextId,
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride',
            isDraggable: isDraggable
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

  private _toggleDraggable = (): void => {
    this.setState({ isDraggable: !this.state.isDraggable });
  };
}
