import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption, DropdownMenuItemType } from '@fluentui/react-next';
import { PrimaryButton } from '@fluentui/react-next/lib/compat/Button';

const comboBoxBasicOptions: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: DropdownMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: DropdownMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];

const comboBoxMultiStyle = { maxWidth: 300, display: 'block', marginTop: '10px' };

export const ComboBoxBasicExample: React.FC = () => {
  const comboBoxRef = React.useRef<IComboBox>(null);
  const onOpenClick = React.useCallback(() => comboBoxRef.current?.focus(true), []);

  return (
    <div>
      <ComboBox
        componentRef={comboBoxRef}
        defaultSelectedKey="C"
        label="Basic ComboBox"
        allowFreeform
        autoComplete="on"
        options={comboBoxBasicOptions}
      />
      <PrimaryButton text="Open ComboBox" style={comboBoxMultiStyle} onClick={onOpenClick} />
    </div>
  );
};
