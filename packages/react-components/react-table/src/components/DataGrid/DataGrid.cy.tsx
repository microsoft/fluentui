import * as React from 'react';
import {
  TableColumnDefinition,
  DataGrid,
  DataGridHeader,
  DataGridRow,
  createTableColumn,
  DataGridCell,
  DataGridBody,
} from '@fluentui/react-table';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

interface Item {
  first: string;
  second: string;
  third: string;
}

const testColumns: TableColumnDefinition<Item>[] = [
  createTableColumn({ columnId: 'first', renderHeaderCell: () => 'header-1', renderCell: item => item.first }),
  createTableColumn({ columnId: 'second', renderHeaderCell: () => 'header-2', renderCell: item => item.second }),
  createTableColumn({ columnId: 'third', renderHeaderCell: () => 'header-3', renderCell: item => item.third }),
];

const testItems: Item[] = [
  { first: '1-1', second: '1-2', third: '1-3' },
  { first: '2-1', second: '2-2', third: '2-3' },
  { first: '3-1', second: '3-2', third: '3-3' },
  { first: '4-1', second: '4-2', third: '4-3' },
  { first: '5-1', second: '5-2', third: '5-3' },
  { first: '6-1', second: '6-2', third: '6-3' },
  { first: '7-1', second: '7-2', third: '7-3' },
];

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('DataGrid', () => {
  const Example = () => (
    <DataGrid items={testItems} columns={testColumns}>
      <DataGridHeader>
        <DataGridRow<Item>>{({ renderHeaderCell }) => <DataGridCell>{renderHeaderCell()}</DataGridCell>}</DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item }) => (
          <DataGridRow<Item>>{({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}</DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );

  it('should move focus with arrow keys', () => {
    mount(<Example />);

    cy.contains('header-1').focus().realPress('ArrowRight');
    cy.focused().should('have.text', 'header-2').realPress('ArrowLeft');
    cy.focused().should('have.text', 'header-1').realPress('ArrowDown');
    cy.focused().should('have.text', '1-1').realPress('ArrowRight');
    cy.focused().should('have.text', '1-2').realPress('ArrowLeft');
    cy.focused().should('have.text', '1-1').realPress('ArrowUp');
    cy.focused().should('have.text', 'header-1');
  });

  it('should move focus to last cell with End', () => {
    mount(<Example />);

    cy.contains('1-1').focus().realPress('End');
    cy.focused().should('have.text', '1-3');
  });

  it('should move focus to first cell with Home', () => {
    mount(<Example />);

    cy.contains('1-3').focus().realPress('Home');
    cy.focused().should('have.text', '1-1');
  });

  it('should move focus to last cell with End', () => {
    mount(<Example />);

    cy.contains('1-1').focus().realPress('End');
    cy.focused().should('have.text', '1-3');
  });

  it('should move focus to first cell with Home', () => {
    mount(<Example />);

    cy.contains('1-3').focus().realPress('Home');
    cy.focused().should('have.text', '1-1');
  });

  it('should move to first cell in first row with CTRL+Home', () => {
    mount(<Example />);

    cy.contains('4-1').focus().realPress(['Control', 'Home']);
    cy.focused().should('have.text', 'header-1');
  });

  it('should move to last cell in last row with CTRL+Home', () => {
    mount(<Example />);

    cy.contains('4-1').focus().realPress(['Control', 'End']);
    cy.focused().should('have.text', '7-3');
  });

  const NestedFocusableExample = () => (
    <DataGrid items={testItems} columns={testColumns}>
      <DataGridHeader>
        <DataGridRow<Item>>{({ renderHeaderCell }) => <DataGridCell>{renderHeaderCell()}</DataGridCell>}</DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item }) => (
          <DataGridRow<Item>>
            {({ renderCell }) => (
              <DataGridCell focusMode="group">
                <button>{renderCell(item)}-1</button>
                <button>{renderCell(item)}-2</button>
              </DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );

  it('should use focusable group for cells', () => {
    mount(<NestedFocusableExample />);

    cy.contains('1-1-11-1-2').focus().realPress('Enter');
    cy.focused().should('have.text', '1-1-1').realPress('Tab');
    cy.focused().should('have.text', '1-1-2').realPress('Tab');
    cy.focused().should('have.text', '1-1-1').realPress('ArrowDown');
    cy.focused().should('have.text', '1-1-1').realPress('ArrowUp');
    cy.focused().should('have.text', '1-1-1').realPress('ArrowLeft');
    cy.focused().should('have.text', '1-1-1').realPress('ArrowRight');
    cy.focused().should('have.text', '1-1-1').realPress('Escape');
    cy.focused().should('have.text', '1-1-11-1-2').realPress('ArrowRight');
    cy.focused().should('have.text', '1-2-11-2-2');
  });
});
