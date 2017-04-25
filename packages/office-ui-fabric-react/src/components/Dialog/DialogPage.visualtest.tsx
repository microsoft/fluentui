import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export class DialogVPage extends React.Component<any, any> {

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
          description='Opens the Dialog'
          onClick={ this._showDialog.bind(this) }
          text='Open Dialog'
        />
        <Dialog
          isOpen={ this.state.showDialog }
          type={ DialogType.normal }
          onDismiss={ this._closeDialog.bind(this) }
          title='All emails together'
          subText='Your Inbox has changed.'
          isBlocking={ false }
        >

          { null /** You can also include null values as the result of conditionals */ }
          <DialogFooter>
            <PrimaryButton onClick={ this._closeDialog.bind(this) } text='Save' />
            <DefaultButton onClick={ this._closeDialog.bind(this) } text='Cancel' />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _closeDialog() {
    this.setState({ showDialog: false });
  }
  private _onChoiceChanged() {
    console.log('Choice option change');
  }
  private _showDialog() {
    this.setState({ showDialog: true });
  }
}
