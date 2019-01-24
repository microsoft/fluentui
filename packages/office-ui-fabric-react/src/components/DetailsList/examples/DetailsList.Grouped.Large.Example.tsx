// @codepen

import * as React from 'react';
import { DetailsList, IColumn, IGroup } from 'office-ui-fabric-react/lib/DetailsList';

const GROUP_HEADER_HEIGHT = 40;
const GROUP_ITEM_HEIGHT = 43;

interface IDetailsListGroupedLargeExampleItem {
  key: string;
  name: string;
  value: string;
}

export class DetailsListGroupedLargeExample extends React.Component<{}, {}> {
  private _items: IDetailsListGroupedLargeExampleItem[];
  private _groups: IGroup[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._items = [];
    for (let i = 0; i < 1000; i++) {
      this._items.push({
        key: i.toString(),
        name: 'Item ' + i,
        value: i.toString()
      });
    }

    this._groups = [];
    for (let i = 0; i < 10; i++) {
      this._groups.push({
        key: i.toString(),
        name: i.toString(),
        startIndex: i * 100,
        count: 100
      });
    }

    this._columns = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'value', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true }
    ];
  }

  public render() {
    return (
      <DetailsList
        items={this._items}
        groups={this._groups}
        columns={this._columns}
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
