import * as React from 'react';
import { IComboBoxOption, IComboBoxStyles, VirtualizedComboBox } from '@fluentui/react';

const options: IComboBoxOption[] = [];
for (let i = 0; i < 1000; i++) {
  options.push({
    key: `${i}`,
    text: `Option ${i}`,
  });
}
const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: '300px' } };

export const ComboBoxVirtualizedExample: React.FunctionComponent = () => {
  return (
    <VirtualizedComboBox
      defaultSelectedKey="547"
      label="Scaled/virtualized example with 1000 items"
      allowFreeform
      autoComplete="on"
      options={options}
      dropdownMaxWidth={200}
      useComboBoxAsMenuWidth
      styles={comboBoxStyles}
    />
  );
};
