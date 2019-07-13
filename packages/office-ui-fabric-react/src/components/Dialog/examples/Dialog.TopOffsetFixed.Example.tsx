import * as React from 'react';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';

export interface IDialogTopOffsetFixedExampleState {
  hideDialog: boolean;
  optionSelected: string;
}

export class DialogTopOffsetFixedExample extends React.Component<{}, IDialogTopOffsetFixedExampleState> {
  public state: IDialogTopOffsetFixedExampleState = {
    hideDialog: true,
    optionSelected: 'A'
  };

  public render() {
    const { optionSelected, hideDialog } = this.state;

    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />

        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          modalProps={{
            isBlocking: true,
            topOffsetFixed: true
          }}
        >
          <ChoiceGroup
            label="Pick one icon"
            options={[
              {
                key: 'A',
                iconProps: { iconName: 'CalendarDay' },
                text: 'Day',
                checked: optionSelected === 'A'
              },
              {
                key: 'B',
                iconProps: { iconName: 'CalendarWeek' },
                text: 'Week',
                checked: optionSelected === 'B'
              },
              {
                key: 'C',
                iconProps: { iconName: 'Calendar' },
                text: 'Month',
                checked: optionSelected === 'C'
              }
            ]}
            onChange={this._onChange}
            required={true}
          />
          {optionSelected === 'A' && (
            <div>
              <h1>Description</h1>
              <div>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{' '}
              </div>
            </div>
          )}
          {optionSelected === 'B' && (
            <div>
              <h1>Description</h1>
              <div>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
              </div>
            </div>
          )}
          {optionSelected === 'C' && (
            <div>
              <h1>Description</h1>
            </div>
          )}
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Save" />
            <DefaultButton onClick={this._closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    this.setState({ optionSelected: option.key });
  };

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };
}
