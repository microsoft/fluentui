// @codepen

import * as React from 'react';
import { DetailsListLayoutMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';

const _items: IDetailsListBasicExampleItem[] = [];

const _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: 'Value',
    fieldName: 'value',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for value'
  }
];

export interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

export class DetailsListShimmerExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);

    if (_items.length === 0) {
      for (let i = 0; i < 200; i++) {
        _items.push({
          key: i,
          name: 'Item ' + i,
          value: i
        });
      }
    }
  }

  public render() {
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>Note: this list will always appear in the shimmered "loading" state</div>
        <ShimmeredDetailsList
          shimmerLines={15}
          enableShimmer={true}
          items={_items}
          columns={_columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    );
  }
}
