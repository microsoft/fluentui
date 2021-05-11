import { Table } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

const header = {
  items: ['A', 'B', 'C', 'D'],
};
const rows = _.times(100, i => ({
  key: i,
  items: ['1', '2', '3', '4'],
}));

const TableManyItemsPerf = () => <Table header={header} rows={rows} />;

TableManyItemsPerf.iterations = 20;
TableManyItemsPerf.filename = 'TTableManyItems.perf.tsx';

export default TableManyItemsPerf;
