import * as React from 'react';
import { DetailsList, IColumn, IGroup, IGroupHeaderCheckboxProps, Toggle } from 'office-ui-fabric-react';
import { IDetailsListCheckboxProps } from '../DetailsList.types';

export interface IDetailsListCustomCheckboxExampleItem {
  key: string;
  name: string;
  color: string;
}

export interface IDetailsListCustomCheckboxExampleState {
  items: IDetailsListCustomCheckboxExampleItem[];
  groups: IGroup[];
}

export class DetailsListCustomCheckboxExample extends React.Component<{}, IDetailsListCustomCheckboxExampleState> {
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this.state = {
      items: [
        { key: 'a', name: 'a', color: 'red' },
        { key: 'b', name: 'b', color: 'red' },
        { key: 'c', name: 'c', color: 'blue' },
        { key: 'd', name: 'd', color: 'blue' },
        { key: 'e', name: 'e', color: 'blue' },
      ],
      groups: [
        {
          key: 'group0',
          name: 'Group 0',
          startIndex: 0,
          count: 2,
        },
        {
          key: 'group1',
          name: 'Group 1',
          startIndex: 2,
          count: 3,
        },
      ],
    };

    this._columns = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'color', name: 'Color', fieldName: 'color', minWidth: 100, maxWidth: 200 },
    ];
  }

  public render() {
    const { items, groups } = this.state;

    return (
      <div>
        <DetailsList
          items={items}
          groups={groups}
          columns={this._columns}
          onRenderCheckbox={this._onRenderCheckbox}
          onRenderGroupHeaderCheckbox={this._onRenderGroupHeaderCheckbox}
        />
      </div>
    );
  }

  private _onRenderCheckbox = (props: IDetailsListCheckboxProps) => {
    return <Toggle checked={props.checked} />;
  };

  private _onRenderGroupHeaderCheckbox = (props: IGroupHeaderCheckboxProps) => {
    return <Toggle checked={props.checked} />;
  };
}
