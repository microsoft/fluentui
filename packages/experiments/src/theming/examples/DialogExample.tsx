import * as React from 'react';

import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

export interface IDialogExampleProps {
  buttonText: string;
}

export interface IDialogExampleState {
  hideDialog: boolean;
}

export class DialogExample extends React.Component<IDialogExampleProps, IDialogExampleState> {
  constructor(props: IDialogExampleProps) {
    super(props);

    this.state = {
      hideDialog: true
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <br />
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text={this.props.buttonText} />
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: 'All emails together',
            subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          }}
          modalProps={{
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
          }}
        >
          <ChoiceGroup
            options={[
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
            ]}
          />
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
