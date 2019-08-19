import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

export const ChoiceGroupLabelExample: React.FunctionComponent = () => {
  // Use getId() to ensure that the label ID is unique on the page. Notes:
  // - It's also okay to use a plain string without getId() and manually ensure its uniqueness.
  // - In a function component, we get the ID inside React.useMemo() so that it will stay the same.
  //   (In a class component, you'd create the ID in the constructor and save it in a private member.)
  const labelId = React.useMemo(() => getId('labelElement'), []);

  return (
    <div>
      <Label id={labelId} required={true}>
        Custom label
      </Label>
      <ChoiceGroup
        defaultSelectedKey="B"
        options={[
          {
            key: 'A',
            text: 'Option A'
          },
          {
            key: 'B',
            text: 'Option B'
          },
          {
            key: 'C',
            text: 'Option C',
            disabled: true
          },
          {
            key: 'D',
            text: 'Option D'
          }
        ]}
        onChange={_onChange}
        ariaLabelledBy={labelId}
      />
    </div>
  );
};

function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
