import * as React from 'react';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import './Dialog.Basic.Example.scss';

export class DialogTopOffsetFixedExample extends React.Component<
  {},
  {
    hideDialog: boolean;
    currentOption: string;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      hideDialog: true,
      currentOption: 'A'
    };
  }

  public render() {
    const { currentOption, hideDialog } = this.state;

    return (
      <div>
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={this._showDialog} text="Open Dialog" />
        <label id="myLabelId" className="screenReaderOnly">
          My sample Label
        </label>
        <label id="mySubTextId" className="screenReaderOnly">
          My Sample description
        </label>

        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          modalProps={{
            isBlocking: true,
            topOffsetFixed: true
          }}
        >
          <ChoiceGroup
            options={[
              {
                key: 'A',
                iconProps: { iconName: 'CalendarDay' },
                text: 'Day',
                checked: currentOption === 'A'
              },
              {
                key: 'B',
                iconProps: { iconName: 'CalendarWeek' },
                text: 'Week',
                checked: currentOption === 'B'
              },
              {
                key: 'C',
                iconProps: { iconName: 'Calendar' },
                text: 'Month',
                checked: currentOption === 'C'
              }
            ]}
            onChange={this._onChange}
            label="Pick one"
            required={true}
          />
          {currentOption === 'A' && (
            <div>
              <h1> Description </h1>
              <div>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{' '}
              </div>
            </div>
          )}
          {currentOption === 'B' && (
            <div>
              <h1> Description </h1>
              <div>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
              </div>
            </div>
          )}
          {currentOption === 'C' && (
            <div>
              <h1> No Description </h1>
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
    this.setState({ currentOption: option.key });
  };

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };
}
