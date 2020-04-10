import * as React from 'react';
import { IComboBoxOption, VirtualizedComboBox, Fabric } from 'office-ui-fabric-react/lib/index';

const comboBoxOption: IComboBoxOption[] = Array.from({ length: 1000 }).map((x, i) => ({
  key: `${i}`,
  text: `Option ${i}`,
}));

export const ComboBoxVirtualizedExample: React.FC = () => (
  <Fabric className="ms-ComboBoxExample">
    <VirtualizedComboBox
      styles={{ root: { maxWidth: '300px' } }}
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
