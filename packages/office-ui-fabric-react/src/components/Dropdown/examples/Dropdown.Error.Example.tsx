import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { useBoolean } from '@uifabric/react-hooks';

export interface IDropdownErrorExampleState {
  showError: boolean;
}

const stackTokens: IStackTokens = { childrenGap: 30 };

const DropdownErrorExampleOptions = [
  { key: 'A', text: 'Option a' },
  { key: 'B', text: 'Option b' },
  { key: 'C', text: 'Option c' },
  { key: 'D', text: 'Option d' },
  { key: 'E', text: 'Option e' },
];

const dropdownStyles = { dropdown: { width: 300 }, root: { height: 100 } };

export const DropdownErrorExample: React.FC = () => {
  const [showError, { toggle: toggleShowError }] = useBoolean(false);
  return (
    <Stack horizontal tokens={stackTokens} verticalAlign="start">
      <Toggle label="Show error message" onText="Yes" offText="No" checked={showError} onChange={toggleShowError} />
      <Dropdown
        placeholder="Select an option"
        label="Dropdown with error message"
        options={DropdownErrorExampleOptions}
        errorMessage={showError ? 'This dropdown has an error' : undefined}
        styles={dropdownStyles}
      />
    </Stack>
  );
};
