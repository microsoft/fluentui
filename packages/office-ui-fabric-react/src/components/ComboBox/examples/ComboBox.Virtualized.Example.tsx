// @codepen
import * as React from 'react';
import './ComboBox.Example.scss';
import { IComboBoxOption, VirtualizedComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

// tslint:disable:jsx-no-lambda
export class ComboBoxVirtualizedExample extends React.Component<{}, {}> {
  private scaleOptions: IComboBoxOption[] = [];

  constructor(props: {}) {
    super(props);
    for (let i = 0; i < 1000; i++) {
      this.scaleOptions.push({
        key: `${i}`,
        text: `Option ${i}`
      });
    }
    this.scaleOptions.push({ key: '1000', text: 'Very Very Very Very long option' });
  }

  public render(): JSX.Element {
    return (
      <Fabric className="ms-ComboBoxExample">
        <VirtualizedComboBox
          defaultSelectedKey="547"
          label="Scaled/virtualized example with 1000 items"
          allowFreeform={true}
          autoComplete="on"
          options={this.scaleOptions}
          dropdownMaxWidth={200}
          useComboBoxAsMenuWidth={true}
        />
      </Fabric>
    );
  }
}
