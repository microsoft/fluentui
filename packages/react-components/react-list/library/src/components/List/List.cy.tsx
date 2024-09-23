import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { List } from './List';
import { ListItem } from '../ListItem';
import { SelectionItemId } from '@fluentui/react-utilities';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

/**
 * Validates focus movement based on the sequence of keybaord commands
 * Use focused:<data-test> to validate the focused element after a given step
 * @param sequence - Array of commands to execute
 * @example
 * testSequence([
 *  'focused:list-item-1',
 *  'DownArrow',
 *  'focused:list-item-2',
 * ])
 */
const testSequence = (sequence: Array<string>) => {
  cy.get('li:first-of-type').focus();
  for (const command of sequence) {
    if (command.startsWith('focused:')) {
      const tid = command.split(':')[1];
      cy.focused().should('have.attr', 'data-test', tid);
    } else {
      cy.focused().type(`{${command}}`);
    }
  }
};

const mountSimpleList = () => {
  mount(
    <List navigationMode="items">
      <ListItem data-test="list-item-1">List Item 1</ListItem>
      <ListItem data-test="list-item-2">List Item 2</ListItem>
      <ListItem data-test="list-item-3">List Item 3</ListItem>
    </List>,
  );
};

const mountListWithSecondaryActions = () => {
  mount(
    <List navigationMode="composite">
      <ListItem data-test="list-item-1">
        List Item 1<button data-test="list-item-1-button-1">1:button1</button>
        <button data-test="list-item-1-button-2">1:button2</button>
      </ListItem>
      <ListItem data-test="list-item-2">
        List Item 2<button data-test="list-item-2-button-1">2:button1</button>
        <button data-test="button-2-2">2:button2</button>
      </ListItem>
      <ListItem data-test="list-item-3">
        List Item 3<button data-test="button-3-1">3:button1</button>
        <button data-test="button-3-2">3:button2</button>
      </ListItem>
    </List>,
  );
};

type SelectionTestListProps = {
  selectionMode: React.ComponentProps<typeof List>['selectionMode'];
  defaultSelectedItems?: React.ComponentProps<typeof List>['defaultSelectedItems'];
  controlled?: boolean;
};

const SelectionTestList = ({ selectionMode, defaultSelectedItems, controlled }: SelectionTestListProps) => {
  const [selectedItems, setSelectedItems] = React.useState(defaultSelectedItems || []);

  const onChange = React.useCallback((_, { selectedItems: selected }) => {
    setSelectedItems(selected);
  }, []);

  const onSelectLastClick = React.useCallback(_ => {
    setSelectedItems(['list-item-3']);
  }, []);

  return (
    <>
      <List
        navigationMode="items"
        selectionMode={selectionMode}
        defaultSelectedItems={controlled ? undefined : defaultSelectedItems}
        selectedItems={controlled ? selectedItems : undefined}
        onSelectionChange={onChange}
      >
        <ListItem value="list-item-1" data-test="list-item-1">
          List Item 1
        </ListItem>
        <ListItem value="list-item-2" data-test="list-item-2">
          List Item 2
        </ListItem>
        <ListItem value="list-item-3" data-test="list-item-3">
          List Item 3
        </ListItem>
      </List>
      <button data-test="select-last-item" onClick={onSelectLastClick}>
        Select Last Item
      </button>
      <div data-test="selected-items">{JSON.stringify(selectedItems)}</div>
    </>
  );
};

const mountListForSelection = (
  selectionMode: 'single' | 'multiselect',
  defaultSelectedItems?: Array<SelectionItemId>,
  controlled?: boolean,
) => {
  mount(
    <SelectionTestList
      selectionMode={selectionMode}
      defaultSelectedItems={defaultSelectedItems}
      controlled={controlled}
    />,
  );
};

/**
 * Validates the state of the list items based on the expected states.
 * It checks:
 *  - aria-selected attribute on each item
 *  - checkbox state on each item
 *  - presence of the item in the parent state
 *
 * @param expectedStates - Array of boolean values representing the expected state of the list items
 */
const validateSetOfListItems = (expectedStates: Array<boolean>) =>
  expectedStates.forEach((checked, index) => {
    const listItem = cy.get(`[data-test="list-item-${index + 1}"]`);
    cy.log('Validate aria-selected attr on item', index + 1);
    listItem.should('have.attr', 'aria-selected', checked.toString());

    cy.log('Validate checkbox state on item', index + 1);
    cy.get(`[data-test="list-item-${index + 1}"] .fui-Checkbox__indicator > svg`).should(
      checked ? 'exist' : 'not.exist',
    );

    cy.log('Validate that the item is present/not present in the parent state (or stringified state)');
    cy.get(`[data-test="selected-items"]`).should(checked ? 'contain' : 'not.contain', `list-item-${index + 1}`);
  });

/** Toggles list item based on "shortId" - just a number
 * @param shortId - Short id of the list item
 * @example
 * toggleListItem('1');
 */
const toggleListItem = (shortId: String) => cy.get(`[data-test="list-item-${shortId}"]`).click();

/**
 * Toggles the last item in the list
 * Useful for testing that the controlled selection works as expected, as we change the state from the parent
 * component and expect the list to reflect the change.
 * @returns
 */
const selectOnlyLastItem = () => cy.get(`[data-test="select-last-item"]`).click();

describe('List', () => {
  describe('keyboard navigation', () => {
    describe('Simple list with a single action', () => {
      it('Up/Down arrow keys work', () => {
        mountSimpleList();
        testSequence([
          'focused:list-item-1',
          'DownArrow',
          'focused:list-item-2',
          'DownArrow',
          'focused:list-item-3',
          'DownArrow',
          'focused:list-item-3',
          'UpArrow',
          'focused:list-item-2',
          'UpArrow',
          'focused:list-item-1',
          'UpArrow',
          'focused:list-item-1',
        ]);
      });

      it('Home/End arrow keys work', () => {
        mountSimpleList();
        testSequence(['focused:list-item-1', 'End', 'focused:list-item-3', 'Home', 'focused:list-item-1']);
      });

      it('PgUp/PgDown arrow keys work', () => {
        mountSimpleList();
        testSequence(['focused:list-item-1', 'PageDown', 'focused:list-item-3', 'PageUp', 'focused:list-item-1']);
      });
    });
    describe('List with multiple actions', () => {
      it('Up/Down arrows work', () => {
        mountListWithSecondaryActions();
        testSequence([
          'focused:list-item-1',
          'DownArrow',
          'focused:list-item-2',
          'DownArrow',
          'focused:list-item-3',
          'DownArrow',
          'focused:list-item-3',
          'UpArrow',
          'focused:list-item-2',
          'UpArrow',
          'focused:list-item-1',
          'UpArrow',
          'focused:list-item-1',
        ]);
      });

      it('Home/End arrow keys work', () => {
        mountListWithSecondaryActions();
        testSequence(['focused:list-item-1', 'End', 'focused:list-item-3', 'Home', 'focused:list-item-1']);
      });

      it('PgUp/PgDown arrow keys work', () => {
        mountListWithSecondaryActions();
        testSequence(['focused:list-item-1', 'PageDown', 'focused:list-item-3', 'PageUp', 'focused:list-item-1']);
      });

      it('Left/Right arrow key moves focus horizontally in the list item', () => {
        mountListWithSecondaryActions();
        testSequence([
          'focused:list-item-1',
          'RightArrow',
          'focused:list-item-1-button-1',
          'RightArrow',
          'focused:list-item-1-button-2',
          'RightArrow',
          'focused:list-item-1-button-2',
          'LeftArrow',
          'focused:list-item-1-button-1',
          'LeftArrow',
          'focused:list-item-1',
        ]);
      });

      it('Escape moves out of the secondary and focuses on the same row', () => {
        mountListWithSecondaryActions();
        testSequence([
          'focused:list-item-1',
          'RightArrow',
          'focused:list-item-1-button-1',
          'RightArrow',
          'focused:list-item-1-button-2',
          'Esc',
          'focused:list-item-1',
        ]);
      });

      it('Arrow up/down on the secondary action focuses the item above/below', () => {
        mountListWithSecondaryActions();
        testSequence([
          'focused:list-item-1',
          'DownArrow',
          'RightArrow',
          'focused:list-item-2-button-1',
          'UpArrow',
          'focused:list-item-1',
          'DownArrow',
          'RightArrow',
          'focused:list-item-2-button-1',
          'DownArrow',
          'focused:list-item-3',
        ]);
      });

      it('Keys like Enter and Space are ignored', () => {
        mountListWithSecondaryActions();
        testSequence(['RightArrow', 'focused:list-item-1-button-1', 'Enter', ' ', 'focused:list-item-1-button-1']);
      });
    });
  });

  describe('selection', () => {
    describe('single select', () => {
      it('selects the item when clicked', () => {
        mountListForSelection('single');
        validateSetOfListItems([false, false, false]);
        toggleListItem('1');
        validateSetOfListItems([true, false, false]);
        toggleListItem('2');
        validateSetOfListItems([false, true, false]);
      });

      it('uncontrolled selection with defaultSelectedItems works', () => {
        mountListForSelection('single', ['list-item-2']);
        validateSetOfListItems([false, true, false]);
        toggleListItem('3');
        validateSetOfListItems([false, false, true]);
      });

      it('controlled selection works', () => {
        mountListForSelection('single', ['list-item-2'], true);
        validateSetOfListItems([false, true, false]);
        toggleListItem('1');
        validateSetOfListItems([true, false, false]);
        selectOnlyLastItem();
        validateSetOfListItems([false, false, true]);
      });
    });

    describe('multi select', () => {
      it('selects the item when clicked', () => {
        mountListForSelection('multiselect');
        validateSetOfListItems([false, false, false]);
        toggleListItem('1');
        validateSetOfListItems([true, false, false]);
        toggleListItem('2');
        validateSetOfListItems([true, true, false]);
      });

      it('uncontrolled selection with defaultSelectedItems works', () => {
        mountListForSelection('multiselect', ['list-item-2']);
        validateSetOfListItems([false, true, false]);
        toggleListItem('3');
        validateSetOfListItems([false, true, true]);
        toggleListItem('2');
        validateSetOfListItems([false, false, true]);
        toggleListItem('1');
        validateSetOfListItems([true, false, true]);
      });

      it('controlled selection works', () => {
        mountListForSelection('multiselect', ['list-item-2'], true);
        validateSetOfListItems([false, true, false]);
        toggleListItem('1');
        validateSetOfListItems([true, true, false]);
        selectOnlyLastItem();
        validateSetOfListItems([false, false, true]);
        toggleListItem('2');
        validateSetOfListItems([false, true, true]);
      });
    });
  });

  describe('Accessibility roles', () => {
    describe('without focusable children', () => {
      it('default list is list/listitem', () => {
        mountSimpleList();
        cy.get('ul').should('have.attr', 'role', 'list');
        cy.get('li').should('have.attr', 'role', 'listitem');
      });

      it("single select list is listbox/option and doesn't have multiselectable aria prop", () => {
        mount(
          <List selectionMode="single">
            <ListItem data-test="list-item-1">List Item 1</ListItem>
            <ListItem data-test="list-item-2">List Item 2</ListItem>
            <ListItem data-test="list-item-3">List Item 3</ListItem>
          </List>,
        );
        cy.get('ul').should('have.attr', 'role', 'listbox');
        cy.get('li').should('have.attr', 'role', 'option');
      });

      it('multiple select list is listbox/option and has multiselectable aria prop', () => {
        mount(
          <List selectionMode="multiselect">
            <ListItem data-test="list-item-1">List Item 1</ListItem>
            <ListItem data-test="list-item-2">List Item 2</ListItem>
            <ListItem data-test="list-item-3">List Item 3</ListItem>
          </List>,
        );
        cy.get('ul').should('have.attr', 'aria-multiselectable', 'true');
        cy.get('ul').should('have.attr', 'role', 'listbox');
        cy.get('li').should('have.attr', 'role', 'option');
      });

      it('custom roles work', () => {
        mount(
          <List selectionMode="multiselect" role="customListRole">
            <ListItem data-test="list-item-1" role="customListItemRole">
              List Item 1
            </ListItem>
            <ListItem data-test="list-item-2" role="customListItemRole">
              List Item 2
            </ListItem>
            <ListItem data-test="list-item-3" role="customListItemRole">
              List Item 3
            </ListItem>
          </List>,
        );
        cy.get('ul').should('have.attr', 'role', 'customListRole');
        cy.get('li').should('have.attr', 'role', 'customListItemRole');
      });
    });

    describe('with focusable children', () => {
      it('default list is grid/row for composite', () => {
        mount(
          <List navigationMode="composite">
            <ListItem data-test="list-item-1">
              List Item 1<button>Button 1</button>
            </ListItem>
            <ListItem data-test="list-item-2">
              List Item 2<button>Button 2</button>
            </ListItem>
            <ListItem data-test="list-item-3">
              List Item 3<button>Button 3</button>
            </ListItem>
          </List>,
        );
        cy.get('ul').should('have.attr', 'role', 'grid');
        cy.get('li').should('have.attr', 'role', 'row');
      });

      it("single select list is grid/row and doesn't have multiselectable aria prop", () => {
        mount(
          <List selectionMode="single" navigationMode="composite">
            <ListItem data-test="list-item-1">
              List Item 1<button>Button 1</button>
            </ListItem>
            <ListItem data-test="list-item-2">
              List Item 2<button>Button 2</button>
            </ListItem>
            <ListItem data-test="list-item-3">
              List Item 3<button>Button 3</button>
            </ListItem>
          </List>,
        );
        cy.get('ul').should('have.attr', 'role', 'grid');
        cy.get('li').should('have.attr', 'role', 'row');
      });

      it('multiple select list is grid/row and has multiselectable aria prop', () => {
        mount(
          <List selectionMode="multiselect" navigationMode="composite">
            <ListItem data-test="list-item-1">
              List Item 1<button>Button 1</button>
            </ListItem>
            <ListItem data-test="list-item-2">
              List Item 2<button>Button 2</button>
            </ListItem>
            <ListItem data-test="list-item-3">
              List Item 3<button>Button 3</button>
            </ListItem>
          </List>,
        );
        cy.get('ul').should('have.attr', 'aria-multiselectable', 'true');
        cy.get('ul').should('have.attr', 'role', 'grid');
        cy.get('li').should('have.attr', 'role', 'row');
      });
    });
  });
});
