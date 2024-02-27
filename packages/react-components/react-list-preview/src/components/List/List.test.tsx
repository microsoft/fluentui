import '@testing-library/jest-dom';

import * as React from 'react';
import { fireEvent, prettyDOM, render, waitFor, within } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';
import { ListProps } from './List.types';
import { ListItem } from '../ListItem/ListItem';
import { EventHandler } from 'react';
import userEvent from '@testing-library/user-event';

function expectListboxItemSelected(item: HTMLElement, selected: boolean) {
  expect(item.getAttribute('aria-selected')).toBe(selected.toString());
}

describe('List', () => {
  isConformant({
    Component: List as React.FunctionComponent<ListProps>,
    displayName: 'List',
    testOptions: {
      'consistent-callback-args': {
        // onSelectionChange has an eventArgument which is React.SyntheticEvent. This throws an error during testing
        ignoreProps: ['onSelectionChange'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <List>
        <ListItem value="test-value-1">First ListItem</ListItem>
        <ListItem value="test-value-2">Second ListItem</ListItem>
      </List>,
    );
    expect(result.container).toMatchSnapshot();
  });

  describe('roles', () => {
    it('default - should have list/listitem roles', () => {
      const result = render(
        <List>
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('list')).toHaveLength(1);
      expect(result.getAllByRole('listitem')).toHaveLength(2);
    });

    it('selectable - should have listbox/option roles', () => {
      const result = render(
        <List selectable>
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('listbox')).toHaveLength(1);
      expect(result.getAllByRole('option')).toHaveLength(2);
    });

    // TODO: Add more tests for multiple action once those components are created
  });

  describe('selection', () => {
    it('Single mode should unselect previous', () => {
      const result = render(
        <List selectable selectionMode="single">
          <ListItem value="test-value-1">First ListItem</ListItem>
          <ListItem value="test-value-2">Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      const secondItem = result.getByText('Second ListItem');

      expectListboxItemSelected(firstItem, false);
      expectListboxItemSelected(secondItem, false);

      firstItem.click();
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, false);

      secondItem.click();
      expectListboxItemSelected(firstItem, false);
      expectListboxItemSelected(secondItem, true);
    });

    it('Multi mode should select an item when clicked', () => {
      const result = render(
        <List selectable selectionMode="multiselect">
          <ListItem value="test-value-1">First ListItem</ListItem>
          <ListItem value="test-value-2">Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      const secondItem = result.getByText('Second ListItem');

      // [ ][ ]
      expectListboxItemSelected(firstItem, false);
      expectListboxItemSelected(secondItem, false);

      firstItem.click();
      // [x][ ]
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, false);

      secondItem.click();
      // [x][x]
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, true);

      secondItem.click();
      // [x][ ]
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, false);

      firstItem.click();
      // [ ][ ]
      expectListboxItemSelected(firstItem, false);
      expectListboxItemSelected(secondItem, false);
    });
  });

  describe('mouse behavior', () => {
    describe('no selection', () => {
      it('Click should trigger onClick', () => {
        const onClick = jest.fn();

        const result = render(
          <List>
            <ListItem onClick={onClick}>First ListItem</ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        firstItem.click();
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('with selection', () => {
      function interactWithFirstElement(
        interaction: (firstItem: HTMLElement) => void,
        customOnclick?: EventHandler<React.SyntheticEvent<HTMLElement>>,
      ) {
        const onClick = jest.fn(customOnclick);

        const result = render(
          <List selectable selectionMode="multiselect">
            <ListItem onClick={onClick}>First ListItem</ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        interaction(firstItem);

        return { listItem: firstItem, onClick };
      }

      it('Click should trigger selection and callback by default', () => {
        const { listItem, onClick } = interactWithFirstElement(item => item.click());
        expect(onClick).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, true);
      });

      it('preventDefault should prevent selection', () => {
        const { listItem, onClick } = interactWithFirstElement(
          item => item.click(),
          e => e.preventDefault(),
        );
        expect(onClick).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, false);
      });

      it("Click on the checkbox should trigger selection, onClick shouldn't be called", () => {
        const { listItem, onClick } = interactWithFirstElement(item => {
          within(item).getByRole('checkbox').click();
        });
        expect(onClick).not.toHaveBeenCalled();
        expectListboxItemSelected(listItem, true);
      });
    });
  });

  describe('focusable list items', () => {
    it('should not be focusable by default', () => {
      const result = render(
        <List>
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      firstItem.focus();
      expect(document.activeElement).not.toBe(firstItem);
    });
    it('should be focusable when onClick is passed', () => {
      const result = render(
        <List>
          <ListItem onClick={() => null}>First ListItem</ListItem>
          <ListItem onClick={() => null}>Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      firstItem.focus();
      expect(document.activeElement).toBe(firstItem);
    });
    it('should be focusable when onKeyDown is passed', () => {
      const result = render(
        <List>
          <ListItem onKeyDown={() => null}>First ListItem</ListItem>
          <ListItem onKeyDown={() => null}>Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      firstItem.focus();
      expect(document.activeElement).toBe(firstItem);
    });
    it('should be focusable when list is selectable', () => {
      const result = render(
        <List selectable>
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      firstItem.focus();
      expect(document.activeElement).toBe(firstItem);
    });
    it('should be focusable when tabIndex=0 is passed', () => {
      const result = render(
        <List selectable>
          <ListItem tabIndex={0}>First ListItem</ListItem>
          <ListItem tabIndex={0}>Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      firstItem.focus();
      expect(document.activeElement).toBe(firstItem);
    });
  });

  describe('keyboard behavior', () => {
    describe('no selection', () => {
      function pressKeyOnListItem(key: string) {
        const onClick = jest.fn();

        const result = render(
          <List>
            <ListItem onClick={onClick}>First ListItem</ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        fireEvent.keyDown(firstItem, { key });
        return { onClick };
      }

      it('should NOT trigger onClick when random key is pressed', () => {
        expect(pressKeyOnListItem('a').onClick).toHaveBeenCalledTimes(0);
      });
      it('Space should trigger onClick', () => {
        expect(pressKeyOnListItem(' ').onClick).toHaveBeenCalledTimes(1);
      });
      it('Enter should trigger onClick', () => {
        expect(pressKeyOnListItem('Enter').onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('with selection', () => {
      function pressOnListItem(key: string, customOnclick?: EventHandler<React.SyntheticEvent<HTMLElement>>) {
        const onClick = jest.fn(customOnclick);

        const result = render(
          <List selectable selectionMode="multiselect">
            <ListItem onClick={onClick}>First ListItem</ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        fireEvent.keyDown(firstItem, { key });
        return { onClick, listItem: firstItem };
      }

      it('Spacebar toggles selection by default, onClick is not called', () => {
        const { onClick, listItem } = pressOnListItem(' ');
        expect(onClick).not.toHaveBeenCalled();
        expectListboxItemSelected(listItem, true);
      });

      it('Enter toggles selection by default, onClick is called', () => {
        const { onClick, listItem } = pressOnListItem('Enter');
        expect(onClick).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, true);
      });
      it("Enter doesn't toggle selection if default is prevented", () => {
        const { onClick, listItem } = pressOnListItem('Enter', e => e.preventDefault());
        expect(onClick).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, false);
      });
    });
  });
});
