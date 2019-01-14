// @codepen

import * as React from 'react';
import { DetailsList, IColumn, IGroup } from 'office-ui-fabric-react/lib/DetailsList';

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

interface IDetailsListGroupedLargeExampleItem {
  key: string;
  name: string;
  value: string;
}

const _items: IDetailsListGroupedLargeExampleItem[] = [];
for (let i = 0; i < 1000; i++) {
  _items.push({
    key: i.toString(),
    name: 'Item ' + i,
    value: i.toString()
  });
}

export class DetailsListGroupedLargeExample extends React.Component<{}, {}> {
  private _groups: IGroup[];

  constructor(props: {}) {
    super(props);

    this._groups = [];
    for (let i = 0; i < 10; i++) {
      this._groups.push({
        key: i.toString(),
        name: i.toString(),
        startIndex: i * 100,
        count: 100
      });
    }
  }

  public render() {
    return (
      <DetailsList
        items={_items}
        groups={this._groups}
        columns={_columns}
        getGroupHeight={this._getGroupHeight}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
      />
    );
  }

  private _getGroupHeight = (group: IGroup) => {
    return GROUP_HEADER_HEIGHT + (group.isCollapsed ? 0 : GROUP_ITEM_HEIGHT * group.count);
  };
}
