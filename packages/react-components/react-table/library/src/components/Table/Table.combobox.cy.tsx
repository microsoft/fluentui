import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from '@fluentui/react-table';
import { useId, type JSXElement } from '@fluentui/react-utilities';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { Combobox, ComboboxProps, Option } from '@fluentui/react-combobox';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];

/**
 * Simple Combobox example for testing purposes that reproduces the issue described in #35520.
 * This component simulates the behavior where:
 * 1. User types text that doesn't match any options
 * 2. Combobox opens without focusing any option
 * 3. Down arrow should focus first option instead of moving to next table cell
 */
export const ComboboxExample = (props: Partial<ComboboxProps>): JSXElement => {
  const comboId = useId('combo-default');
  return (
    <Combobox aria-labelledby={comboId} placeholder="Select an animal" {...props}>
      {options.map(option => (
        <Option key={option} disabled={option === 'Ferret'}>
          {option}
        </Option>
      ))}
    </Combobox>
  );
};

const items = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns = [{ columnKey: 'file', label: 'File' }];

export const CellNavigation = (): JSXElement => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table
      {...keyboardNavAttr}
      role="grid"
      aria-label="Table with grid keyboard navigation"
      style={{ minWidth: '600px' }}
    >
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell">
              <TableCellLayout>
                <ComboboxExample />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

describe('Table with Combobox Integration Test - Issue #35520', () => {
  /**
   * This test verifies that the issue described in #35520 is fixed.
   * The core issue was that when a combobox is open in a table,
   * down arrow would move focus to next table cell instead of navigating options.
   * The tabster fix ensures combobox gets priority when open.
   */
  it('should focus first combobox option on down arrow instead of next table cell', () => {
    mount(<CellNavigation />);

    // Step 1: Focus on the combobox input without clicking
    cy.get('input[role="combobox"]').first().focus();

    // Step 2: Type a letter that does not exist in one of the options
    cy.get('input[role="combobox"]').first().type('a');

    // Step 3: Verify that the combobox input is still focused but the popover is opened
    cy.get('input[role="combobox"]').first().should('be.focused');
    cy.get('input[role="combobox"]').first().should('have.attr', 'aria-expanded', 'true');
    cy.get('[role="listbox"]').should('be.visible');

    // Step 4: Press arrow down and verify that focus goes to one of the options
    cy.get('input[role="combobox"]').first().realPress('ArrowDown');

    // Verify focus remains on the combobox input
    cy.get('input[role="combobox"]').first().should('be.focused');

    // Verify aria-activedescendant points to an option
    cy.get('input[role="combobox"]').first().should('have.attr', 'aria-activedescendant').and('not.be.empty');
  });

  it('should allow navigation between table cells when combobox is closed', () => {
    mount(<CellNavigation />);

    // Focus on the first table cell (file name)
    cy.contains('Meeting notes').click();

    // Press right arrow to move to the combobox cell
    cy.focused().realPress('ArrowRight');
    cy.get('input[role="combobox"]').first().should('be.focused');

    // Make sure combobox is closed by pressing Escape
    cy.get('input[role="combobox"]').first().realPress('Escape');
    cy.get('input[role="combobox"]').first().should('have.attr', 'aria-expanded', 'false');

    // Press left arrow to go back to the file name cell
    cy.get('input[role="combobox"]').first().realPress('ArrowLeft');

    // Should focus the file name cell again
    cy.focused().should('contain.text', 'Meeting notes');
  });

  it('should maintain combobox functionality within table grid navigation', () => {
    mount(<CellNavigation />);

    // Focus on combobox and interact with it
    cy.get('input[role="combobox"]').first().realClick();
    cy.get('input[role="combobox"]').first().type('Cat');

    // Verify combobox opened
    cy.get('input[role="combobox"]').first().should('have.attr', 'aria-expanded', 'true');

    // Clear and try a different approach - just verify basic interaction works
    cy.get('input[role="combobox"]').first().clear();
    cy.get('input[role="combobox"]').first().type('Dog');

    // Verify we can type and the combobox responds
    cy.get('input[role="combobox"]').first().should('have.value', 'Dog');

    // Press Escape to close
    cy.get('input[role="combobox"]').first().realPress('Escape');

    // Verify it closes
    cy.get('input[role="combobox"]').first().should('have.attr', 'aria-expanded', 'false');
  });
});
