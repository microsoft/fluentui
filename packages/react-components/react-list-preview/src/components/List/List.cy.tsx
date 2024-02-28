import * as React from 'react';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { List } from './List';
import { ListItem } from '../ListItem';

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
    <List>
      <ListItem tabIndex={0} data-test="list-item-1">
        List Item 1
      </ListItem>
      <ListItem tabIndex={0} data-test="list-item-2">
        List Item 2
      </ListItem>
      <ListItem tabIndex={0} data-test="list-item-3">
        List Item 3
      </ListItem>
    </List>,
  );
};

const mountListWithSecondaryActions = () => {
  mount(
    <List>
      <ListItem tabIndex={0} data-test="list-item-1">
        List Item 1<button data-test="list-item-1-button-1">1:button1</button>
        <button data-test="list-item-1-button-2">1:button2</button>
      </ListItem>
      <ListItem tabIndex={0} data-test="list-item-2">
        List Item 2<button data-test="list-item-2-button-1">2:button1</button>
        <button data-test="button-2-2">2:button2</button>
      </ListItem>
      <ListItem tabIndex={0} data-test="list-item-3">
        List Item 3<button data-test="button-3-1">3:button1</button>
        <button data-test="button-3-2">3:button2</button>
      </ListItem>
    </List>,
  );
};

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
});
