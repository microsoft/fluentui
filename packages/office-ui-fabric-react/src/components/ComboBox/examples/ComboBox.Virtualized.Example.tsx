import * as React from 'react';
import { IComboBoxOption, IComboBoxStyles, VirtualizedComboBox, Fabric } from 'office-ui-fabric-react';

const comboBoxOption: IComboBoxOption[] = Array.from({ length: 1000 }).map((x, i) => ({
  key: `${i}`,
  text: `Option ${i}`,
}));

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: '300px' } };

export const ComboBoxVirtualizedExample: React.FC = () => (
  <Fabric className="ms-ComboBoxExample">
    <VirtualizedComboBox
      styles={comboBoxStyles}
      defaultSelectedKey="547"
      label="Scaled/virtualized example with 1000 items"
      allowFreeform
      autoComplete="on"
      options={comboBoxOption}
      dropdownMaxWidth={200}
      useComboBoxAsMenuWidth
    />
  </Fabric>
);
