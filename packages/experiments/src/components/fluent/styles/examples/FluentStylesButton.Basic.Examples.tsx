import * as React from 'react';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';

export interface IFluentThemeButtonExampleState {
  hideDialog: boolean;
}

export class FluentThemeButtonExample extends React.Component<{}, IFluentThemeButtonExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      hideDialog: true
    };
  }

  public render(): JSX.Element {
    return (
      <div className="docs-ButtonExample">
        <div>
          <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
        </div>
        <div>
          <h2>Primary Button</h2>
          <PrimaryButton onClick={this._closeDialog} text="Save" />
        </div>
        <div>
          <h2>Default Button</h2>
          <DefaultButton onClick={this._closeDialog} text="Cancel" />
        </div>
        <div>
          <h2>Compound Button</h2>
          <CompoundButton onClick={this._closeDialog} text="Cancel" />
        </div>
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'All emails together',
            subText:
              'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
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
