import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { useId } from '@uifabric/react-hooks';

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
  { key: 'D', text: 'Option D' },
];

export const ChoiceGroupLabelExample: React.FunctionComponent = () => {
  // Use the useId() hook to ensure that the label ID is unique on the page. Notes:
  // - It's also okay to use a plain string and manually ensure its uniqueness.
  // - In a function component, we get the ID with the useId() hook so that it will stay the same.
  //   (In a class, you'd create the ID in the constructor with getId and save it in a private member.)
  const labelId = useId('labelElement');

  return (
    <div>
      {/* ONLY do this if you need to customize the label.
      In most cases you should use ChoiceGroup's built-in `label` prop instead. */}
      <Label id={labelId}>
        <Stack horizontal verticalAlign="center">
          <span>Custom label&nbsp;&nbsp;</span>
          <Icon iconName="Filter" />
        </Stack>
      </Label>
      <ChoiceGroup
        // This is usually what you should do
        // label="Normal label"
        defaultSelectedKey="B"
        options={options}
        onChange={_onChange}
        ariaLabelledBy={labelId}
      />
    </div>
  );
};

function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
