import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  Button,
  ButtonType,
  ChoiceGroup
} from '../../../../index';

export class DialogCloseExample extends React.Component<any, any> {

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
          closeButtonAriaLabel='Close'
          topButtonsProps={ [{
            key: 'More',
            buttonType: ButtonType.icon,
            icon: 'More',
            ariaLabel: 'More',
            onClick: this._onMoreButtonClicked.bind(this)
          }] }
          >
          <ChoiceGroup
            options={ [
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              }
            ] }
            onChanged={ this._onChoiceChanged }
            />
          <DialogFooter>
            <Button buttonType={ ButtonType.primary } onClick={ this._closeDialog.bind(this) }>Save</Button>
            <Button onClick={ this._closeDialog.bind(this) }>Cancel</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showDialog() {
    this.setState({ showDialog: true });
  }

  private _closeDialog() {
    this.setState({ showDialog: false });
  }

  private _onChoiceChanged() {
    console.log('Choice option change');
  }

  private _onMoreButtonClicked() {
    console.log('More button clicked');
  }
}
