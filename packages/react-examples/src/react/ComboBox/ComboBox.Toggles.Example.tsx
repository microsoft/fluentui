import * as React from 'react';
import {
  ComboBox,
  Stack,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  Toggle,
  IStackTokens,
  IComboBoxStyles,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';

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

export const ComboBoxTogglesExample: React.FunctionComponent = () => {
  const [autoComplete, { toggle: toggleAutoComplete }] = useBoolean(false);
  const [allowFreeform, { toggle: toggleAllowFreeform }] = useBoolean(true);

  return (
    <Stack horizontal tokens={stackTokens}>
      <ComboBox
        label="ComboBox with toggleable freeform/auto-complete"
        allowFreeform={allowFreeform}
        autoComplete={autoComplete ? 'on' : 'off'}
        options={options}
        styles={comboBoxStyles}
        // Force re-creating the component when the toggles change (for demo purposes)
        key={'' + autoComplete + allowFreeform}
      />
      <Toggle label="Allow freeform" checked={allowFreeform} onChange={toggleAllowFreeform} />
      <Toggle label="Auto-complete" checked={autoComplete} onChange={toggleAutoComplete} />
    </Stack>
  );
};
