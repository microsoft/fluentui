import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react-next/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { optionKey: 'A', text: 'Option A' },
  { optionKey: 'B', text: 'Option B' },
  { optionKey: 'C', text: 'Option C', disabled: true },
  { optionKey: 'D', text: 'Option D' },
];

export const ChoiceGroupControlledExample: React.FunctionComponent = () => {
  const [selectedKey, setSelectedKey] = React.useState<string>('B');

  const onChange = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
    setSelectedKey(option.optionKey);
  }, []);

  return <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange} label="Pick one" />;
};
