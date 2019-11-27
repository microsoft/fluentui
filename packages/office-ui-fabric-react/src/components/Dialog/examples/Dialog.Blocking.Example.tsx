import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox, IComboBoxOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/index';

export interface IDialogBlockingExampleState {
  hideDialog: boolean;
  isDraggable: boolean;
}

const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' }
];

export class DialogBlockingExample extends React.Component<{}, IDialogBlockingExampleState> {
  public state: IDialogBlockingExampleState = { hideDialog: true, isDraggable: false };

  private _dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu
  };

  public render() {
    const { hideDialog, isDraggable } = this.state;
    return (
      <div>
        <Checkbox label="Is draggable" onChange={this._toggleDraggable} checked={isDraggable} />
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Missing Subject',
            subText: 'Do you want to send this message without a subject?'
          }}
          modalProps={{
            isBlocking: true,
            styles: { main: { maxWidth: 450 } },
            dragOptions: isDraggable ? this._dragOptions : undefined
          }}
        >
          <SpinButton
            defaultValue="0"
            label={'Number of subjects to add:'}
            min={0}
            max={100}
            step={1}
            iconProps={{ iconName: 'IncreaseIndentLegacy' }}
            // tslint:disable:jsx-no-lambda
            onFocus={() => console.log('onFocus called')}
            onBlur={() => console.log('onBlur called')}
            incrementButtonAriaLabel={'Increase value by 1'}
            decrementButtonAriaLabel={'Decrease value by 1'}
          />
          <ComboBox
            label="Sample subject lines you could add instead"
            placeholder="Select or type an option"
            allowFreeform
            autoComplete="on"
            options={INITIAL_OPTIONS}
          />
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
