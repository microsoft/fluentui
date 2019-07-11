import * as React from 'react';
import { DetailsHeader, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react';

// tslint:disable-next-line:typedef
const Items = Array.from({ length: 10 }, (n, i) => ({
  key: `Item ${i}`,
  name: `Item ${i}`,
  modified: new Date().toString(),
  shared: 'Private',
  size: `${Math.round(Math.random() * 1000) / 10}KB`
}));

const Columns = [
  { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Modified', fieldName: 'modified', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Shared', fieldName: 'shared', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Size', fieldName: 'size', minWidth: 100, maxWidth: 200, isResizable: true }
];

const selection = new Selection();
selection.setItems(Items);

const scenario = <DetailsHeader selection={selection} columns={Columns} layoutMode={DetailsListLayoutMode.fixedColumns} />;

export default scenario;
