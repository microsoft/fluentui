import * as React from 'react';
import { act, fireEvent, render, within } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { isConformant } from '../../testing/isConformant';
import { List } from './List';
import type { ListProps } from './List.types';
import { ListItem } from '../ListItem/ListItem';
import type { ListItemActionEventData } from '../ListItem/ListItem.types';
import type { EventHandler } from '@fluentui/react-utilities';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { useListBase_unstable } from './useList';

function expectListboxItemSelected(item: HTMLElement, selected: boolean) {
  expect(item.getAttribute('aria-selected')).toBe(selected.toString());
}
function expectListboxItemAriaDisabledValue(item: HTMLElement, expected: string | null) {
  expect(item.getAttribute('aria-disabled')).toBe(expected);
}

// React 19 wraps render-time errors into an AggregateError with empty message.
// This helper extracts nested messages so we can assert reliably across React versions.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorMessages(err: any): string[] {
  if (!err) {
    return [];
  }
  const messages: string[] = [];
  if (typeof err.message === 'string') {
    messages.push(err.message);
  }
  if (Array.isArray(err.errors)) {
    for (const inner of err.errors) {
      messages.push(...getErrorMessages(inner));
    }
  }
  if (err.cause) {
    messages.push(...getErrorMessages(err.cause));
  }
  return messages;
}

function expectRenderToThrowWithMessage(ui: React.ReactElement, expectedSubstring: string) {
  let thrown: unknown;
  try {
    render(ui);
  } catch (e) {
    thrown = e;
  }
  expect(thrown).toBeDefined();
  const messages = getErrorMessages(thrown);
  expect(messages.join('\n')).toContain(expectedSubstring);
}

describe('List', () => {
  isConformant({
    Component: List as React.FunctionComponent<ListProps>,
    displayName: 'List',
  });

  // Mock the console.warn, because we're getting the legitimate about mismatched roles when testing custom roles
  // and false warnings about the mismatched roles because of tabster not working reliably in tests.
  const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => jest.fn());

  afterEach(() => {
    resetIdsForTests();
  });

  afterAll(() => {
    consoleWarn.mockRestore();
    jest.clearAllMocks();
  });

  describe('useListBase_unstable', () => {
    it('preserves list role and selection metadata in headless mode', () => {
      const ref = React.createRef<HTMLUListElement | HTMLDivElement | HTMLOListElement>();
      const { result } = renderHook(() =>
        useListBase_unstable({ role: 'listbox', selectionMode: 'single', selectedItems: ['value-1'] }, ref),
      );

      expect(result.current.root).toMatchObject({
        role: 'listbox',
      });
      expect(result.current.root['aria-multiselectable']).toBeUndefined();
      expect(result.current.listItemRole).toBe('option');
      expect(result.current.selection?.isSelected('value-1')).toBe(true);
      expect(result.current.root).not.toHaveProperty('data-tabster');
    });

    it('preserves composite roles without adding navigation attributes', () => {
      const { result } = renderHook(() => useListBase_unstable({ navigationMode: 'composite' }, React.createRef()));

      expect(result.current.root.role).toBe('grid');
      expect(result.current.listItemRole).toBe('row');
      expect(result.current.navigationMode).toBe('composite');
      expect(result.current.selection).toBeUndefined();
      expect(result.current.root).not.toHaveProperty('data-tabster');
    });

    it('validates plain DOM items without throwing', () => {
      const ref = React.createRef<HTMLUListElement | HTMLDivElement | HTMLOListElement>();
      const { result } = renderHook(() => useListBase_unstable({ selectionMode: 'single' }, ref));
      const { getByRole } = render(
        <ul role="listbox">
          <li role="option">Item</li>
        </ul>,
      );

      expect(() => result.current.validateListItem(getByRole('option'))).not.toThrow();
    });

    it.each([
      <input key="checkmark" type="checkbox" tabIndex={-1} aria-label="Select item" />,
      <input key="hidden" type="hidden" />,
      <button key="disabled" disabled tabIndex={0}>
        Disabled action
      </button>,
    ])('does not treat non-tabbable controls as actionable children (%#)', child => {
      const { result } = renderHook(() => useListBase_unstable({ selectionMode: 'single' }, React.createRef()));
      const { getByRole } = render(
        <ul role="listbox">
          <li role="option">{child}</li>
        </ul>,
      );
      consoleWarn.mockClear();

      result.current.validateListItem(getByRole('option'));

      expect(consoleWarn).not.toHaveBeenCalled();
    });

    it('detects actionable children using the DOM', () => {
      const { result } = renderHook(() => useListBase_unstable({ selectionMode: 'single' }, React.createRef()));
      const { getByRole } = render(
        <ul role="listbox">
          <li role="option">
            <button>Secondary action</button>
          </li>
        </ul>,
      );
      consoleWarn.mockClear();

      result.current.validateListItem(getByRole('option'));

      expect(consoleWarn).toHaveBeenCalledWith(expect.stringContaining('expected role "grid"'));
    });

    it.each(['', 'true', 'TRUE', 'plaintext-only', 'PLAINTEXT-ONLY'])(
      'detects keyboard-focusable editing hosts (%s)',
      contentEditable => {
        const { result } = renderHook(() => useListBase_unstable({ selectionMode: 'single' }, React.createRef()));
        const { getByRole, getByTestId } = render(
          <ul role="listbox">
            <li role="option">
              <div data-testid="editor" />
            </li>
          </ul>,
        );
        getByTestId('editor').setAttribute('contenteditable', contentEditable);
        consoleWarn.mockClear();

        result.current.validateListItem(getByRole('option'));

        expect(consoleWarn).toHaveBeenCalledWith(expect.stringContaining('expected role "grid"'));
      },
    );

    it.each(['false', 'FALSE', 'inherit', 'invalid'])(
      'does not treat non-editing values as focusable hosts (%s)',
      contentEditable => {
        const { result } = renderHook(() => useListBase_unstable({ selectionMode: 'single' }, React.createRef()));
        const { getByRole, getByTestId } = render(
          <ul role="listbox">
            <li role="option">
              <div data-testid="editor" />
            </li>
          </ul>,
        );
        getByTestId('editor').setAttribute('contenteditable', contentEditable);
        consoleWarn.mockClear();

        result.current.validateListItem(getByRole('option'));

        expect(consoleWarn).not.toHaveBeenCalled();
      },
    );

    it.each([
      <div key="negative-tabindex" contentEditable tabIndex={-1} />,
      <div key="hidden" contentEditable="plaintext-only" hidden />,
    ])('ignores non-tabbable editing hosts (%#)', child => {
      const { result } = renderHook(() => useListBase_unstable({ selectionMode: 'single' }, React.createRef()));
      const { getByRole } = render(
        <ul role="listbox">
          <li role="option">{child}</li>
        </ul>,
      );
      consoleWarn.mockClear();

      result.current.validateListItem(getByRole('option'));

      expect(consoleWarn).not.toHaveBeenCalled();
    });

    it('detects explicitly tabbed non-editing hosts', () => {
      const { result } = renderHook(() => useListBase_unstable({ selectionMode: 'single' }, React.createRef()));
      const { getByRole } = render(
        <ul role="listbox">
          <li role="option">
            <div contentEditable={false} tabIndex={0} />
          </li>
        </ul>,
      );
      consoleWarn.mockClear();

      result.current.validateListItem(getByRole('option'));

      expect(consoleWarn).toHaveBeenCalledWith(expect.stringContaining('expected role "grid"'));
    });

    it('does not inspect the DOM when validating in production', () => {
      const { result } = renderHook(() => useListBase_unstable({}, React.createRef()));
      const { getByRole } = render(
        <ul>
          <li>Item</li>
        </ul>,
      );
      const listItem = getByRole('listitem');
      const querySelector = jest.spyOn(listItem, 'querySelector');
      const querySelectorAll = jest.spyOn(listItem, 'querySelectorAll');
      const originalEnvironment = process.env.NODE_ENV;

      try {
        process.env.NODE_ENV = 'production';
        result.current.validateListItem(listItem);

        expect(querySelector).not.toHaveBeenCalled();
        expect(querySelectorAll).not.toHaveBeenCalled();
      } finally {
        process.env.NODE_ENV = originalEnvironment;
        querySelector.mockRestore();
        querySelectorAll.mockRestore();
      }
    });
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
        expectRenderToThrowWithMessage(
          <List as="div">
            <ListItem value="test-value-1">First ListItem</ListItem>
            <ListItem value="test-value-2">Second ListItem</ListItem>
          </List>,
          'ListItem cannot be rendered as a li when its parent is a div.',
        );
      });

      it('ul and div throws', () => {
        expectRenderToThrowWithMessage(
          <List>
            <ListItem as="div" value="test-value-1">
              First ListItem
            </ListItem>
            <ListItem as="div" value="test-value-2">
              Second ListItem
            </ListItem>
          </List>,
          'ListItem cannot be rendered as a div when its parent is not a div.',
        );
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

      it("div by default when navigationMode is 'composite'", () => {
        const result = render(
          <List navigationMode="composite">
            <ListItem value="test-value-1">First ListItem</ListItem>
            <ListItem value="test-value-2">Second ListItem</ListItem>
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
        <List selectionMode="multiselect" role="test">
          <ListItem role="foo">First ListItem</ListItem>
          <ListItem role="foo">Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('test')).toHaveLength(1);
      expect(result.getAllByRole('foo')).toHaveLength(2);
    });

    it('custom - should have passed roles when when navigationMode is "items"', () => {
      const result = render(
        <List selectionMode="multiselect" navigationMode="items" role="test">
          <ListItem role="foo">First ListItem</ListItem>
          <ListItem role="foo">Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('test')).toHaveLength(1);
      expect(result.getAllByRole('foo')).toHaveLength(2);
    });

    it('custom - should have passed roles when when navigationMode is "composite"', () => {
      const result = render(
        <List selectionMode="multiselect" navigationMode="composite" role="test">
          <ListItem role="foo">First ListItem</ListItem>
          <ListItem role="foo">Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('test')).toHaveLength(1);
      expect(result.getAllByRole('foo')).toHaveLength(2);
    });

    it('navigationMode = items - should have list/listitem roles', () => {
      const result = render(
        <List navigationMode="items">
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('list')).toHaveLength(1);
      expect(result.getAllByRole('listitem')).toHaveLength(2);
    });

    it('navigationMode = items with selection- should have listbox/option roles', () => {
      const result = render(
        <List navigationMode="items" selectionMode="single">
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('listbox')).toHaveLength(1);
      expect(result.getAllByRole('option')).toHaveLength(2);
    });
    it('navigationMode = composite should have grid/row roles', () => {
      const result = render(
        <List navigationMode="composite">
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('grid')).toHaveLength(1);
      expect(result.getAllByRole('row')).toHaveLength(2);
    });
    it('navigationMode = composite with selection should have grid/row roles', () => {
      const result = render(
        <List navigationMode="composite" selectionMode="single">
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      expect(result.getAllByRole('grid')).toHaveLength(1);
      expect(result.getAllByRole('row')).toHaveLength(2);
    });
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

      fireEvent.click(firstItem);
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, false);

      fireEvent.click(secondItem);
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

      fireEvent.click(firstItem);
      // [x][ ]
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, false);

      fireEvent.click(secondItem);
      // [x][x]
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, true);

      fireEvent.click(secondItem);
      // [x][ ]
      expectListboxItemSelected(firstItem, true);
      expectListboxItemSelected(secondItem, false);

      fireEvent.click(firstItem);
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
      it('Click should trigger onAction', () => {
        const onAction = jest.fn();

        const result = render(
          <List>
            <ListItem onAction={onAction}>First ListItem</ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        firstItem.click();
        expect(onAction).toHaveBeenCalledTimes(1);
      });
      it('onAction should be called with the value', () => {
        const onAction = jest.fn();

        const result = render(
          <List>
            <ListItem onAction={onAction} value="first-item">
              First ListItem
            </ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        firstItem.click();
        expect(onAction).toHaveBeenCalledWith(expect.any(Object), {
          event: expect.any(Object),
          type: 'ListItemAction',
          value: 'first-item',
        });
      });
    });

    describe('with selection', () => {
      function interactWithFirstElement(
        interaction: (firstItem: HTMLElement) => void,
        customAction?: EventHandler<ListItemActionEventData>,
        disabledSelection?: boolean,
      ) {
        const onAction = jest.fn(customAction);

        const result = render(
          <List selectionMode="multiselect">
            <ListItem onAction={customAction ? onAction : undefined} disabledSelection={disabledSelection}>
              First ListItem
            </ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        act(() => {
          interaction(firstItem);
        });

        return { listItem: firstItem, onAction };
      }

      it('Click should trigger selection and onAction callback by default', () => {
        const { listItem, onAction } = interactWithFirstElement(
          item => item.click(),
          () => null,
        );
        expect(onAction).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, true);
      });

      it('preventDefault should prevent selection', () => {
        const { listItem, onAction } = interactWithFirstElement(
          item => item.click(),
          e => e.preventDefault(),
        );
        expect(onAction).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, false);
      });

      it("Click on the checkbox should trigger selection, onAction shouldn't be called", () => {
        const { listItem, onAction } = interactWithFirstElement(item => {
          within(item).getByRole('checkbox').click();
        });
        expect(onAction).not.toHaveBeenCalled();
        expectListboxItemSelected(listItem, true);
      });

      it('Click should not toggle selection if disabledSelection is true, aria-disabled should be true', () => {
        const { listItem } = interactWithFirstElement(item => item.click(), undefined, true);
        expectListboxItemSelected(listItem, false);
        expectListboxItemAriaDisabledValue(listItem, 'true');
      });

      it('Click should not toggle selection if disabledSelection is true, aria-disabled should be false when custom action is present', () => {
        const { listItem, onAction } = interactWithFirstElement(
          item => item.click(),
          () => null,
          true,
        );
        expect(onAction).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, false);
        expectListboxItemAriaDisabledValue(listItem, null);
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
    it('should be focusable when "navigationMode" is "items"', () => {
      const result = render(
        <List navigationMode="items">
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
        </List>,
      );

      const firstItem = result.getByText('First ListItem');
      firstItem.focus();
      expect(document.activeElement).toBe(firstItem);
    });

    it('should be focusable when "navigationMode" is "composite"', () => {
      const result = render(
        <List navigationMode="composite">
          <ListItem>First ListItem</ListItem>
          <ListItem>Second ListItem</ListItem>
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
        const onAction = jest.fn();

        const result = render(
          <List>
            <ListItem onAction={onAction} value="first-item">
              First ListItem
            </ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        fireEvent.keyDown(firstItem, { key });
        return { onAction };
      }

      it('should NOT trigger onClick when random key is pressed', () => {
        expect(pressKeyOnListItem('a').onAction).toHaveBeenCalledTimes(0);
      });
      it('Space should trigger onClick', () => {
        expect(pressKeyOnListItem(' ').onAction).toHaveBeenCalledTimes(1);
      });
      it('Enter should trigger onClick', () => {
        expect(pressKeyOnListItem('Enter').onAction).toHaveBeenCalledTimes(1);
      });
      it('onAction should be called with list item value', () => {
        expect(pressKeyOnListItem('Enter').onAction).toHaveBeenCalledWith(expect.any(Object), {
          event: expect.any(Object),
          type: 'ListItemAction',
          value: 'first-item',
        });
      });
    });

    describe('with selection', () => {
      function pressOnListItem(key: string, customOnAction?: EventHandler<ListItemActionEventData>) {
        const onAction = jest.fn(customOnAction);

        const result = render(
          <List selectionMode="multiselect">
            <ListItem onAction={onAction}>First ListItem</ListItem>
            <ListItem>Second ListItem</ListItem>
          </List>,
        );

        const firstItem = result.getByText('First ListItem');
        fireEvent.keyDown(firstItem, { key });
        return { onAction, listItem: firstItem };
      }

      it('Spacebar toggles selection by default, onClick is not called', () => {
        const { onAction, listItem } = pressOnListItem(' ');
        expect(onAction).not.toHaveBeenCalled();
        expectListboxItemSelected(listItem, true);
      });

      it('Enter toggles selection by default, onClick is called', () => {
        const { onAction, listItem } = pressOnListItem('Enter');
        expect(onAction).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, true);
      });
      it("Enter doesn't toggle selection if default is prevented", () => {
        const { onAction, listItem } = pressOnListItem('Enter', e => e.preventDefault());
        expect(onAction).toHaveBeenCalledTimes(1);
        expectListboxItemSelected(listItem, false);
      });
    });
  });

  it('renders and validates an explicit ordered list with an explicit list item', () => {
    const { getByRole } = render(
      <List as="ol">
        <ListItem as="li">Item</ListItem>
      </List>,
    );

    expect(getByRole('list').tagName).toBe('OL');
    expect(getByRole('listitem').tagName).toBe('LI');
  });
});
