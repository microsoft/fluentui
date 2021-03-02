import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
  { key: 'D', text: 'Option D' },
];

export const ChoiceGroupControlledExample: React.FunctionComponent = () => {
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('B');

  const onChange = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
    setSelectedKey(option.key);
  }, []);

  return <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange} label="Pick one" />;
};
