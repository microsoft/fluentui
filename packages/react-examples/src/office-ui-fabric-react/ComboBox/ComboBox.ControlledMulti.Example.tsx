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

const comboBoxMultiStyle = { maxWidth: 300 };

export const ComoBoxControlledMultiExample: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['C', 'D']);

  const onChange = React.useCallback(
    (ev: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
      setSelectedKeys(
        option?.selected ? [...selectedKeys, option.key as string] : selectedKeys.filter(key => key !== option?.key),
      );
    },
    [selectedKeys],
  );

  return (
    <ComboBox
      multiSelect
      style={comboBoxMultiStyle}
      selectedKey={selectedKeys}
      label="Controlled multi-select ComboBox (allowFreeform: T)"
      allowFreeform
      autoComplete="on"
      options={items}
      onChange={onChange}
    />
  );
};
