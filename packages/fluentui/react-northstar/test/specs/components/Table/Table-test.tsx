import * as React from 'react';

import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent } from 'test/utils';
import { TableRow } from 'src/components/Table/TableRow';
import { Table } from 'src/components/Table/Table';

describe('Table', () => {
  isConformant(Table, { testPath: __filename, constructorName: 'Table' });

  describe('accessiblity', () => {
    handlesAccessibility(Table, { defaultRootRole: 'table' });
  });

  const header = {
    key: 'header',
    items: [
      { content: 'id', key: 'id' },
      { content: 'Name', key: 'name' },
      { content: 'Picture', key: 'pic' },
      { content: 'Age', key: 'action' },
    ],
  };
  const rows = [
    {
      key: 1,
      items: [
        { content: '1', key: '1-1' },
        {
          content: 'Roman van von der Longername',

          key: '1-2',
        },
        { content: 'None', key: '1-3' },
        { content: '30 years', key: '1-4' },
      ],
    },
    {
      key: 2,
      items: [
        { content: '2', key: '2-1' },
        { content: 'Alex', key: '2-2' },
        { content: 'None', key: '2-3' },
        { content: '1 year', key: '2-4' },
      ],
    },
    {
      key: 3,
      items: [
        { content: '3', key: '3-1' },
        { content: 'Ali', key: '3-2' },
        { content: 'None', key: '3-3' },
        { content: '30000000000000 years', key: '3-4' },
      ],
    },
  ];

  it('renders as `div`', () => {
    const table = mountWithProviderAndGetComponent(Table, <Table rows={rows} />)
      .find('.ui-table')
      .hostNodes();

    expect(table.is('div')).toBe(true);
  });

  describe('header', () => {
    it('render children', () => {
      const table = mountWithProviderAndGetComponent(Table, <Table header={header} />)
        .find('.ui-table')
        .hostNodes();

      const tableHeader = table.find(TableRow);
      expect(tableHeader.length).toBe(1);
    });

    it('does not render empty children', () => {
      const table = mountWithProviderAndGetComponent(Table, <Table />)
        .find('.ui-table')
        .hostNodes();

      const tableHeader = table.find(TableRow);
      expect(tableHeader.length).toBe(0);
    });
  });

  describe('rows', () => {
    it('render children', () => {
      const table = mountWithProviderAndGetComponent(Table, <Table rows={rows} />)
        .find('.ui-table')
        .hostNodes();

      const tableRows = table.find(TableRow);
      expect(tableRows.length).toBe(3);
    });

    it('does not render empty children', () => {
      const table = mountWithProviderAndGetComponent(Table, <Table />)
        .find('.ui-table')
        .hostNodes();

      const tableRows = table.find(TableRow);
      expect(tableRows.length).toBe(0);
    });
  });

  describe('compact', () => {
    it('render compact rows when enabled', () => {
      const table = mountWithProviderAndGetComponent(Table, <Table rows={rows} compact />)
        .find('.ui-table')
        .hostNodes();

      const tableRows = table.find(TableRow);
      expect(tableRows.first().props().compact).toBeTruthy();
      expect(tableRows.last().props().compact).toBeTruthy();
    });

    it('does not render compact rows when disabled', () => {
      const table = mountWithProviderAndGetComponent(Table, <Table rows={rows} />)
        .find('.ui-table')
        .hostNodes();

      const tableRows = table.find(TableRow);
      expect(tableRows.first().props().compact).toBeFalsy();
      expect(tableRows.last().props().compact).toBeFalsy();
    });
  });

  describe('children', () => {
    it('are rendered when specified', () => {
      const table = mountWithProviderAndGetComponent(
        Table,
        <Table aria-label="table">
          <Table.Row header>
            <Table.Cell content="id" key="id" />
            <Table.Cell content="Name" key="name" />
            <Table.Cell content="Picture" key="pic" />
            <Table.Cell content="Age" key="age" />
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
        </Table>,
      )
        .find('.ui-table')
        .hostNodes();

      const tableRows = table.find(TableRow);
      expect(tableRows.length).toBe(4);
    });
  });
});
