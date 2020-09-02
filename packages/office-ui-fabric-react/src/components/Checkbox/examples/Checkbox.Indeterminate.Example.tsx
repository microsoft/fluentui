import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

export const CheckboxIndeterminateExample: React.FunctionComponent = () => {
  // Only used for the controlled checkbox (the last one)
  const [isIndeterminate, setIsIndeterminate] = React.useState(true);
  const [isChecked, setIsChecked] = React.useState(false);
  const onChange = React.useCallback(
    (ev: React.FormEvent<HTMLElement>, newChecked: boolean) => {
      if (isIndeterminate) {
        // If the checkbox was indeterminate, the first click should remove the indeterminate state
        // without affecting the checked state
        setIsIndeterminate(false);
      } else {
        setIsChecked(newChecked);
      }
    },
    [isIndeterminate],
  );

  return (
    <Stack tokens={stackTokens}>
      <Checkbox label="Indeterminate checkbox (uncontrolled)" defaultIndeterminate />

      <Checkbox
        label="Indeterminate checkbox which defaults to true when clicked (uncontrolled)"
        defaultIndeterminate
        defaultChecked={true}
      />

      <Checkbox label="Disabled indeterminate checkbox" disabled defaultIndeterminate />

      <Checkbox
        label="Indeterminate checkbox (controlled)"
        indeterminate={isIndeterminate}
        checked={isChecked}
        onChange={onChange}
      />
    </Stack>
  );
};
