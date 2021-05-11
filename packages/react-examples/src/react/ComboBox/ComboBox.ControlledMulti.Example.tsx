import * as React from 'react';
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  Toggle,
  IComboBox,
  IComboBoxStyles,
  IStackTokens,
  Stack,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];
let newKey = 1;
// Optional styling to make the example look nicer
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

export const ComboBoxControlledMultiExample: React.FunctionComponent = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['C', 'D']);
  // Manually updating the options list is only necessary when allowFreeform is true
  const [options, setOptions] = React.useState(INITIAL_OPTIONS);
  const [allowFreeform, { toggle: toggleAllowFreeform }] = useBoolean(true);

  const onChange = React.useCallback(
    (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
      let selected = option?.selected;
      if (allowFreeform && !option && value) {
        // If allowFreeform is true, the newly selected option might be something the user typed that
        // doesn't exist in the options list yet. So there's extra work to manually add it.
        selected = true;
        option = { key: `${newKey++}`, text: value };
        setOptions(prevOptions => [...prevOptions, option!]);
      }

      if (option) {
        setSelectedKeys(prevSelectedKeys =>
          selected ? [...prevSelectedKeys, option!.key as string] : prevSelectedKeys.filter(k => k !== option!.key),
        );
      }
    },
    [allowFreeform],
  );

  return (
    <Stack horizontal tokens={stackTokens}>
      <ComboBox
        multiSelect
        selectedKey={selectedKeys}
        label="Controlled multi-select ComboBox"
        allowFreeform={allowFreeform}
        options={options}
        onChange={onChange}
        styles={comboBoxStyles}
      />
      <Toggle label="Allow freeform" checked={allowFreeform} onChange={toggleAllowFreeform} />
    </Stack>
  );
};
