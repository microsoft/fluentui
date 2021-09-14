import * as React from 'react';
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  PrimaryButton,
  SelectableOptionMenuItemType,
} from 'office-ui-fabric-react/lib/index';

const comboBoxBasicOptions: IComboBoxOption[] = [
  { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
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

const comboBoxMultiStyle = { maxWidth: 300, display: 'block', marginTop: '10px' };

export const ComboBoxSelectAllExample: React.FC = () => {
  const comboBoxRef = React.useRef<IComboBox>(null);
  const onOpenClick = React.useCallback(() => comboBoxRef.current?.focus(true), []);

  return (
    <div>
      <ComboBox
        multiSelect
        componentRef={comboBoxRef}
        defaultSelectedKey="C"
        label="Multi-select ComboBox with select all"
        allowFreeform
        autoComplete="on"
        options={comboBoxBasicOptions}
      />
      <PrimaryButton text="Open ComboBox" style={comboBoxMultiStyle} onClick={onOpenClick} />
    </div>
  );
};
