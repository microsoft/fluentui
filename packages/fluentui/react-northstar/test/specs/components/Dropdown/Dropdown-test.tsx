import * as React from 'react';
import { act } from 'react-dom/test-utils';

import { renderDropdown, items, getItemIdRegexByIndex } from './test-utils';
import { Dropdown, DropdownProps } from 'src/components/Dropdown/Dropdown';
import { dropdownSelectedItemSlotClassNames } from 'src/components/Dropdown/DropdownSelectedItem';
import { implementsShorthandProp, isConformant } from 'test/specs/commonTests';
import { implementsPopperProps } from 'test/specs/commonTests/implementsPopperProps';
import { createTestContainer, findIntrinsicElement } from 'test/utils';
import { DropdownItemProps } from 'src/components/Dropdown/DropdownItem';
import { ShorthandValue } from 'src/types';
import { List } from 'src/components/List/List';

jest.dontMock('@fluentui/keyboard-key');

describe('Dropdown', () => {
  isConformant(Dropdown, {
    testPath: __filename,
    hasAccessibilityProp: false,
    constructorName: 'Dropdown',
    autoControlledProps: ['highlightedIndex', 'open', 'searchQuery', 'activeSelectedIndex', 'value'],
  });

  implementsShorthandProp(Dropdown)('list', List, {
    implementsPopper: true,
    requiredProps: { open: true },
  });

  implementsPopperProps<DropdownProps>(Dropdown, {
    requiredProps: { open: true },
  });

  describe('clearable', () => {
    it('value is cleared at Icon click', () => {
      const { triggerButtonNode, clickOnClearIndicator } = renderDropdown({
        clearable: true,
        defaultValue: items[0],
      });

      clickOnClearIndicator();

      expect(triggerButtonNode).toHaveTextContent('');
    });

    it('value is cleared at Icon enter press', () => {
      const { triggerButtonNode, keyDownOnClearIndicator } = renderDropdown({
        clearable: true,
        defaultValue: items[0],
      });

      keyDownOnClearIndicator('Enter');

      expect(triggerButtonNode).toHaveTextContent('');
    });

    it('calls onChange on Icon click with an `empty` value', () => {
      const onChange = jest.fn();
      const { clickOnClearIndicator } = renderDropdown({
        onChange,
        defaultValue: items[0],
        clearable: true,
      });

      clickOnClearIndicator();

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({
          activeSelectedIndex: undefined,
          highlightedIndex: null,
          open: false,
          searchQuery: undefined,
          value: null,
        }),
      );
    });

    it('should have the indicator tabbable if not a search', () => {
      const { getClearIndicatorNode } = renderDropdown({
        clearable: true,
        defaultValue: items[0],
      });

      expect(getClearIndicatorNode()).toHaveAttribute('tabindex', '0');
      expect(getClearIndicatorNode()).toHaveAttribute('role', 'button');
    });

    it('should not have the indicator tabbable if a search', () => {
      const { getClearIndicatorNode } = renderDropdown({
        clearable: true,
        defaultValue: items[0],
        search: true,
      });

      expect(getClearIndicatorNode()).not.toHaveAttribute('tabindex');
      expect(getClearIndicatorNode()).not.toHaveAttribute('role', 'button');
    });

    it('is not visible when an empty array is passed', () => {
      const { getClearIndicatorWrapper } = renderDropdown({
        clearable: true,
        multiple: true,
        value: [],
      });

      expect(getClearIndicatorWrapper()).toHaveLength(0);
    });

    it('is not visible when an empty string is passed', () => {
      const { getClearIndicatorWrapper } = renderDropdown({
        clearable: true,
        value: '',
      });

      expect(getClearIndicatorWrapper()).toHaveLength(0);
    });
  });

  describe('open', () => {
    it('it takes the value of the controlled prop', () => {
      const { getItemNodes, clickOnItemAtIndex } = renderDropdown({ open: true });

      expect(getItemNodes()).toHaveLength(items.length);

      clickOnItemAtIndex(0);

      expect(getItemNodes()).toHaveLength(items.length);
    });

    it('it takes the value of the default prop but can be changed', () => {
      const { getItemNodes, clickOnItemAtIndex } = renderDropdown({ defaultOpen: true });

      expect(getItemNodes()).toHaveLength(items.length);

      clickOnItemAtIndex(0);

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "true" when opened by trigger button click', () => {
      const { getItemNodes, clickOnTriggerButton } = renderDropdown();

      clickOnTriggerButton();

      expect(getItemNodes()).toHaveLength(items.length);
    });

    it('is "false" when closed by trigger button click', () => {
      const { clickOnTriggerButton, getItemNodes } = renderDropdown({
        defaultOpen: true,
      });

      clickOnTriggerButton();

      expect(getItemNodes()).toHaveLength(0);
    });

    it('calls onOpenChange with a value that represents the open state', () => {
      const onOpenChange = jest.fn();
      const { clickOnTriggerButton } = renderDropdown({
        onOpenChange,
      });

      clickOnTriggerButton();

      expect(onOpenChange).toBeCalledTimes(1);
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: true,
        }),
      );

      clickOnTriggerButton();

      expect(onOpenChange).toBeCalledTimes(2);
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      );
    });

    it('is "true" when opened by toggle indicator click', () => {
      const { clickOnToggleIndicator, getItemNodes } = renderDropdown();

      clickOnToggleIndicator();

      expect(getItemNodes()).toHaveLength(items.length);
    });

    it('is "false" when closed by toggle indicator click', () => {
      const { clickOnToggleIndicator, getItemNodes } = renderDropdown({
        defaultOpen: true,
      });

      clickOnToggleIndicator();

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "false" when closed by hitting Escape in search input', () => {
      const { keyDownOnSearchInput, getItemNodes } = renderDropdown({
        search: true,
        defaultOpen: true,
      });

      keyDownOnSearchInput('Escape');

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "false" when closed by hitting Escape in items list', () => {
      const { keyDownOnItemsList, getItemNodes } = renderDropdown({ defaultOpen: true });

      expect(items).toHaveLength(items.length);

      keyDownOnItemsList('Escape');

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "false" when an item has been selected', () => {
      const { clickOnItemAtIndex, getItemNodes } = renderDropdown({ defaultOpen: true });

      clickOnItemAtIndex(0);

      expect(getItemNodes()).toHaveLength(0);
    });

    it('when set to "true" by trigger button click will move focus to the items list', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { clickOnTriggerButton, itemsListNode } = renderDropdown(undefined, testContainer);

      clickOnTriggerButton();

      expect(itemsListNode).toHaveFocus();
      removeTestContainer();
    });

    it('is "false" when blurred by Tab on items list', () => {
      const { getItemNodes, keyDownOnItemsList } = renderDropdown({ defaultOpen: true });

      keyDownOnItemsList('Tab');

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "false" when blurred by Shift+Tab on items list', () => {
      const { getItemNodes, keyDownOnItemsList } = renderDropdown({ defaultOpen: true });

      keyDownOnItemsList('Tab', { shiftKey: true });

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "false" when blurred by Tab on search input', () => {
      const { getItemNodes, keyDownOnSearchInput } = renderDropdown({
        defaultOpen: true,
        search: true,
      });

      keyDownOnSearchInput('Tab');

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "false" when blurred by Shift+Tab on search input', () => {
      const { getItemNodes, keyDownOnSearchInput } = renderDropdown({
        defaultOpen: true,
        search: true,
      });

      keyDownOnSearchInput('Tab', { shiftKey: true });

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "true" when you start typing in the search input', () => {
      const { getItemNodes, changeSearchInput } = renderDropdown({
        search: true,
      });

      changeSearchInput('item');

      expect(getItemNodes()).toHaveLength(items.length);
    });

    it('is "false" when you remove the query from the search input', () => {
      const { getItemNodes, changeSearchInput } = renderDropdown({
        search: true,
        defaultOpen: true,
        defaultSearchQuery: 'item',
      });

      changeSearchInput('');

      expect(getItemNodes()).toHaveLength(0);
    });

    it('is "true" when opened by space bar on trigger button', () => {
      const { getItemNodes, keyDownOnTriggerButton } = renderDropdown({});

      keyDownOnTriggerButton(' ');

      expect(getItemNodes()).toHaveLength(items.length);
    });

    it('is "true" when opened by arrow down on trigger button', () => {
      const { getItemNodes, keyDownOnTriggerButton } = renderDropdown({});

      keyDownOnTriggerButton('ArrowDown');

      expect(getItemNodes()).toHaveLength(items.length);
    });

    it('is "true" when opened by arrow up on trigger button', () => {
      const { getItemNodes, keyDownOnTriggerButton } = renderDropdown({});

      keyDownOnTriggerButton('ArrowUp');

      expect(getItemNodes()).toHaveLength(items.length);
    });
  });

  describe('highlightedIndex', () => {
    jest.useFakeTimers();
    afterEach(() => {
      act(() => {
        jest.runAllTimers();
      });
    });

    it('is null when opened by click', () => {
      const { clickOnTriggerButton, itemsListNode } = renderDropdown();

      clickOnTriggerButton();

      expect(itemsListNode).not.toHaveAttribute('aria-activedescendant');
    });

    it('is null when opened by toggle indicator click', () => {
      const { clickOnToggleIndicator, itemsListNode } = renderDropdown();

      clickOnToggleIndicator();

      expect(itemsListNode).not.toHaveAttribute('aria-activedescendant');
    });

    it('is first item index when opened by arrow down key', () => {
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown();

      keyDownOnTriggerButton('ArrowDown');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('is last item index when opened by arrow up key', () => {
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown();

      keyDownOnTriggerButton('ArrowUp');

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(items.length - 1)),
      );
    });

    it('has the provided prop value when opened by click', () => {
      const highlightedIndex = 2;
      const { clickOnTriggerButton, itemsListNode } = renderDropdown({
        highlightedIndex,
      });

      clickOnTriggerButton();

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      );
    });

    it('has the provided prop value when opened by arrow down key', () => {
      const highlightedIndex = 1;
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown({
        highlightedIndex,
      });

      keyDownOnTriggerButton('ArrowDown');

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      );
    });

    it('has the provided prop value when opened by arrow up key', () => {
      const highlightedIndex = 1;
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown({
        highlightedIndex,
      });

      keyDownOnTriggerButton('ArrowUp');

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      );
    });

    it('is defaultHighlightedIndex prop value at first opening, then null', () => {
      const defaultHighlightedIndex = 2;
      const { clickOnTriggerButton, itemsListNode } = renderDropdown({
        defaultHighlightedIndex,
      });

      clickOnTriggerButton();

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(defaultHighlightedIndex)),
      );

      clickOnTriggerButton();
      clickOnTriggerButton();

      expect(itemsListNode).not.toHaveAttribute('aria-activedescendant');
    });

    it('is 0 on every open when highlightFirstItemOnOpen prop is provided', () => {
      const { clickOnTriggerButton, itemsListNode } = renderDropdown({
        highlightFirstItemOnOpen: true,
      });

      clickOnTriggerButton();

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));

      clickOnTriggerButton();
      clickOnTriggerButton();

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('is set to 0 on searchQuery change and when highlightFirstItemOnOpen prop is provided', () => {
      const { changeSearchInput, keyDownOnSearchInput, searchInputNode } = renderDropdown({
        highlightFirstItemOnOpen: true,
        search: true,
      });

      changeSearchInput('i');

      expect(searchInputNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));

      keyDownOnSearchInput('ArrowDown');

      expect(searchInputNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(1)));

      changeSearchInput('it');

      expect(searchInputNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('is null on searchQuery change and when highlightFirstItemOnOpen prop is not provided', () => {
      const { changeSearchInput, keyDownOnSearchInput, searchInputNode } = renderDropdown({
        search: true,
      });

      changeSearchInput('i');

      expect(searchInputNode).not.toHaveAttribute('aria-activedescendant');

      keyDownOnSearchInput('ArrowDown');

      expect(searchInputNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));

      changeSearchInput('it');

      expect(searchInputNode).not.toHaveAttribute('aria-activedescendant');
    });

    it('is the index of the value previously selected when opened', () => {
      const highlightedIndex = 2;
      const { clickOnTriggerButton, itemsListNode } = renderDropdown({
        value: items[highlightedIndex],
      });

      clickOnTriggerButton();

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex)),
      );
    });

    it('is the index of the (value previously selected + 1) when opened by arrow down', () => {
      const highlightedIndex = 2;
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown({
        value: items[highlightedIndex],
      });

      keyDownOnTriggerButton('ArrowDown');

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex + 1)),
      );
    });

    it('is the index of the (value previously selected - 1) when opened by arrow up', () => {
      const highlightedIndex = 2;
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown({
        value: items[highlightedIndex],
      });

      keyDownOnTriggerButton('ArrowUp');

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(highlightedIndex - 1)),
      );
    });

    it('is changed correctly on arrow down navigation', () => {
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({ defaultOpen: true });

      for (let index = 0; index < items.length; index++) {
        keyDownOnItemsList('ArrowDown');

        expect(itemsListNode).toHaveAttribute(
          'aria-activedescendant',
          expect.stringMatching(getItemIdRegexByIndex(index)),
        );
      }
    });

    it('is changed correctly on arrow up navigation', () => {
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({ defaultOpen: true });

      for (let index = items.length - 1; index >= 0; index--) {
        keyDownOnItemsList('ArrowUp');

        expect(itemsListNode).toHaveAttribute(
          'aria-activedescendant',
          expect.stringMatching(getItemIdRegexByIndex(index)),
        );
      }
    });

    it('is changed correctly on arrow down and shift navigation', () => {
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown({ defaultOpen: true });

      keyDownOnTriggerButton('ArrowDown', { shiftKey: true });

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(4)));
    });

    it('is changed correctly on arrow up and shift navigation', () => {
      const { keyDownOnTriggerButton, itemsListNode } = renderDropdown({
        defaultHighlightedIndex: items.length - 1,
        defaultOpen: true,
      });

      keyDownOnTriggerButton('ArrowUp', { shiftKey: true });

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('is changed correctly on home key navigation', () => {
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        defaultHighlightedIndex: 2,
        defaultOpen: true,
      });

      keyDownOnItemsList('Home');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('is changed correctly on end key navigation', () => {
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        defaultHighlightedIndex: 2,
        defaultOpen: true,
      });

      keyDownOnItemsList('End');

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(items.length - 1)),
      );
    });

    it('wraps to start and end on navigation', () => {
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        defaultHighlightedIndex: 0,
        defaultOpen: true,
      });

      keyDownOnItemsList('ArrowUp');

      expect(itemsListNode).toHaveAttribute(
        'aria-activedescendant',
        expect.stringMatching(getItemIdRegexByIndex(items.length - 1)),
      );

      keyDownOnItemsList('ArrowDown');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('is updated correctly when hovering over items', () => {
      const { mouseOverItemAtIndex, itemsListNode } = renderDropdown({
        defaultOpen: true,
      });

      mouseOverItemAtIndex(1);

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(1)));

      mouseOverItemAtIndex(3);

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(3)));
    });

    it('is updated correctly when hovering over items and using arrow keys to navigate', () => {
      const { mouseOverItemAtIndex, keyDownOnItemsList, itemsListNode } = renderDropdown({
        defaultOpen: true,
      });

      mouseOverItemAtIndex(1);
      keyDownOnItemsList('ArrowDown');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(2)));

      mouseOverItemAtIndex(4);
      keyDownOnItemsList('ArrowUp');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(3)));
    });

    it('jumps to the item starting with the character key pressed', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`];
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        items,
        defaultOpen: true,
      });

      keyDownOnItemsList('P');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(1)));
    });

    it('jumps starting from the current highlightedIndex on character key press', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`];
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        items,
        defaultHighlightedIndex: 1,
        defaultOpen: true,
      });

      keyDownOnItemsList('A');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(2)));
    });

    it('wraps to the start of the list when no options remain', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`];
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        items,
        defaultHighlightedIndex: 2,
        defaultOpen: true,
      });

      keyDownOnItemsList('A');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('jumps from item to item when pressing the same key with enough time in between', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`];
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        items,
        defaultOpen: true,
      });

      keyDownOnItemsList('A');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));

      act(() => {
        jest.runAllTimers();
      });
      keyDownOnItemsList('A');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(2)));

      act(() => {
        jest.runAllTimers();
      });
      keyDownOnItemsList('A');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
    });

    it('jumps to the item starting with the keys tapped in rapid succession', () => {
      const items = ['Albert', 'Alfred', 'Alena', 'Ali'];
      const { keyDownOnItemsList, itemsListNode } = renderDropdown({
        items,
        defaultOpen: true,
      });

      keyDownOnItemsList('A');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));

      jest.advanceTimersByTime(500 /* charKeyPressedCleanupTime */ / 2);
      keyDownOnItemsList('L');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));

      jest.advanceTimersByTime(500 /* charKeyPressedCleanupTime */ / 2);
      keyDownOnItemsList('E');

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(2)));

      act(() => {
        jest.runAllTimers();
      });
    });

    it('does not open with highlightedIndex after selecting item in multiple mode', () => {
      const itemSelectedIndex = 2;
      const { clickOnItemAtIndex, clickOnTriggerButton, itemsListNode } = renderDropdown({
        defaultOpen: true,
        multiple: true,
      });

      clickOnItemAtIndex(itemSelectedIndex);
      clickOnTriggerButton();

      expect(itemsListNode).not.toHaveAttribute('aria-activedescendant');
    });

    it('opens with highlightedIndex after selecting item in non-multiple mode', () => {
      const itemSelectedIndex = 2;
      const { clickOnItemAtIndex, clickOnTriggerButton, itemsListNode } = renderDropdown({
        defaultOpen: true,
      });

      clickOnItemAtIndex(itemSelectedIndex);
      clickOnTriggerButton();

      expect(itemsListNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(2)));
    });
  });

  describe('value', () => {
    it('it takes the value of the controlled prop', () => {
      const value = items[2];
      const { triggerButtonNode, clickOnItemAtIndex } = renderDropdown({ value, defaultOpen: true });

      expect(triggerButtonNode).toHaveTextContent(value);

      clickOnItemAtIndex(0);

      expect(triggerButtonNode).toHaveTextContent(value);
    });

    it('it takes the value of the default prop but can be changed', () => {
      const defaultValue = items[2];
      const itemToBeClickedIndex = 1;
      const { triggerButtonNode, clickOnItemAtIndex } = renderDropdown({
        defaultValue,
        defaultOpen: true,
      });

      expect(triggerButtonNode).toHaveTextContent(defaultValue);

      clickOnItemAtIndex(itemToBeClickedIndex);

      expect(triggerButtonNode).toHaveTextContent(items[itemToBeClickedIndex]);
    });

    it('has onChange and onSearchQueryChange called when item is added', () => {
      const itemToClickIndex = 2;
      const onChange = jest.fn();
      const onSearchQueryChange = jest.fn();
      const { clickOnItemAtIndex } = renderDropdown({ open: true, onChange, onSearchQueryChange });

      clickOnItemAtIndex(itemToClickIndex);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemToClickIndex],
        }),
      );

      expect(onSearchQueryChange).toHaveBeenCalledTimes(1);
      expect(onSearchQueryChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          searchQuery: items[itemToClickIndex],
        }),
      );
    });

    it('has onChange called when item is added or removed on multiple', () => {
      // it will actually be the third, since one is already removed from the list due to defaultValue.
      const itemToClickIndex = 2;
      const defaultSelectedItemIndex = 1;
      const onChange = jest.fn();
      const { clickOnItemAtIndex, keyDownOnSelectedItemAtIndex } = renderDropdown({
        open: true,
        defaultValue: [items[defaultSelectedItemIndex]],
        onChange,
        multiple: true,
      });

      clickOnItemAtIndex(itemToClickIndex - 1);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: [items[defaultSelectedItemIndex], items[itemToClickIndex]],
        }),
      );

      keyDownOnSelectedItemAtIndex(0, 'Delete');

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: [items[itemToClickIndex]],
        }),
      );
    });

    it('It shows no matches message when all iems are selected', () => {
      // it will actually be the third, since one is already removed from the list due to defaultValue.
      const noResultsMessage = 'no items';

      const { clickOnItemAtIndex, clickOnToggleIndicator, itemsListNode } = renderDropdown({
        items: ['item0', 'item1'],
        open: true,
        search: true,
        multiple: true,
        noResultsMessage,
      });

      // Select all
      clickOnItemAtIndex(0);
      clickOnItemAtIndex(0);

      // open
      clickOnToggleIndicator();

      expect(itemsListNode.textContent).toBe(noResultsMessage);
    });

    it('has onChange and onSearchQueryChange called with null value by hitting Escape in search input', () => {
      const onChange = jest.fn();
      const onSearchQueryChange = jest.fn();
      const { keyDownOnSearchInput } = renderDropdown({
        search: true,
        onChange,
        onSearchQueryChange,
        defaultValue: items[2],
        defaultSearchQuery: items[2],
      });

      keyDownOnSearchInput('Escape');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: null,
        }),
      );
      expect(onSearchQueryChange).toHaveBeenCalledTimes(1);
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(null, expect.objectContaining({ searchQuery: '' }));
    });

    it('onChange is called after onSearchQueryChange', () => {
      const onChange = jest.fn();
      const onSearchQueryChange = jest.fn();

      const { keyDownOnSearchInput } = renderDropdown({
        defaultValue: items[2],
        defaultSearchQuery: items[2],
        onChange,
        onSearchQueryChange,
        search: true,
      });

      keyDownOnSearchInput('Escape');
      expect(onChange.mock.invocationCallOrder[0]).toBeGreaterThan(onSearchQueryChange.mock.invocationCallOrder[0]);
    });

    it('is set by clicking on item', () => {
      const itemSelectedIndex = 2;
      const { triggerButtonNode, clickOnItemAtIndex } = renderDropdown({ defaultOpen: true });

      clickOnItemAtIndex(itemSelectedIndex);

      expect(triggerButtonNode).toHaveTextContent(items[itemSelectedIndex]);
    });

    it('is set by using Enter on highlighted item', () => {
      const itemSelectedIndex = 1;
      const { triggerButtonNode, keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: itemSelectedIndex,
      });

      keyDownOnItemsList('Enter');

      expect(triggerButtonNode).toHaveTextContent(items[itemSelectedIndex]);
    });

    it('is set by using Tab on highlighted item', () => {
      const itemSelectedIndex = 3;
      const { triggerButtonNode, keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: itemSelectedIndex,
      });

      keyDownOnItemsList('Tab');

      expect(triggerButtonNode).toHaveTextContent(items[itemSelectedIndex]);
    });

    it('is set by using Shift+Tab on highlighted item', () => {
      const itemSelectedIndex = 2;
      const { triggerButtonNode, keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: itemSelectedIndex,
      });

      keyDownOnItemsList('Tab', { shiftKey: true });

      expect(triggerButtonNode).toHaveTextContent(items[itemSelectedIndex]);
    });

    it('is not set by clicking on disabled item', () => {
      const inputItems = [{ header: 'item1' }, { header: 'item2', disabled: true }];
      const { triggerButtonNode, clickOnItemAtIndex, getItemNodes } = renderDropdown({
        items: inputItems,
        defaultOpen: true,
      });

      clickOnItemAtIndex(1);

      expect(triggerButtonNode).toHaveTextContent('');
      expect(getItemNodes()).toHaveLength(2);
    });

    // ToDo: investigate why 'Enter' still selects disabled item, manually it does not.
    it.skip('is not set by using Enter on highlighted disabled item', () => {
      const inputItems = [{ header: 'item1' }, { header: 'item2', disabled: true }];
      const { triggerButtonNode, keyDownOnItemsList, getItemNodes } = renderDropdown({
        items: inputItems,
        defaultOpen: true,
        defaultHighlightedIndex: 1,
      });

      keyDownOnItemsList('Enter');

      expect(triggerButtonNode).toHaveTextContent('');
      expect(getItemNodes()).toHaveLength(2);
    });

    it('is not set by using Spacebar on highlighted disabled item', () => {
      const inputItems = [{ header: 'item1' }, { header: 'item2', disabled: true }];
      const { triggerButtonNode, keyDownOnItemsList, getItemNodes } = renderDropdown({
        defaultOpen: true,
        items: inputItems,
        defaultHighlightedIndex: 1,
      });

      keyDownOnItemsList(' ');

      expect(triggerButtonNode).toHaveTextContent('');
      expect(getItemNodes()).toHaveLength(2);
    });

    it('is not set by using Tab on highlighted selected item', () => {
      const inputItems = [{ header: 'item1' }, { header: 'item2', disabled: true }];
      const { triggerButtonNode, keyDownOnItemsList, getItemNodes } = renderDropdown({
        defaultOpen: true,
        items: inputItems,
        defaultHighlightedIndex: 1,
      });

      keyDownOnItemsList('Tab');

      expect(triggerButtonNode).toHaveTextContent('');
      expect(getItemNodes()).toHaveLength(0);
    });

    it('is not set by using Shift+Tab on highlighted disabled item', () => {
      const inputItems = [{ header: 'item1' }, { header: 'item2', disabled: true }];
      const { triggerButtonNode, keyDownOnItemsList, getItemNodes } = renderDropdown({
        defaultOpen: true,
        items: inputItems,
        defaultHighlightedIndex: 1,
      });

      keyDownOnItemsList('Tab', { shiftKey: true });

      expect(triggerButtonNode).toHaveTextContent('');
      expect(getItemNodes()).toHaveLength(0);
    });

    it('is set correctly in multiple selection by using Tab on highlighted item', () => {
      const itemSelectedIndex = 3;
      const { triggerButtonNode, keyDownOnItemsList, getSelectedItemNodeAtIndex, getSelectedItemNodes } =
        renderDropdown({
          defaultOpen: true,
          defaultHighlightedIndex: itemSelectedIndex,
          defaultValue: items[4],
          multiple: true,
        });

      keyDownOnItemsList('Tab');

      expect(triggerButtonNode).toHaveTextContent('');
      expect(getSelectedItemNodes()).toHaveLength(2);
      expect(getSelectedItemNodeAtIndex(1)).toHaveTextContent(items[3]);
      expect(getSelectedItemNodeAtIndex(0)).toHaveTextContent(items[4]);
    });

    it('is set correctly in multiple selection by using Shift+Tab on highlighted item', () => {
      const itemSelectedIndex = 2;
      const { triggerButtonNode, keyDownOnItemsList, getSelectedItemNodeAtIndex, getSelectedItemNodes } =
        renderDropdown({
          defaultOpen: true,
          defaultHighlightedIndex: itemSelectedIndex,
          defaultValue: items[4],
          multiple: true,
        });

      keyDownOnItemsList('Tab', { shiftKey: true });

      expect(triggerButtonNode).toHaveTextContent('');
      expect(getSelectedItemNodes()).toHaveLength(2);
      expect(getSelectedItemNodeAtIndex(1)).toHaveTextContent(items[2]);
      expect(getSelectedItemNodeAtIndex(0)).toHaveTextContent(items[4]);
    });

    it('is not cleared when hitting Escape if not search', () => {
      const defaultValue = items[0];
      const { triggerButtonNode, keyDownOnTriggerButton } = renderDropdown({
        defaultValue,
      });

      keyDownOnTriggerButton('Escape');

      expect(triggerButtonNode).toHaveTextContent(defaultValue);
    });

    it('is not cleared when hitting Escape if search but multiple', () => {
      const defaultValue = [items[0], items[1]];
      const { getSelectedItemNodes, keyDownOnSearchInput, searchInputNode } = renderDropdown({
        defaultValue,
        search: true,
        multiple: true,
        defaultSearchQuery: 'test',
      });

      keyDownOnSearchInput('Escape');

      expect(searchInputNode).toHaveTextContent('');
      expect(getSelectedItemNodes()).toHaveLength(2);
    });

    it('is replaced when another item is selected', () => {
      const defaultValue = items[0];
      const itemSelectedIndex = 2;
      const { triggerButtonNode, clickOnItemAtIndex } = renderDropdown({
        defaultOpen: true,
        defaultValue,
      });

      expect(triggerButtonNode).toHaveTextContent(defaultValue);

      clickOnItemAtIndex(itemSelectedIndex);

      expect(triggerButtonNode).toHaveTextContent(items[itemSelectedIndex]);
    });

    it('has an array of items if more items are selected and the multiple prop is supplied', () => {
      const { getSelectedItemNodes, getSelectedItemNodeAtIndex } = renderDropdown({
        multiple: true,
        defaultValue: [items[0], items[1]],
      });

      expect(getSelectedItemNodes()).toHaveLength(2);
      expect(getSelectedItemNodeAtIndex(0)).toHaveTextContent(items[0]);
      expect(getSelectedItemNodeAtIndex(1)).toHaveTextContent(items[1]);
    });

    it('removes last item on backspace when query is emtpy', () => {
      const { getSelectedItemNodes, getSelectedItemNodeAtIndex, keyDownOnSearchInput } = renderDropdown({
        multiple: true,
        search: true,
        defaultValue: [items[0], items[1]],
      });

      keyDownOnSearchInput('Backspace');

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getSelectedItemNodeAtIndex(0)).toHaveTextContent(items[0]);
    });

    it('does not remove last item on backspace when query is not empty', () => {
      const { getSelectedItemNodes, keyDownOnSearchInput, searchInputNode } = renderDropdown({
        multiple: true,
        search: true,
        defaultSearchQuery: 'bla',
        defaultValue: [items[0], items[1]],
      });

      searchInputNode.setSelectionRange(1, 2);
      keyDownOnSearchInput('Backspace');

      expect(getSelectedItemNodes()).toHaveLength(2);
    });

    it('removes last item on backspace when selection range is 0, 0', () => {
      const { getSelectedItemNodes, getSelectedItemNodeAtIndex, keyDownOnSearchInput, searchInputNode } =
        renderDropdown({
          multiple: true,
          search: true,
          defaultSearchQuery: 'bla',
          defaultValue: [items[0], items[1]],
        });

      searchInputNode.setSelectionRange(0, 0);
      keyDownOnSearchInput('Backspace');

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getSelectedItemNodeAtIndex(0)).toHaveTextContent(items[0]);
    });

    it('does not remove last item on backspace when selection range is 0, (y>0)', () => {
      const { getSelectedItemNodes, keyDownOnSearchInput, searchInputNode } = renderDropdown({
        multiple: true,
        search: true,
        defaultSearchQuery: 'bla',
        defaultValue: [items[0], items[1]],
      });

      searchInputNode.setSelectionRange(0, 1);
      keyDownOnSearchInput('Backspace');

      expect(getSelectedItemNodes()).toHaveLength(2);
    });

    it('has the item removed if it receives delete key down', () => {
      const { getSelectedItemNodes, getSelectedItemNodeAtIndex, keyDownOnSelectedItemAtIndex } = renderDropdown({
        multiple: true,
        search: true,
        defaultValue: [items[0], items[1]],
      });

      keyDownOnSelectedItemAtIndex(0, 'Delete');

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getSelectedItemNodeAtIndex(0)).toHaveTextContent(items[1]);
    });

    it('has the item removed if it receives click on remove icon', () => {
      const { getSelectedItemNodes, getSelectedItemNodeAtIndex, wrapper } = renderDropdown({
        multiple: true,
        search: true,
        defaultValue: [items[0], items[1]],
      });

      findIntrinsicElement(wrapper, `.${dropdownSelectedItemSlotClassNames.icon}`).at(0).simulate('click');

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getSelectedItemNodeAtIndex(0)).toHaveTextContent(items[1]);
    });

    it('keeps selection when the same item is selected', () => {
      const selectedItemIndex = 0;
      const selectedItem = items[selectedItemIndex];
      const { clickOnItemAtIndex, triggerButtonNode, clickOnTriggerButton, keyDownOnItemsList } = renderDropdown({
        defaultValue: selectedItem,
        defaultOpen: true,
      });

      clickOnItemAtIndex(selectedItemIndex);

      expect(triggerButtonNode).toHaveTextContent(selectedItem);

      clickOnTriggerButton();
      keyDownOnItemsList('Enter');

      expect(triggerButtonNode).toHaveTextContent(selectedItem);

      clickOnTriggerButton();
      keyDownOnItemsList('Tab');

      expect(triggerButtonNode).toHaveTextContent(selectedItem);
    });
  });

  describe('allowFreeForm', () => {
    ['Enter', 'Tab'].forEach(key => {
      it(`selects item that starts with query prefix on ${key}`, () => {
        const { changeSearchInput, keyDownOnSearchInput, searchInputNode } = renderDropdown({
          search: items => items,
          allowFreeform: true,
        });

        changeSearchInput('it');
        expect(searchInputNode).toHaveAttribute(
          'aria-activedescendant',
          expect.stringMatching(getItemIdRegexByIndex(0)),
        );
        keyDownOnSearchInput(key);
        expect(searchInputNode).toHaveValue('item0');
      });

      it(`highlights first item matching prefix and selects it on ${key}`, () => {
        const items = ['item0', 'item1', 'itemA1', 'itemB1'];
        const { changeSearchInput, keyDownOnSearchInput, searchInputNode } = renderDropdown({
          search: items => items,
          allowFreeform: true,
          items,
        });

        changeSearchInput('itemA');
        expect(searchInputNode).toHaveAttribute(
          'aria-activedescendant',
          expect.stringMatching(getItemIdRegexByIndex(2)),
        );
        keyDownOnSearchInput(key);
        expect(searchInputNode).toHaveValue('itemA1');
      });

      it(`keeps search query value when there is no match on ${key}`, () => {
        const { changeSearchInput, keyDownOnSearchInput, searchInputNode } = renderDropdown({
          search: items => items,
          allowFreeform: true,
        });

        changeSearchInput('itemX');
        expect(searchInputNode).not.toHaveAttribute('aria-activedescendant');
        keyDownOnSearchInput(key);
        expect(searchInputNode).toHaveValue('itemX');
      });

      it(`keeps search query value when when selected by arrow key on ${key}`, () => {
        const { changeSearchInput, keyDownOnSearchInput, searchInputNode } = renderDropdown({
          search: items => items,
          allowFreeform: true,
        });

        changeSearchInput('item1');
        keyDownOnSearchInput('ArrowDown');
        expect(searchInputNode).toHaveAttribute(
          'aria-activedescendant',
          expect.stringMatching(getItemIdRegexByIndex(2)),
        );
        keyDownOnSearchInput(key);
        expect(searchInputNode).toHaveValue('item2');
      });
      return true;
    });

    it('selects item that starts with query prefix when user clicks on toggle', () => {
      const { clickOnToggleIndicator, changeSearchInput, searchInputNode } = renderDropdown({
        search: items => items,
        allowFreeform: true,
      });

      changeSearchInput('it');
      expect(searchInputNode).toHaveAttribute('aria-activedescendant', expect.stringMatching(getItemIdRegexByIndex(0)));
      clickOnToggleIndicator();
      expect(searchInputNode).toHaveValue('item0');
    });
  });

  describe('getA11ySelectionMessage', () => {
    jest.useFakeTimers();
    afterEach(() => {
      jest.runAllTimers();
    });

    it('creates message container element', () => {
      const { getA11yMessageContainerNode } = renderDropdown({ getA11ySelectionMessage: {} });

      expect(getA11yMessageContainerNode()).toMatchInlineSnapshot(`
        <div
          aria-live="polite"
          aria-relevant="additions text"
          role="status"
          style="border: 0px; height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: absolute; width: 1px;"
        />
      `);
    });

    it('has the onAdd message inserted and cleared after an item has been added to selection', () => {
      const itemToBeClickedIndex = 1;
      const { getA11yMessageContainerNode, clickOnItemAtIndex } = renderDropdown({
        defaultOpen: true,
        getA11ySelectionMessage: { onAdd: item => `${item} has been added` },
      });

      clickOnItemAtIndex(itemToBeClickedIndex);

      expect(getA11yMessageContainerNode()).toHaveTextContent(`${items[itemToBeClickedIndex]} has been added`);

      act(() => {
        jest.runAllTimers();
      });

      expect(getA11yMessageContainerNode()).toHaveTextContent('');
    });

    it('has the onRemove message inserted and cleared after an item has been removed from selection', () => {
      const itemSelectedByDefaultIndex = 2;
      const { getA11yMessageContainerNode, keyDownOnSelectedItemAtIndex } = renderDropdown({
        defaultOpen: true,
        multiple: true,
        defaultValue: [items[itemSelectedByDefaultIndex]],
        getA11ySelectionMessage: { onRemove: item => `${item} has been removed` },
      });

      keyDownOnSelectedItemAtIndex(0, 'Delete');

      expect(getA11yMessageContainerNode()).toHaveTextContent(`${items[itemSelectedByDefaultIndex]} has been removed`);

      act(() => {
        jest.runAllTimers();
      });

      expect(getA11yMessageContainerNode()).toHaveTextContent('');
    });

    it('has items count narration element associated via aria-describedby after an item has been selected', () => {
      const itemToBeClickedIndex = 1;
      const { clickOnItemAtIndex, searchInputNode, getItemsCountNode } = renderDropdown({
        defaultOpen: true,
        getA11ySelectionMessage: { itemsCount: count => `${count} item is  selected.` },
        search: true,
        multiple: true,
      });

      clickOnItemAtIndex(itemToBeClickedIndex);
      const itemsCountNode = getItemsCountNode();
      const itemsCountNodeId = itemsCountNode.getAttribute('id');

      expect(searchInputNode).toHaveAttribute('aria-describedby', itemsCountNodeId);

      expect(itemsCountNode).toHaveTextContent('1 item is selected.');
    });
  });

  describe('searchQuery', () => {
    it('it takes the value of the controlled prop', () => {
      const searchQuery = "can't touch this";
      const { changeSearchInput, searchInputNode } = renderDropdown({ searchQuery, search: true });

      expect(searchInputNode).toHaveValue(searchQuery);

      changeSearchInput('but I can try!');

      expect(searchInputNode).toHaveValue(searchQuery);
    });

    it('it takes the value of the default prop but can be changed', () => {
      const defaultSearchQuery = "maybe you can't touch this";
      const finalSearchQuery = 'you underestimate my power';
      const { changeSearchInput, searchInputNode } = renderDropdown({
        defaultSearchQuery,
        search: true,
      });

      expect(searchInputNode).toHaveValue(defaultSearchQuery);

      changeSearchInput(finalSearchQuery);

      expect(searchInputNode).toHaveValue(finalSearchQuery);
    });

    it("updates component's state on props updates", () => {
      const newSearchQueryProp = 'bar';
      const { wrapper, searchInputNode } = renderDropdown({
        searchQuery: 'foo',
        search: true,
      });

      wrapper.setProps({ searchQuery: newSearchQueryProp });

      expect(searchInputNode).toHaveValue(newSearchQueryProp);
    });

    it('closes dropdown when changed to empty string', () => {
      const { getItemNodes, changeSearchInput } = renderDropdown({
        defaultSearchQuery: 'foo',
        defaultOpen: true,
        search: true,
      });

      changeSearchInput('');

      expect(getItemNodes()).toHaveLength(0);
    });

    it('has onSearchQueryChange called each time the input is changed', () => {
      const onSearchQueryChange = jest.fn();
      const { changeSearchInput } = renderDropdown({ search: true, onSearchQueryChange });

      changeSearchInput('ala');

      expect(onSearchQueryChange).toHaveBeenCalledTimes(1);
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'ala',
        }),
      );

      changeSearchInput('alladin');

      expect(onSearchQueryChange).toHaveBeenCalledTimes(2);
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'alladin',
        }),
      );
    });

    it('has onSearchQueryChange called with empty string by hitting Escape in search input', () => {
      const onSearchQueryChange = jest.fn();
      const { keyDownOnSearchInput } = renderDropdown({ search: true, onSearchQueryChange, defaultSearchQuery: 'foo' });

      keyDownOnSearchInput('Escape');

      expect(onSearchQueryChange).toHaveBeenCalledTimes(1);
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: '',
        }),
      );
    });

    it('has onChange called with null when changed to empty string and there was item selected', () => {
      const onChange = jest.fn();
      const onSearchQueryChange = jest.fn();
      const { changeSearchInput, getClearIndicatorWrapper } = renderDropdown({
        defaultValue: items[0],
        defaultOpen: true,
        search: true,
        clearable: true,
        onChange,
        onSearchQueryChange,
        defaultSearchQuery: items[0],
      });

      changeSearchInput('');

      expect(getClearIndicatorWrapper().length).toEqual(0);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: null,
          open: false,
        }),
      );

      expect(onSearchQueryChange).toHaveBeenCalledTimes(1);
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: '',
        }),
      );
    });

    it('is the string equivalent of selected item in single search', () => {
      const itemSelectedIndex = 2;
      const itemsAsObjects = items.map(item => ({ value: item, key: item }));
      const { searchInputNode, clickOnItemAtIndex } = renderDropdown({
        search: true,
        defaultOpen: true,
        items: itemsAsObjects,
        itemToString: (itemObject: { value: string }) => itemObject.value,
      });

      clickOnItemAtIndex(itemSelectedIndex);

      expect(searchInputNode).toHaveValue(itemsAsObjects[itemSelectedIndex].value);
    });

    it('is set to empty by hitting Escape in search input', () => {
      const { keyDownOnSearchInput, searchInputNode } = renderDropdown({
        defaultSearchQuery: 'foo',
        search: true,
      });

      keyDownOnSearchInput('Escape');

      expect(searchInputNode).toHaveValue('');
    });

    it('is set to empty when item is selected in multiple search', () => {
      const { clickOnItemAtIndex, searchInputNode, getSelectedItemNodes, changeSearchInput } = renderDropdown({
        search: true,
        multiple: true,
        defaultOpen: true,
      });

      changeSearchInput('item');
      expect(searchInputNode).toHaveValue('item');

      clickOnItemAtIndex(2);

      expect(searchInputNode).toHaveValue('');
      expect(getSelectedItemNodes()).toHaveLength(1);
    });
  });

  describe('activeSelectedIndex', () => {
    it('is set on active item click', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { getSelectedItemNodeAtIndex, clickOnSelectedItemAtIndex } = renderDropdown(
        {
          multiple: true,
          value: [items[2]],
        },
        testContainer,
      );

      clickOnSelectedItemAtIndex(0);

      expect(getSelectedItemNodeAtIndex(0)).toHaveFocus();
      removeTestContainer();
    });

    it('is set as last index on left arrow from the search query', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { getSelectedItemNodeAtIndex, keyDownOnSearchInput } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
          search: true,
        },
        testContainer,
      );

      keyDownOnSearchInput('ArrowLeft');

      expect(getSelectedItemNodeAtIndex(2)).toHaveFocus();
      removeTestContainer();
    });

    it('is set as last index on left arrow from the trigger button', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { getSelectedItemNodeAtIndex, keyDownOnTriggerButton } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
        },
        testContainer,
      );

      keyDownOnTriggerButton('ArrowLeft');

      expect(getSelectedItemNodeAtIndex(2)).toHaveFocus();
      removeTestContainer();
    });

    it('is updated on arrow navigation after being set by click', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { getSelectedItemNodeAtIndex, keyDownOnSelectedItemAtIndex, clickOnSelectedItemAtIndex } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
        },
        testContainer,
      );

      clickOnSelectedItemAtIndex(2);
      keyDownOnSelectedItemAtIndex(2, 'ArrowLeft');

      expect(getSelectedItemNodeAtIndex(1)).toHaveFocus();
      removeTestContainer();
    });

    it('stays as "0" on left arrow from the first selected item', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { getSelectedItemNodeAtIndex, keyDownOnSelectedItemAtIndex, clickOnSelectedItemAtIndex } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
        },
        testContainer,
      );

      clickOnSelectedItemAtIndex(0);
      keyDownOnSelectedItemAtIndex(0, 'ArrowLeft');

      expect(getSelectedItemNodeAtIndex(0)).toHaveFocus();
      removeTestContainer();
    });

    it('gets unset on right arrow from the last selected item and moves focus to trigger button', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { triggerButtonNode, keyDownOnSelectedItemAtIndex, clickOnSelectedItemAtIndex } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
        },
        testContainer,
      );

      clickOnSelectedItemAtIndex(2);
      keyDownOnSelectedItemAtIndex(2, 'ArrowRight');

      expect(triggerButtonNode).toHaveFocus();
      removeTestContainer();
    });

    it('gets unset on the removal of selected item and moves focus to trigger button', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { triggerButtonNode, keyDownOnSelectedItemAtIndex, clickOnSelectedItemAtIndex } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
        },
        testContainer,
      );

      clickOnSelectedItemAtIndex(2);
      keyDownOnSelectedItemAtIndex(2, 'Delete');

      expect(triggerButtonNode).toHaveFocus();
      removeTestContainer();
    });

    it('gets unset on right arrow from the last selected item and moves focus to search input', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { searchInputNode, keyDownOnSelectedItemAtIndex, clickOnSelectedItemAtIndex } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
          search: true,
        },
        testContainer,
      );

      clickOnSelectedItemAtIndex(2);
      keyDownOnSelectedItemAtIndex(2, 'ArrowRight');

      expect(searchInputNode).toHaveFocus();
      removeTestContainer();
    });

    it('gets unset on the removal of selected item and moves focus to search input', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { searchInputNode, keyDownOnSelectedItemAtIndex, clickOnSelectedItemAtIndex } = renderDropdown(
        {
          multiple: true,
          value: [items[0], items[1], items[2]],
          search: true,
        },
        testContainer,
      );

      clickOnSelectedItemAtIndex(2);
      keyDownOnSelectedItemAtIndex(2, 'Delete');

      expect(searchInputNode).toHaveFocus();
      removeTestContainer();
    });
  });

  describe('focused', () => {
    it('is "true" when focus is on trigger button', () => {
      const { rootNode, focusTriggerButton } = renderDropdown();

      focusTriggerButton();

      expect(rootNode).toHaveAttribute('data-test-focused', 'true');
    });

    it('is "true" when focus is on search input', () => {
      const { rootNode, focusSearchInput } = renderDropdown({ search: true });

      focusSearchInput();

      expect(rootNode).toHaveAttribute('data-test-focused', 'true');
    });

    it('is "true" when focus is on the list', () => {
      const { rootNode, focusItemsList } = renderDropdown({ open: true });
      focusItemsList();

      expect(rootNode).toHaveAttribute('data-test-focused', 'true');
    });
  });

  describe('toggleIndicatorNode', () => {
    it('moves focus to list at click', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { clickOnToggleIndicator, itemsListNode } = renderDropdown(undefined, testContainer);

      clickOnToggleIndicator();

      expect(itemsListNode).toHaveFocus();
      removeTestContainer();
    });

    it('moves focus to input in search mode', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { clickOnToggleIndicator, searchInputNode } = renderDropdown({ search: true }, testContainer);

      clickOnToggleIndicator();

      expect(searchInputNode).toHaveFocus();
      removeTestContainer();
    });
  });

  describe('moveFocusOnTab', () => {
    // only way to check Tab is prevented in unit tests.
    const preventDefault = jest.fn();

    afterEach(() => {
      preventDefault.mockReset();
    });

    it('keeps focus on trigger button when not passed', () => {
      const { keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
      });

      keyDownOnItemsList('Tab', { preventDefault });

      expect(preventDefault).toBeCalled();
    });

    it('keeps focus on input when not passed', () => {
      const { keyDownOnSearchInput } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
        search: true,
      });

      keyDownOnSearchInput('Tab', { preventDefault });
      expect(preventDefault).toBeCalled();
    });

    it('allows focus to move to next item from search input when passed', () => {
      const { keyDownOnSearchInput } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
        search: true,
        moveFocusOnTab: true,
      });

      keyDownOnSearchInput('Tab', { preventDefault });

      expect(preventDefault).not.toBeCalled();
    });

    it('allows focus to move to next item from items list when passed', () => {
      const { keyDownOnItemsList } = renderDropdown({
        defaultOpen: true,
        defaultHighlightedIndex: 0,
        multiple: true,
        moveFocusOnTab: true,
      });

      keyDownOnItemsList('Tab', { preventDefault });

      expect(preventDefault).not.toBeCalled();
    });
  });

  describe('multiple', () => {
    it('can be switched to "multiple"', () => {
      const { wrapper, getSelectedItemNodes } = renderDropdown({ value: items[0] });

      expect(getSelectedItemNodes()).toHaveLength(0);

      wrapper.setProps({ multiple: true });

      expect(getSelectedItemNodes()).toHaveLength(1);
    });

    it('does not contain duplicates after an item is selected', () => {
      const { getSelectedItemNodes, getItemNodes, clickOnItemAtIndex } = renderDropdown({
        multiple: true,
        open: true,
      });

      clickOnItemAtIndex(0);

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getItemNodes()).toHaveLength(items.length - 1);

      clickOnItemAtIndex(0);

      expect(getSelectedItemNodes()).toHaveLength(2);
      expect(getItemNodes()).toHaveLength(items.length - 2);
    });

    it('does not contain duplicates when value is set', () => {
      const { getSelectedItemNodes, getItemNodes } = renderDropdown({
        multiple: true,
        open: true,
        value: items[0],
      });

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getItemNodes()).toHaveLength(items.length - 1);
    });

    it('contains duplicates by default', () => {
      const items = [{ key: '1', header: 'James Smith' }];
      const value = [{ key: '1', header: 'John Locke' }];

      const { getSelectedItemNodes, getItemNodes } = renderDropdown({
        multiple: true,
        open: true,
        value,
        items,
      });

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getItemNodes()).toHaveLength(items.length);
    });

    it('does not contain duplicates when proper itemToValue prop is used', () => {
      const items = [{ id: '1', header: 'James Smith' }];
      const value = [{ id: '1', header: 'John Locke' }];
      const itemToValue = (item: ShorthandValue<DropdownItemProps>): string => {
        if (!item || !React.isValidElement(item)) {
          return '';
        }
        return (item as any).id;
      };

      const { getSelectedItemNodes, getItemNodes } = renderDropdown({
        multiple: true,
        open: true,
        value,
        items,
        itemToValue,
      });

      expect(getSelectedItemNodes()).toHaveLength(1);
      expect(getItemNodes()).toHaveLength(items.length - 1);
    });

    it('should not call onRemove when dropdown is disabled', () => {
      const onRemove = jest.fn();
      const value = { header: items[0], onRemove };
      const { clickOnSelectedItemAtIndex } = renderDropdown({ multiple: true, value, disabled: true });
      clickOnSelectedItemAtIndex(0);
      expect(onRemove).not.toHaveBeenCalled();
    });
  });

  describe('items', () => {
    it('have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn();
      const stopPropagation = jest.fn();
      const mockedEvent = { stopPropagation };
      const items = [{ header: 'Venom', onClick }];
      const { clickOnItemAtIndex } = renderDropdown({ items, defaultOpen: true });

      clickOnItemAtIndex(0, mockedEvent);

      expect(onClick).toBeCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining(mockedEvent),
        expect.objectContaining({
          header: 'Venom',
        }),
      );
      expect(stopPropagation).toBeCalledTimes(1);
    });

    it('when selected have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn();
      const stopPropagation = jest.fn();
      const mockedEvent = { stopPropagation };
      const items = [{ header: 'Venom', onClick }];
      const { clickOnSelectedItemAtIndex } = renderDropdown({
        items,
        multiple: true,
        value: items,
        defaultOpen: true,
      });

      clickOnSelectedItemAtIndex(0, mockedEvent);

      expect(onClick).toBeCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining(mockedEvent),
        expect.objectContaining({
          header: 'Venom',
        }),
      );
      expect(stopPropagation).toBeCalledTimes(1);
    });
  });

  describe('renderSelectedItem', () => {
    it('is called in multiple selection', () => {
      const renderSelectedItem = jest.fn();
      const value = [items[0], items[1]];

      renderDropdown({ renderSelectedItem, multiple: true, value });

      expect(renderSelectedItem).toBeCalledTimes(value.length);
    });
  });

  describe('searchInput', () => {
    it("merges refs from user's input", () => {
      const inputRef = React.createRef<HTMLInputElement>();

      const { keyDownOnSearchInput } = renderDropdown({
        defaultSearchQuery: 'Foo',
        multiple: true,
        search: true,
        searchInput: { inputRef },
      });

      keyDownOnSearchInput('Backspace');

      // This test asserts also on internals that a condition that uses internal `inputRef` will pass.
      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('disabled', () => {
    it('allows no action on the trigger button', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { clickOnTriggerButton, focusTriggerButton, getItemNodes, triggerButtonNode, keyDownOnTriggerButton } =
        renderDropdown(
          {
            disabled: true,
          },
          testContainer,
        );

      expect(triggerButtonNode).toHaveAttribute('disabled');

      clickOnTriggerButton();

      expect(getItemNodes()).toHaveLength(0);

      focusTriggerButton();

      expect(triggerButtonNode).not.toHaveFocus();

      keyDownOnTriggerButton('ArrowDown');

      expect(getItemNodes()).toHaveLength(0);
      removeTestContainer();
    });

    it('allows no action on the search input', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { keyDownOnSearchInput, clickOnSearchInput, focusSearchInput, getItemNodes, searchInputNode } =
        renderDropdown(
          {
            disabled: true,
            search: true,
          },
          testContainer,
        );

      expect(searchInputNode).toHaveAttribute('disabled');

      keyDownOnSearchInput('ArrowDown');

      expect(getItemNodes()).toHaveLength(0);

      focusSearchInput();

      expect(searchInputNode).not.toHaveFocus();

      clickOnSearchInput();

      expect(searchInputNode).not.toHaveFocus();
      removeTestContainer();
    });

    it('allows no action on the toggle indicator', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const { clickOnToggleIndicator, toggleIndicatorNode, getItemNodes } = renderDropdown(
        {
          disabled: true,
        },
        testContainer,
      );

      clickOnToggleIndicator();

      expect(getItemNodes()).toHaveLength(0);

      toggleIndicatorNode.focus();

      expect(toggleIndicatorNode).not.toHaveFocus();
      removeTestContainer();
    });
  });

  describe('footer and header messages', () => {
    it('shows loadingMessage when status is loading', () => {
      const loadingMessage = 'loading results';
      const { getItemNodeAtIndex } = renderDropdown({
        open: true,
        loadingMessage,
        loading: true,
      });

      expect(getItemNodeAtIndex(items.length)).toHaveTextContent(loadingMessage);
    });

    it('shows noResultsMessage when status is no results', () => {
      const noResultsMessage = 'oups we found nothing';
      const { getItemNodeAtIndex } = renderDropdown({
        open: true,
        noResultsMessage,
        items: [],
      });

      expect(getItemNodeAtIndex(0)).toHaveTextContent(noResultsMessage);
    });

    it('shows headerMessage when status is custom', () => {
      const headerMessage = 'just some status';
      const { getItemNodeAtIndex } = renderDropdown({
        open: true,
        headerMessage,
      });

      expect(getItemNodeAtIndex(0)).toHaveTextContent(headerMessage);
    });

    it('can juggle between messages depending on the status', () => {
      const headerMessage = 'just some status';
      const noResultsMessage = 'oups we found nothing';
      const loadingMessage = 'loading results';
      const { getItemNodeAtIndex, getItemNodes, rerender } = renderDropdown({
        open: true,
        noResultsMessage,
        loadingMessage,
      });

      expect(getItemNodes()).toHaveLength(items.length);

      rerender({ headerMessage });

      expect(getItemNodes()).toHaveLength(items.length + 1);
      expect(getItemNodeAtIndex(0)).toHaveTextContent(headerMessage);

      rerender({ loading: true });

      expect(getItemNodes()).toHaveLength(items.length + 2);
      expect(getItemNodeAtIndex(0)).toHaveTextContent(headerMessage);
      expect(getItemNodeAtIndex(items.length + 1)).toHaveTextContent(loadingMessage);

      rerender({ items: [] });

      expect(getItemNodes()).toHaveLength(2);
      expect(getItemNodeAtIndex(0)).toHaveTextContent(headerMessage);
      expect(getItemNodeAtIndex(1)).toHaveTextContent(loadingMessage);

      rerender({ loading: false });

      expect(getItemNodes()).toHaveLength(2);
      expect(getItemNodeAtIndex(0)).toHaveTextContent(headerMessage);
      expect(getItemNodeAtIndex(1)).toHaveTextContent(noResultsMessage);

      rerender({ items: [items[0]] });

      expect(getItemNodes()).toHaveLength(2);
      expect(getItemNodeAtIndex(0)).toHaveTextContent(headerMessage);
      expect(getItemNodeAtIndex(1)).toHaveTextContent(items[0]);

      rerender({ headerMessage: undefined });

      expect(getItemNodes()).toHaveLength(1);
      expect(getItemNodeAtIndex(0)).toHaveTextContent(items[0]);
    });
  });

  describe('accessibility trigger button aria labels', () => {
    it('trigger button should not have aria-label', () => {
      const { triggerButtonNode } = renderDropdown({ items });
      expect(triggerButtonNode).not.toHaveAttribute('aria-label');
    });

    it('trigger button should have aria-labelledby which points to trigger button content', () => {
      const { triggerButtonNode } = renderDropdown({ items });
      expect(triggerButtonNode).toHaveAttribute('aria-labelledby');
      expect(triggerButtonNode.getAttribute('aria-labelledby')).toContain('__content');
    });

    it('trigger button merges props correctly', () => {
      const { triggerButtonNode } = renderDropdown({ items, triggerButton: { 'data-test': 'ok' } });
      expect(triggerButtonNode.firstChild).toHaveAttribute('id');
      const contentId = triggerButtonNode.firstElementChild.getAttribute('id');
      expect(triggerButtonNode).toHaveAttribute('aria-labelledby');
      expect(triggerButtonNode.getAttribute('aria-labelledby')).toContain(contentId);
      expect(triggerButtonNode).toHaveAttribute('data-test');
    });

    it('trigger button merges props correctly when content is string', () => {
      const { triggerButtonNode } = renderDropdown({ items, triggerButton: { content: 'ok' } });
      expect(triggerButtonNode.firstChild).toHaveAttribute('id');
      const contentId = triggerButtonNode.firstElementChild.getAttribute('id');
      expect(triggerButtonNode).toHaveAttribute('aria-labelledby');
      expect(triggerButtonNode.getAttribute('aria-labelledby')).toContain(contentId);
      expect(triggerButtonNode.firstChild.textContent).toBe('ok');
    });

    it('trigger button merges props correctly when content is object', () => {
      const { triggerButtonNode } = renderDropdown({
        items,
        triggerButton: { content: { content: 'ok', 'data-test': 'ok' } },
      });
      expect(triggerButtonNode.firstChild).toHaveAttribute('id');
      const contentId = triggerButtonNode.firstElementChild.getAttribute('id');
      expect(triggerButtonNode).toHaveAttribute('aria-labelledby');
      expect(triggerButtonNode.getAttribute('aria-labelledby')).toContain(contentId);
      expect(triggerButtonNode.firstChild.textContent).toBe('ok');
      expect(triggerButtonNode.firstChild).toHaveAttribute('data-test');
    });

    it('trigger button should have aria-labelledby from user prop', () => {
      const { triggerButtonNode } = renderDropdown({ items, 'aria-labelledby': 'form-label' });
      expect(triggerButtonNode.getAttribute('aria-labelledby')).toContain('form-label');
      expect(triggerButtonNode.getAttribute('aria-labelledby')).toContain('__content');
    });

    it('trigger button should not have aria-describedby', () => {
      const { triggerButtonNode } = renderDropdown({ items });
      expect(triggerButtonNode).not.toHaveAttribute('aria-describedby');
    });
  });
});
