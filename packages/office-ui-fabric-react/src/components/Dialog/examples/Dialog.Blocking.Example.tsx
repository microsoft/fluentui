import * as React from 'react';
import { autobind } from '../../../Utilities';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export class DialogBlockingExample extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      hideDialog: true
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton
          description='Opens the Sample Dialog'
          onClick={ this._showDialog }
          text='Open Dialog'
        />
        <Dialog
          hidden={ this.state.hideDialog }
          onDismiss={ this._closeDialog }
          dialogContentProps={ {
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          } }
          modalProps={ {
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
          } }
        >
          <DialogFooter>
            <PrimaryButton onClick={ this._closeDialog } text='Save' />
            <DefaultButton onClick={ this._closeDialog } text='Cancel' />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  @autobind
  private _showDialog() {
    this.setState({ hideDialog: false });
  }

  @autobind
  private _closeDialog() {
    this.setState({ hideDialog: true });
  }
}