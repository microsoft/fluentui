import * as React from 'react';
import { Table } from '@fluentui/react-northstar';

const header = {
  items: ['id', 'Name', 'Picture', 'Age'],
};
const rowsPlain = [
  {
    key: 1,
    items: ['1', 'Roman van von der Longername', 'None', '30 years'],
  },
  {
    key: 2,
    items: ['2', 'Alex', 'None', '1 year'],
  },
  {
    key: 3,
    items: ['3', 'Ali', 'None', '30000000000000 years'],
  },
];

const StaticTableCompact = () => (
  <Table compact header={header} rows={rowsPlain} aria-label="Compact view static table" />
);

export default StaticTableCompact;
