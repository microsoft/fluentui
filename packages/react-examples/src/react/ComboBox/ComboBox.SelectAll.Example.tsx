import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption, IComboBoxStyles, SelectableOptionMenuItemType } from '@fluentui/react';

const options: IComboBoxOption[] = [
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
// Optional styling to make the example look nicer
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

// array of selectable options for convenience
const selectableOptions = options.filter(
  option =>
    (option.itemType === SelectableOptionMenuItemType.Normal || option.itemType === undefined) && !option.disabled,
);

export const ComboBoxSelectAllExample: React.FunctionComponent = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['A', 'D']);
  const onChange = (
    event: React.FormEvent<IComboBox>,
    option?: IComboBoxOption,
    index?: number,
    value?: string,
  ): void => {
    const selected = option?.selected;
    const currentSelectedOptionKeys = selectedKeys.filter(key => key !== 'selectAll');
    const selectAllState = currentSelectedOptionKeys.length === selectableOptions.length;

    if (option) {
      if (option?.itemType === SelectableOptionMenuItemType.SelectAll) {
        selectAllState
          ? setSelectedKeys([])
          : setSelectedKeys(['selectAll', ...selectableOptions.map(o => o.key as string)]);
      } else {
        const updatedKeys = selected
          ? [...currentSelectedOptionKeys, option!.key as string]
          : currentSelectedOptionKeys.filter(k => k !== option.key);
        if (updatedKeys.length === selectableOptions.length) {
          updatedKeys.push('selectAll');
        }
        setSelectedKeys(updatedKeys);
      }
    }
  };

  return (
    <div>
      <ComboBox
        defaultSelectedKey="C"
        label="Uncontrolled multi-select ComboBox with select all"
        multiSelect
        options={options}
        styles={comboBoxStyles}
      />

      <ComboBox
        label="Controlled multi-select ComboBox with select all"
        multiSelect
        options={options}
        selectedKey={selectedKeys}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        styles={comboBoxStyles}
      />
    </div>
  );
};
