import { ChoiceGroup, IChoiceGroupOption, Stack } from '@fluentui/react';
import type { FunctionComponent } from 'react';
import * as React from 'react';

// Used to add spacing between example checkboxes
const stackTokens = { childrenGap: 10 };

export const ChoiceGroupExample: FunctionComponent = () => {
  // These checkboxes are uncontrolled because they don't set the `checked` prop.

  const options: IChoiceGroupOption[] = [
    {
      key: 'A',
      text: 'Option A',
    },
    {
      key: 'B',
      text: 'Option B',
    },
    { key: 'C', text: 'Option C', disabled: true },
    { key: 'D', text: 'Option D' },
  ];

  return (
    <Stack tokens={stackTokens}>
      <ChoiceGroup
        defaultSelectedKey="A"
        options={[
          { key: 'A', text: 'Option 1' },
          { key: 'B', text: 'Option 2' },
          { key: 'C', text: 'Option 3' },
        ]}
      />

      <ChoiceGroup
        defaultSelectedKey="A"
        options={[
          { key: 'A', text: 'Option 1' },
          { key: 'B', text: 'Option 2' },
          { key: 'C', text: 'Option 3' },
        ]}
        disabled={true}
      />

      <ChoiceGroup options={options} />
    </Stack>
  );
};
