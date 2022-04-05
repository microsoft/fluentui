import * as React from 'react';
import { Table, tableHeaderCellBehavior } from '@fluentui/react-northstar';

const TableExampleStatic = () => (
  <Table aria-label="table">
    <Table.Row header>
      <Table.Cell content="id" accessibility={tableHeaderCellBehavior} />
      <Table.Cell content="Name" accessibility={tableHeaderCellBehavior} />
      <Table.Cell content="Picture" accessibility={tableHeaderCellBehavior} />
      <Table.Cell content="Age" accessibility={tableHeaderCellBehavior} />
    </Table.Row>
    <Table.Row>
      <Table.Cell content="1" />
      <Table.Cell content="Roman van von der Longername" />
      <Table.Cell content="None" />
      <Table.Cell content="30 years" />
    </Table.Row>
    <Table.Row>
      <Table.Cell content="2" />
      <Table.Cell content="Alex" />
      <Table.Cell content="None" />
      <Table.Cell content="1 year" />
    </Table.Row>
    <Table.Row>
      <Table.Cell content="3" />
      <Table.Cell content="Ali" />
      <Table.Cell content="None" />
      <Table.Cell content="30000000000000 years" />
    </Table.Row>
  </Table>
);
export default TableExampleStatic;
