import * as React from 'react';
import { IComboBoxOption, IComboBoxStyles, VirtualizedComboBox, Fabric } from 'office-ui-fabric-react';

const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: '300px' } };

<<<<<<< HEAD
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
=======
export class ComboBoxVirtualizedExample extends React.Component<{}, {}> {
  private _options: IComboBoxOption[] = [];

  constructor(props: {}) {
    super(props);
    for (let i = 0; i < 1000; i++) {
      this._options.push({
        key: `${i}`,
        text: `Option ${i}`,
      });
    }
    this._options.push({ key: '1000', text: 'Very Very Very Very long option' });
  }

  public render(): JSX.Element {
    return (
      <Fabric className="ms-ComboBoxExample">
        <VirtualizedComboBox
          styles={comboBoxStyles}
          defaultSelectedKey="547"
          label="Scaled/virtualized example with 1000 items"
          allowFreeform={true}
          autoComplete="on"
          options={this._options}
          dropdownMaxWidth={200}
          useComboBoxAsMenuWidth={true}
        />
      </Fabric>
    );
  }
}
>>>>>>> fix styles prop in examples
