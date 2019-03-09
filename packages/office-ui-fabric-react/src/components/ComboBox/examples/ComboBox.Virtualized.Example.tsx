import * as React from 'react';
import { IComboBoxOption, VirtualizedComboBox, Fabric } from 'office-ui-fabric-react/lib/index';

// tslint:disable:jsx-no-lambda
export class ComboBoxVirtualizedExample extends React.Component<{}, {}> {
  private _options: IComboBoxOption[] = [];

  constructor(props: {}) {
    super(props);
    for (let i = 0; i < 1000; i++) {
      this._options.push({
        key: `${i}`,
        text: `Option ${i}`
      });
    }
    this._options.push({ key: '1000', text: 'Very Very Very Very long option' });
  }

  public render(): JSX.Element {
    return (
      <Fabric className="ms-ComboBoxExample">
        <VirtualizedComboBox
          styles={{ root: { maxWidth: '300px' } }}
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
