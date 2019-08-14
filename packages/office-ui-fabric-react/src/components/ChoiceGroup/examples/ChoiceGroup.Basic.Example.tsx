import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

export const ChoiceGroupBasicExample: React.FunctionComponent = () => {
  return (
    <ChoiceGroup
      className="defaultChoiceGroup"
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
      label="Pick one"
      required={true}
    />
  );
};

function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
