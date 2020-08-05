import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react-next/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { optionKey: 'A', text: 'Option A' },
  { optionKey: 'B', text: 'Option B' },
  { optionKey: 'C', text: 'Option C', disabled: true },
  { optionKey: 'D', text: 'Option D' },
];

export const ChoiceGroupBasicExample: React.FunctionComponent = () => {
  return <ChoiceGroup defaultSelectedKey="B" options={options} onChange={_onChange} label="Pick one" required={true} />;
};

function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
