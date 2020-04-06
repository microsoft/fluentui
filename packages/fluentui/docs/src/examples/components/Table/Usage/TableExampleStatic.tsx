import * as React from 'react';
import { Table, tableHeaderCellBehavior } from '@fluentui/react-northstar';

const StaticTable = () => (
  <Table aria-label="table">
    <Table.Row header>
      <Table.Cell content="id" key="id" accessibility={tableHeaderCellBehavior} />
      <Table.Cell content="Name" key="name" accessibility={tableHeaderCellBehavior} />
      <Table.Cell content="Picture" key="pic" accessibility={tableHeaderCellBehavior} />
      <Table.Cell content="Age" key="age" accessibility={tableHeaderCellBehavior} />
    </Table.Row>
    <Table.Row key="1">
      <Table.Cell content="1" key="1-1" />
      <Table.Cell content="Roman van von der Longername" key="1-2" />
      <Table.Cell content="None" key="1-3" />
      <Table.Cell content="30 years" key="1-4" />
    </Table.Row>
    <Table.Row key="2">
      <Table.Cell content="2" key="1-1" />
      <Table.Cell content="Alex" key="1-2" />
      <Table.Cell content="None" key="1-3" />
      <Table.Cell content="1 year" key="1-4" />
    </Table.Row>
    <Table.Row key="3">
      <Table.Cell content="3" key="1-1" />
      <Table.Cell content="Ali" key="1-2" />
      <Table.Cell content="None" key="1-3" />
      <Table.Cell content="30000000000000 years" key="1-4" />
    </Table.Row>
  </Table>
);
export default StaticTable;
