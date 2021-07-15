import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBoxStyles, SelectableOptionMenuItemType } from '@fluentui/react';

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

export const ComboBoxInlineExample: React.FunctionComponent = () => {
  return (
    <div>
      <ComboBox
        defaultSelectedKey="C"
        label="Combobox with inline options list"
        options={options}
        styles={comboBoxStyles}
        calloutProps={{ doNotLayer: true }}
      />
    </div>
  );
};
