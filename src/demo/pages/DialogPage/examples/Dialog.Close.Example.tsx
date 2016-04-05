import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  Button,
  ButtonType,
  ChoiceGroup
} from '../../../../components/index';

export default class DialogBasicExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showDialog: false
    };
  }

  public render() {
    return (
      <div>
        <Button description='Opens the Sample Dialog' onClick={ this._showDialog.bind(this) }>Open Dialog</Button>
        <Dialog
          isOpen={ this.state.showDialog }
          type={ DialogType.close }
          onDismiss={ this._closeDialog.bind(this) }
          title='All emails together'
          subText='Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          isBlocking={ false }
        >
          // Create any child elements that you want
          <ChoiceGroup
            options={ [
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                isChecked: true
              },
              {
                key: 'C',
                text: 'Option C',
                isDisabled: true
              }
            ] }
            onChanged={ this._onChoiceChanged }
          />
          // Use the Dialog Footer for buttons
          <DialogFooter>
            <Button buttonType={ ButtonType.primary } onClick={this._closeDialog.bind(this)}>Save</Button>
            <Button onClick={this._closeDialog.bind(this)}>Cancel</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showDialog() {
    this.setState( {showDialog: true } );
  }

  private _closeDialog() {
    this.setState( {showDialog: false } );
  }

  private _onChoiceChanged() {
    console.log( 'Choice option change' );
  }
}
