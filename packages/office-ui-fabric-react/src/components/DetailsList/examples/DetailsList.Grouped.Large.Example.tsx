import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { IDetailsList, DetailsList, IColumn, IGroup } from 'office-ui-fabric-react/lib/DetailsList';

const GROUP_HEADER_HEIGHT = 40;
const GROUP_ITEM_HEIGHT = 43;

const _columns: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'value',
    name: 'Value',
    fieldName: 'value',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

const _items = Array.apply(null, Array(1000)).map((_: any, num: number) => ({
  key: num.toString(),
  name: `Item ${num.toString()}`,
  value: num.toString()
}));

const _groups = Array.apply(null, Array(10)).map((_: any, num: number) => ({
  key: num.toString(),
  name: num.toString(),
  startIndex: num * 100,
  count: 100
}));

export class DetailsListGroupedLargeExample extends BaseComponent<{}, { items: {}[] }> {
  private _root = React.createRef<IDetailsList>();

  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <Fabric className="DetailsList-grouped-large-example">
        <DetailsList
          componentRef={this._root}
          items={_items}
          groups={_groups}
          columns={_columns}
          getGroupHeight={this._getGroupHeight}
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
        />
      </Fabric>
    );
  }

  private _getGroupHeight = (group: IGroup) => {
    return GROUP_HEADER_HEIGHT + GROUP_ITEM_HEIGHT * group.count;
  };
}
