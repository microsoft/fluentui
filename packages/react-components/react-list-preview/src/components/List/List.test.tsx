import * as React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';
import { ListProps } from './List.types';
import { ListItem } from '../ListItem/ListItem';
import { EventHandler } from 'react';

function expectListboxItemSelected(item: HTMLElement, selected: boolean) {
  expect(item.getAttribute('aria-selected')).toBe(selected.toString());
}

describe('List', () => {
  isConformant({
    Component: List as React.FunctionComponent<ListProps>,
    displayName: 'List',
  });

  describe('rendering', () => {
    it('renders a default state', () => {
      const result = render(
        <List>
          <ListItem value="test-value-1">First ListItem</ListItem>
          <ListItem value="test-value-2">Second ListItem</ListItem>
        </List>,
      );
      expect(result.container).toMatchSnapshot();
    });

    describe('checkbox indicator', () => {
      it("doesn't render checkbox when selectionMode is not set", () => {
        const result = render(
          <List>
            <ListItem value="test-value-1">First ListItem</ListItem>
            <ListItem value="test-value-2">Second ListItem</ListItem>
          </List>,
        );
        expect(result.queryAllByRole('checkbox')).toHaveLength(0);
      });
      it("renders checkbox when selectionMode is 'single'", () => {
        const result = render(
          <List selectionMode="single">
            <ListItem value="test-value-1">First ListItem</ListItem>
            <ListItem value="test-value-2">Second ListItem</ListItem>
          </List>,
        );
        expect(result.queryAllByRole('checkbox')).toHaveLength(2);
      });
      it("renders checkbox when selectionMode is 'multiselect'", () => {
        const result = render(
          <List selectionMode="single">
            <ListItem value="test-value-1">First ListItem</ListItem>
            <ListItem value="test-value-2">Second ListItem</ListItem>
          </List>,
        );
        expect(result.queryAllByRole('checkbox')).toHaveLength(2);
      });
    });

    describe('render as', () => {
      beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      });

      afterEach(() => {
        (console.error as jest.Mock).mockRestore();
      });
      it('div and li throws', () => {
        expect(() =>
          render(
            <List as="div">
              <ListItem value="test-value-1">First ListItem</ListItem>
              <ListItem value="test-value-2">Second ListItem</ListItem>
            </List>,
          ),
        ).toThrowError('ListItem cannot be rendered as a li when its parent is a div.');
      });

      it('ul and div throws', () => {
        expect(() =>
          render(
            <List>
              <ListItem as="div" value="test-value-1">
                First ListItem
              </ListItem>
              <ListItem as="div" value="test-value-2">
                Second ListItem
              </ListItem>
            </List>,
          ),
        ).toThrowError('ListItem cannot be rendered as a div when its parent is not a div.');
      });

      it("div and div doesn't throw", () => {
        const result = render(
          <List as="div">
            <ListItem as="div" value="test-value-1">
              First ListItem
            </ListItem>
            <ListItem as="div" value="test-value-2">
              Second ListItem
            </ListItem>
          </List>,
        );
        expect(result.container).toMatchSnapshot();
      });
    });
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
        <List selectionMode="multiselect">
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('listbox')).toHaveLength(1);
      expect(result.getAllByRole('option')).toHaveLength(2);
    });

    it('custom - should have passed roles', () => {
      const result = render(
        <List selectionMode="multiselect" role="grid">
          <ListItem role="row">First ListItem</ListItem>
          <ListItem role="row">Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('grid')).toHaveLength(1);
      expect(result.getAllByRole('row')).toHaveLength(2);
    });

    // TODO: Add more tests for multiple action once those components are created
  });

  describe('selection', () => {
    it('single select items are properly rendered with all attributes', () => {
      const result = render(
        <List selectionMode="single" defaultSelectedItems={['test-value1']}>
          <ListItem value="test-value-1">First ListItem</ListItem>
          <ListItem value="test-value-2">Second ListItem</ListItem>
        </List>,
      );

      expect(result.container).toMatchSnapshot();
    });
    it('multiselect items are properly rendered with all attributes', () => {
      const result = render(
        <List selectionMode="multiselect" defaultSelectedItems={['test-value1']}>
          <ListItem value="test-value-1">First ListItem</ListItem>
          <ListItem value="test-value-2">Second ListItem</ListItem>
        </List>,
      );

      expect(result.container).toMatchSnapshot();
    });

    it('Single mode should unselect previous', () => {
      const result = render(
        <List selectionMode="single">
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
        <List selectionMode="multiselect">
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
          <List selectionMode="multiselect">
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
        <List selectionMode="multiselect">
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
        <List selectionMode="multiselect">
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
          <List selectionMode="multiselect">
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
