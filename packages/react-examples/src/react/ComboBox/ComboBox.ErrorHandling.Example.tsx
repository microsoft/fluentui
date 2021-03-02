import * as React from 'react';
import {
  ComboBox,
  IComboBoxProps,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  IComboBoxStyles,
  IStackTokens,
  Stack,
} from '@fluentui/react';

const options: IComboBoxOption[] = [
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
// Optional styling to make the example look nicer
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

export const ComboBoxErrorHandlingExample: React.FunctionComponent = () => {
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('');
  const onChange: IComboBoxProps['onChange'] = (event, option) => setSelectedKey(option!.key as string);

  return (
    <Stack tokens={stackTokens}>
      <ComboBox
        label="ComboBox with static error message"
        defaultSelectedKey="B"
        errorMessage="Oh no! This ComboBox has an error!"
        options={options}
        styles={comboBoxStyles}
      />

      <ComboBox
        label="ComboBox that errors when Option B is selected"
        options={options}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        selectedKey={selectedKey}
        errorMessage={selectedKey === 'B' ? 'B is not an allowed option' : undefined}
        styles={comboBoxStyles}
      />
    </Stack>
  );
};
