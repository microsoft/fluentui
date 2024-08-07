import { Meta } from '@storybook/react';
import { Table } from '@fluentui/react-northstar';
import TableExampleStaticShorthand from '../../examples/components/Table/Usage/TableExampleStatic.shorthand';
import TableExampleStatic from '../../examples/components/Table/Usage/TableExampleStatic';
import StaticTableCompact from '../../examples/components/Table/Usage/TableExampleStaticCompact.shorthand';

export default { component: Table, title: 'Table' } as Meta<typeof Table>;

export {
  TableExampleStaticShorthand,
  TableExampleStatic,
  StaticTableCompact,
  // StaticTable
};
