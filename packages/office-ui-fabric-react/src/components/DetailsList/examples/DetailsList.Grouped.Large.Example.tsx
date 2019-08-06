import * as React from 'react';
import { DetailsHeader, DetailsList, IColumn, IDetailsHeaderProps, IGroup } from 'office-ui-fabric-react/lib/DetailsList';

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
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="Row checkbox"
        onRenderDetailsHeader={this._onRenderDetailsHeader}
      />
    );
  }

  private _onRenderDetailsHeader(props: IDetailsHeaderProps) {
    return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Toggle selection'} />;
  }
}
