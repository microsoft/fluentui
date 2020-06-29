import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBox, SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/index';

const items: IComboBoxOption[] = [
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

const comboBoxStyle = { maxWidth: 300 };

export const ComboBoxControlledExample: React.FC = () => {
  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>('C');

  const onChange = React.useCallback(
    (ev: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
      setSelectedKey(option?.key);
    },
    [setSelectedKey],
  );

  return (
    <ComboBox
      style={comboBoxStyle}
      selectedKey={selectedKey}
      label="Controlled single-select ComboBox (allowFreeform: T)"
      allowFreeform
      autoComplete="on"
      options={items}
      onChange={onChange}
    />
  );
};
