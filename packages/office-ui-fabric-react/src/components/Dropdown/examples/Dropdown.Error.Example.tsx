import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IDropdownErrorExampleState {
  showError: boolean;
}

export class DropdownErrorExample extends React.Component<{}, IDropdownErrorExampleState> {
  // Don't show the error message by default because it's annoying to screen reader users.
  public state: IDropdownErrorExampleState = { showError: false };

  public render() {
    const { showError } = this.state;

    const stackTokens: IStackTokens = { childrenGap: 30 };

    return (
      <Stack horizontal tokens={stackTokens} verticalAlign="start">
        <Toggle label="Show error message" onText="Yes" offText="No" checked={showError} onChange={this._updateShowError} />
        <Dropdown
          placeholder="Select an option"
          label="Dropdown with error message"
          options={[
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' }
          ]}
          errorMessage={showError ? 'This dropdown has an error' : undefined}
          styles={{ dropdown: { width: 300 }, root: { height: 100 } }}
        />
      </Stack>
    );
  }

  private _updateShowError = (event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    this.setState({ showError: !!checked });
  };
}
