import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export class DialogBlockingExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      showDialog: false
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          description='Opens the Sample Dialog'
          onClick={ this._showDialog.bind(this) }
          text='Open Dialog'
        />
        <Dialog
          isOpen={ this.state.showDialog }
          type={ DialogType.normal }
          onDismiss={ this._closeDialog.bind(this) }
          title='All emails together'
          subText='Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          isBlocking={ true }
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
            <PrimaryButton onClick={ this._closeDialog.bind(this) } text='Save' />
            <DefaultButton onClick={ this._closeDialog.bind(this) } text='Cancel' />
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
}
