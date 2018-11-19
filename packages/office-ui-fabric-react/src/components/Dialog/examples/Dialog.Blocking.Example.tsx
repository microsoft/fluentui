// @codepen
import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export class DialogBlockingExample extends React.Component<
  {},
  {
    hideDialog: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hideDialog: true
    };
  }

  public render() {
    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride'
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
