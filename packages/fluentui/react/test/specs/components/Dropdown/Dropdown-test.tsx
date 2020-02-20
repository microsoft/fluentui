import * as React from 'react'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

import Dropdown from 'src/components/Dropdown/Dropdown'
import DropdownSearchInput from 'src/components/Dropdown/DropdownSearchInput'
import DropdownSelectedItem from 'src/components/Dropdown/DropdownSelectedItem'
import { isConformant } from 'test/specs/commonTests'
import { findIntrinsicElement, mountWithProvider } from 'test/utils'
import { ReactWrapper, CommonWrapper } from 'enzyme'
import { DropdownItemProps } from 'src/components/Dropdown/DropdownItem'
import { ShorthandValue } from 'src/types'

jest.dontMock('keyboard-key')
jest.useFakeTimers()
// jest.mock('lodash')

const getTriggerButtonWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.triggerButton}`)

const getToggleIndicatorWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.toggleIndicator}`)

const getSearchInputWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${DropdownSearchInput.slotClassNames.input}`)

const getItemsListWrapper = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.itemsList}`)

const getItemAtIndexWrapper = (wrapper: ReactWrapper, index: number = 0): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.item}`).at(index)

const getSelectedItemAtIndexWrapper = (wrapper: ReactWrapper, index: number = 0): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`).at(index)

const getSelectedItemHeaderAtIndexWrapper = (
  wrapper: ReactWrapper,
  index: number = 0,
): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${DropdownSelectedItem.slotClassNames.header}`).at(index)

describe('Dropdown', () => {
  const items = ['item1', 'item2', 'item3', 'item4', 'item5']
  isConformant(Dropdown, { hasAccessibilityProp: false })

  describe('clearable', () => {
    it('calls onChange on Icon click with an `empty` value', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown clearable onSelectedChange={onSelectedChange} items={items} value={items[0]} />,
      )

      wrapper.find({ className: Dropdown.slotClassNames.clearIndicator }).simulate('click')
      expect(onSelectedChange).toBeCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({
          activeSelectedIndex: undefined,
          highlightedIndex: null,
          open: false,
          searchQuery: undefined,
          value: null,
        }),
      )
    })
  })

  describe('open', () => {
    const onOpenChange = jest.fn()

    afterEach(() => {
      onOpenChange.mockReset()
    })

    it('is "false" when closed by trigger button click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click').simulate('click')

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "false" when closed by toggle indicator click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      triggerButton.simulate('click')
      toggleIndicator.simulate('click')

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "false" when closed by hitting Escape in search input', () => {
      const wrapper = mountWithProvider(
        <Dropdown onOpenChange={onOpenChange} search items={items} />,
      )
      const searchInput = getSearchInputWrapper(wrapper)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'test' } })
        .simulate('keydown', { keyCode: keyboardKey.Escape, key: 'Escape' })

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "false" when closed by hitting Escape in items list', () => {
      const wrapper = mountWithProvider(
        <Dropdown onOpenChange={onOpenChange} multiple items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton
        .simulate('click')
        .simulate('keydown', { keyCode: keyboardKey.Escape, key: 'Escape' })

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('is "false" when an item has been selected', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('when set to "true" by trigger button click will move focus to the items list', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')

      expect(document.activeElement).toEqual(getItemsListWrapper(wrapper).getDOMNode())
    })
  })

  describe('highlightedIndex', () => {
    const onOpenChange = jest.fn()

    afterEach(() => {
      onOpenChange.mockReset()
      jest.runAllTimers()
    })

    it('is null when opened by click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it('is null when opened by toggle indicator click', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it('is first item index when opened by arrow down key', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is last item index when opened by arrow up key', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: items.length - 1,
          open: true,
        }),
      )
    })

    it('has the provided prop value when opened by click', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex,
          open: true,
        }),
      )
    })

    it('has the provided prop value when opened by arrow down key', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex,
          open: true,
        }),
      )
    })

    it('has the provided prop value when opened by arrow up key', () => {
      const highlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown highlightedIndex={highlightedIndex} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton
        .simulate('focus')
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex,
          open: true,
        }),
      )
    })

    it('is defaultHighlightedIndex prop value at first opening', () => {
      const defaultHighlightedIndex = 1
      const wrapper = mountWithProvider(
        <Dropdown
          defaultHighlightedIndex={defaultHighlightedIndex}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: defaultHighlightedIndex,
          open: true,
        }),
      )
    })

    it('is null on second and subsequent open when defaultHighlightedIndex prop is passed', () => {
      const wrapper = mountWithProvider(
        <Dropdown defaultHighlightedIndex={1} onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton
        .simulate('click')
        .simulate('click')
        .simulate('click')

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
    })

    it('is 0 on first open when highlightFirstItemOnOpen prop is provided', () => {
      const wrapper = mountWithProvider(
        <Dropdown highlightFirstItemOnOpen onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is 0 on second and subsequent open when highlightFirstItemOnOpen prop is provided', () => {
      const wrapper = mountWithProvider(
        <Dropdown highlightFirstItemOnOpen onOpenChange={onOpenChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton
        .simulate('click')
        .simulate('click')
        .simulate('click')

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
    })

    it('is 0 on searchQuery first change and when highlightFirstItemOnOpen prop is provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          highlightFirstItemOnOpen
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = getSearchInputWrapper(wrapper)

      searchInput.simulate('click').simulate('change', { target: { value: 'i' } })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 0,
          open: true,
        }),
      )
      expect(onSearchQueryChange).toBeCalledTimes(1)
      expect(onSearchQueryChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'i',
          highlightedIndex: 0,
        }),
      )
    })

    it('is reset to 0 on searchQuery change and when highlightFirstItemOnOpen prop is provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          highlightFirstItemOnOpen
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = getSearchInputWrapper(wrapper)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'i' } })
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' }) // now it's on index 1.
        .simulate('change', { target: { value: 'in' } }) // now it should reset to 0.

      expect(onSearchQueryChange).toBeCalledTimes(2)
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'in',
          highlightedIndex: 0,
        }),
      )
    })

    it('is null on searchQuery first change and when highlightFirstItemOnOpen prop is not provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = getSearchInputWrapper(wrapper)

      searchInput.simulate('click').simulate('change', { target: { value: 'i' } })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: null,
          open: true,
        }),
      )
      expect(onSearchQueryChange).toBeCalledTimes(1)
      expect(onSearchQueryChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'i',
          highlightedIndex: null,
        }),
      )
    })

    it('is reset to null on searchQuery change and when highlightFirstItemOnOpen prop is not provided', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown
          search
          onSearchQueryChange={onSearchQueryChange}
          onOpenChange={onOpenChange}
          items={items}
        />,
      )
      const searchInput = getSearchInputWrapper(wrapper)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'i' } }) // no item highlighted.
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' }) // highlight on index 0.
        .simulate('change', { target: { value: 'in' } })

      expect(onSearchQueryChange).toBeCalledTimes(2)
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: 'in',
          highlightedIndex: null,
        }),
      )
    })

    it('is the index of the value previously selected when opened', () => {
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })
      getTriggerButtonWrapper(wrapper).simulate('click')

      expect(onOpenChange).toBeCalledTimes(3)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 1,
          open: true,
        }),
      )
    })

    it('is the index of the (value previously selected + 1) when opened by arrow down', () => {
      const wrapper = mountWithProvider(
        <Dropdown onOpenChange={onOpenChange} items={items} value={items[2]} />,
      )

      getTriggerButtonWrapper(wrapper).simulate('keydown', {
        keyCode: keyboardKey.ArrowDown,
        key: 'ArrowDown',
      })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 3,
          open: true,
        }),
      )
    })

    it('is the index of the (value previously selected - 1) when opened by arrow up', () => {
      const wrapper = mountWithProvider(
        <Dropdown onOpenChange={onOpenChange} items={items} value={items[2]} />,
      )

      getTriggerButtonWrapper(wrapper).simulate('keydown', {
        keyCode: keyboardKey.ArrowUp,
        key: 'ArrowUp',
      })

      expect(onOpenChange).toBeCalledTimes(1)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          highlightedIndex: 1,
          open: true,
        }),
      )
    })

    it('is changed correctly on arrow down navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = getItemsListWrapper(wrapper)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      _.times(2, index => {
        itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

        expect(dropdown.state('highlightedIndex')).toBe(index)
      })
    })

    it('is changed correctly on arrow up navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = getItemsListWrapper(wrapper)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      _.times(2, index => {
        itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

        expect(dropdown.state('highlightedIndex')).toBe(items.length - 1 - index)
      })
    })

    it('is changed correctly on home key navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = getItemsListWrapper(wrapper)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      _.times(2, () => {
        itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
      })
      itemsList.simulate('keydown', { keyCode: keyboardKey.Home, key: 'Home' })

      expect(dropdown.state('highlightedIndex')).toBe(0)
    })

    it('is changed correctly on end key navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = getItemsListWrapper(wrapper)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      _.times(2, () => {
        itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
      })
      itemsList.simulate('keydown', { keyCode: keyboardKey.Home, key: 'End' })

      expect(dropdown.state('highlightedIndex')).toBe(items.length - 1)
    })

    it('wraps to start and end on navigation', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} defaultHighlightedIndex={1} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = getItemsListWrapper(wrapper)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })
        .simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })

      expect(dropdown.state('highlightedIndex')).toBe(items.length - 1)

      itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })

      expect(dropdown.state('highlightedIndex')).toBe(0)
    })

    it('is updated correctly when hovering over items', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemAtIndex1 = getItemAtIndexWrapper(wrapper, 1)
      itemAtIndex1.simulate('mousemove')

      expect(dropdown.state('highlightedIndex')).toBe(1)

      const itemAtIndex3 = getItemAtIndexWrapper(wrapper, 3)
      itemAtIndex3.simulate('mousemove')

      expect(dropdown.state('highlightedIndex')).toBe(3)
    })

    it('is updated correctly when hovering over items and using arrow keys to navigate', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      const itemsList = getItemsListWrapper(wrapper)

      triggerButton.simulate('click')
      const itemAtIndex1 = getItemAtIndexWrapper(wrapper, 1)
      itemAtIndex1.simulate('mousemove')
      itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowUp, key: 'ArrowUp' })
      expect(dropdown.state('highlightedIndex')).toBe(0)

      const itemAtIndex2 = getItemAtIndexWrapper(wrapper, 2)
      itemAtIndex2.simulate('mousemove')
      itemsList.simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
      expect(dropdown.state('highlightedIndex')).toBe(3)
    })

    it('jumps to the item starting with the character key pressed', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`]
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      itemsList.simulate('keydown', { keyCode: keyboardKey.P, key: 'P' })

      expect(dropdown.state('highlightedIndex')).toBe(1)
    })

    it('jumps starting from the current highlightedIndex on character key press', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`]
      const wrapper = mountWithProvider(<Dropdown items={items} defaultHighlightedIndex={1} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      itemsList.simulate('keydown', { keyCode: keyboardKey.A, key: 'A' })

      expect(dropdown.state('highlightedIndex')).toBe(2)
    })

    it('is updated in a circular way on same character key press', () => {
      const items = ['Athos', 'Porthos', 'Aramis', `D'Artagnan`]
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      itemsList.simulate('keydown', { keyCode: keyboardKey.A, key: 'A' })
      expect(dropdown.state('highlightedIndex')).toBe(0)

      jest.runAllTimers()
      itemsList.simulate('keydown', { keyCode: keyboardKey.A, key: 'A' })
      expect(dropdown.state('highlightedIndex')).toBe(2)

      jest.runAllTimers()
      itemsList.simulate('keydown', { keyCode: keyboardKey.A, key: 'A' })
      expect(dropdown.state('highlightedIndex')).toBe(0)
    })

    it('jumps to the item starting with the keys tapped in rapid succession', () => {
      const items = ['Albert', 'Alfred', 'Alena', 'Ali']
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = wrapper.find(`ul.${Dropdown.slotClassNames.itemsList}`)
      const triggerButton = wrapper.find(`button.${Dropdown.slotClassNames.triggerButton}`)

      triggerButton.simulate('click')
      itemsList.simulate('keydown', { keyCode: keyboardKey.A, key: 'A' })
      expect(dropdown.state('highlightedIndex')).toBe(0)

      jest.advanceTimersByTime(Dropdown.charKeyPressedCleanupTime / 2)
      itemsList.simulate('keydown', { keyCode: keyboardKey.L, key: 'L' })
      expect(dropdown.state('highlightedIndex')).toBe(0)

      jest.advanceTimersByTime(Dropdown.charKeyPressedCleanupTime / 2)
      itemsList.simulate('keydown', { keyCode: keyboardKey.E, key: 'E' })
      expect(dropdown.state('highlightedIndex')).toBe(2)
    })
  })

  describe('value', () => {
    it('is set by clicking on item', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const item = getItemAtIndexWrapper(wrapper, itemSelectedIndex)
      item.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
        }),
      )
    })

    it('is set by using Enter on highlighted item', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)
      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Enter, key: 'Enter' })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[0],
        }),
      )
    })

    it('is set by using Tab on highlighted item', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab' })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[0],
        }),
      )
    })

    it('is set by using Shift+Tab on highlighted item', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', shiftKey: true })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[0],
        }),
      )
    })

    it('is replaced when another item is selected', () => {
      const itemSelectedIndex = 3
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper, 1)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      triggerButton.simulate('click')
      const itemAtIndex = getItemAtIndexWrapper(wrapper, itemSelectedIndex)
      itemAtIndex.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(2)
      expect(onSelectedChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
        }),
      )
    })

    it('has an array of items if more items are selected and the multiple prop is supplied', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} multiple items={items} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemAtIndex1 = getItemAtIndexWrapper(wrapper, 1)
      itemAtIndex1.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      triggerButton.simulate('click')
      const itemAtIndex2 = getItemAtIndexWrapper(wrapper, 3)
      itemAtIndex2.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(2)
      expect(onSelectedChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: ['item2', 'item5'],
        }),
      )
    })

    it('has items removed on empty search query backspace', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} multiple items={items} search />,
      )
      const searchInput = getSearchInputWrapper(wrapper)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')
      let firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      toggleIndicator.simulate('click')
      firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      searchInput
        .simulate('click')
        .simulate('keydown', { keyCode: keyboardKey.Backspace, key: 'Backspace' })

      expect(onSelectedChange).toHaveBeenCalledTimes(3)
      expect(onSelectedChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          value: [items[0]],
        }),
      )
    })

    it('has the item removed if it receives delete key down', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown multiple items={items} onSelectedChange={onSelectedChange} value={items} />,
      )
      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, items.length - 1)
      selectedItemHeader.simulate('click')
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, items.length - 1)
      selectedItem.simulate('keydown', {
        keyCode: keyboardKey.Delete,
        key: 'Delete',
      })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items.slice(0, items.length - 1),
        }),
      )
    })

    it('has the item removed if it receives click on remove icon', () => {
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown multiple items={items} onSelectedChange={onSelectedChange} value={items} />,
      )
      const selectedItemIcon = wrapper
        .find(`span.${DropdownSelectedItem.slotClassNames.icon}`)
        .at(items.length - 1)
      selectedItemIcon.simulate('click')

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items.slice(0, items.length - 1),
        }),
      )
    })
  })

  describe('getA11ySelectionMessage', () => {
    afterEach(() => {
      jest.runAllTimers()
    })

    it('creates message container element', () => {
      mountWithProvider(<Dropdown items={[]} getA11ySelectionMessage={{}} />)
      expect(
        document.querySelector(
          `[role="status"][aria-live="polite"][aria-relevant="additions text"]`,
        ),
      ).toBeTruthy()
    })

    it('has the onAdd message inserted and cleared after an item has been added to selection', () => {
      const wrapper = mountWithProvider(
        <Dropdown
          multiple
          items={items}
          getA11ySelectionMessage={{ onAdd: item => 'bla bla added' }}
        />,
      )
      const dropdown = wrapper.find(Dropdown)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(dropdown.state('a11ySelectionStatus')).toBe('bla bla added')

      jest.runAllTimers()

      expect(dropdown.state('a11ySelectionStatus')).toBe('')
    })

    it('has the onRemove message inserted and cleared after an item has been removed from selection', () => {
      const wrapper = mountWithProvider(
        <Dropdown
          multiple
          items={items}
          getA11ySelectionMessage={{ onRemove: item => 'bla bla removed' }}
        />,
      )
      const dropdown = wrapper.find(Dropdown)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })
      jest.runAllTimers()
      const removeIcon = wrapper.find(`span.${DropdownSelectedItem.slotClassNames.icon}`)
      removeIcon.simulate('click')

      expect(dropdown.state('a11ySelectionStatus')).toBe('bla bla removed')

      jest.runAllTimers()

      expect(dropdown.state('a11ySelectionStatus')).toBe('')
    })
  })

  describe('searchQuery', () => {
    it("updates component's state on props updates", () => {
      const wrapper = mountWithProvider(<Dropdown items={items} search searchQuery="foo" />)

      expect(wrapper.find(Dropdown).state('searchQuery')).toBe('foo')

      wrapper.setProps({ searchQuery: 'bar' } as any)
      expect(wrapper.find(Dropdown).state('searchQuery')).toBe('bar')
    })

    it('closes dropdown when changed to empty string', () => {
      const dropdown = mountWithProvider(<Dropdown items={items} search />).find(Dropdown)

      dropdown.find('input').simulate('change', { target: { value: 'foo' } })
      expect(dropdown.state('open')).toBe(true)
      expect(dropdown.state('searchQuery')).toBe('foo')

      dropdown.find('input').simulate('change', { target: { value: '' } })
      expect(dropdown.state('open')).toBe(false)
      expect(dropdown.state('searchQuery')).toBe('')
    })

    it('is the string equivalent of selected item in single search', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} search items={items} />,
      )
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')
      const itemAtIndex = getItemAtIndexWrapper(wrapper, itemSelectedIndex)
      itemAtIndex.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: items[itemSelectedIndex],
          searchQuery: items[itemSelectedIndex],
        }),
      )
    })

    it('is set to empty by hitting Escape in search input', () => {
      const onSearchQueryChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSearchQueryChange={onSearchQueryChange} search items={items} />,
      )
      const searchInput = getSearchInputWrapper(wrapper)

      searchInput
        .simulate('click')
        .simulate('change', { target: { value: 'test' } })
        .simulate('keydown', { keyCode: keyboardKey.Escape, key: 'Escape' })

      expect(onSearchQueryChange).toBeCalledTimes(2)
      expect(onSearchQueryChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          searchQuery: '',
        }),
      )
    })

    it('is set to empty when item is selected in multiple search', () => {
      const itemSelectedIndex = 2
      const onSelectedChange = jest.fn()
      const wrapper = mountWithProvider(
        <Dropdown onSelectedChange={onSelectedChange} search multiple items={items} />,
      )
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')
      const itemAtIndex = getItemAtIndexWrapper(wrapper, itemSelectedIndex)
      itemAtIndex.simulate('click', { nativeEvent: { stopImmediatePropagation: jest.fn() } })

      expect(onSelectedChange).toHaveBeenCalledTimes(1)
      expect(onSelectedChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          value: [items[itemSelectedIndex]],
          searchQuery: '',
        }),
      )
    })
  })

  describe('activeSelectedIndex', () => {
    it('is unset by default', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const dropdown = wrapper.find(Dropdown)

      expect(dropdown.state('activeSelectedIndex')).toBe(null)
    })

    it('is set on active item click', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const dropdown = wrapper.find(Dropdown)

      const selectedItem = getSelectedItemHeaderAtIndexWrapper(wrapper, 2)
      selectedItem.simulate('click')

      expect(dropdown.state('activeSelectedIndex')).toBe(2)
    })

    it('is set as last index on left arrow from the search query', () => {
      const wrapper = mountWithProvider(<Dropdown multiple search items={items} value={items} />)
      const dropdown = wrapper.find(Dropdown)
      const searchInput = getSearchInputWrapper(wrapper)

      searchInput.simulate('keydown', { keyCode: keyboardKey.ArrowLeft, key: 'ArrowLeft' })

      expect(dropdown.state('activeSelectedIndex')).toBe(items.length - 1)
    })

    it('is updated on arrow navigation after being set by click', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const dropdown = wrapper.find(Dropdown)
      const selectedItemAtIndex2 = getSelectedItemAtIndexWrapper(wrapper, 2)
      const selectedItemHeaderAtIndex2 = getSelectedItemHeaderAtIndexWrapper(wrapper, 2)

      selectedItemHeaderAtIndex2.simulate('click')
      selectedItemAtIndex2.simulate('keydown', { keyCode: keyboardKey.ArrowLeft, key: 'ArrowLeft' })

      expect(dropdown.state('activeSelectedIndex')).toBe(1)

      const selectedItemAtIndex1 = getSelectedItemAtIndexWrapper(wrapper, 1)
      selectedItemAtIndex1.simulate('keydown', {
        keyCode: keyboardKey.ArrowRight,
        key: 'ArrowRight',
      })

      expect(dropdown.state('activeSelectedIndex')).toBe(2)
    })

    it('stays as "0" on left arrow from the first selected item', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const dropdown = wrapper.find(Dropdown)
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper)
      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, 0)
      selectedItemHeader.simulate('click')
      selectedItem.simulate('keydown', { keyCode: keyboardKey.ArrowLeft, key: 'ArrowLeft' })
      selectedItem.simulate('keydown', { keyCode: keyboardKey.ArrowLeft, key: 'ArrowLeft' })

      expect(dropdown.state('activeSelectedIndex')).toBe(0)
    })

    it('gets unset on right arrow from the last selected item', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const dropdown = wrapper.find(Dropdown)

      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, items.length - 1)
      selectedItemHeader.simulate('click')
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, items.length - 1)
      selectedItem.simulate('keydown', {
        keyCode: keyboardKey.ArrowRight,
        key: 'ArrowRight',
      })

      expect(dropdown.state('activeSelectedIndex')).toBe(null)
    })

    it('gets unset on the removal of selected item', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const dropdown = wrapper.find(Dropdown)

      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, items.length - 1)
      selectedItemHeader.simulate('click')
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, items.length - 1)
      selectedItem.simulate('keydown', {
        keyCode: keyboardKey.Delete,
        key: 'Delete',
      })

      expect(dropdown.state('activeSelectedIndex')).toBe(null)
    })

    it('moves focus to the label when is active', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)

      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, 2)
      selectedItemHeader.simulate('click')

      expect(document.activeElement).toEqual(getSelectedItemAtIndexWrapper(wrapper, 2).getDOMNode())
    })

    it('moves focus back to the trigger button on arrow right from last selected item', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, items.length - 1)
      selectedItemHeader.simulate('click')
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, items.length - 1)
      selectedItem.simulate('keydown', { keyCode: keyboardKey.ArrowRight, key: 'ArrowRight' })

      expect(document.activeElement).toEqual(triggerButton.getDOMNode())
    })

    it('moves focus back to the search input on arrow right from last selected item', () => {
      const wrapper = mountWithProvider(<Dropdown multiple search items={items} value={items} />)
      const searchInput = getSearchInputWrapper(wrapper)

      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, items.length - 1)
      selectedItemHeader.simulate('click')
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, items.length - 1)
      selectedItem.simulate('keydown', { keyCode: keyboardKey.ArrowRight, key: 'ArrowRight' })

      expect(document.activeElement).toEqual(searchInput.getDOMNode())
    })

    it('moves focus back to the trigger button on removal of selected item', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, 2)
      selectedItemHeader.simulate('click')
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, 2)
      selectedItem.simulate('keydown', { keyCode: keyboardKey.Delete, key: 'Delete' })

      expect(document.activeElement).toEqual(triggerButton.getDOMNode())
    })

    it('moves focus back to the search input on removal of selected item', () => {
      const wrapper = mountWithProvider(<Dropdown multiple search items={items} value={items} />)
      const searchInput = getSearchInputWrapper(wrapper)

      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, 1)
      selectedItemHeader.simulate('click')
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, 1)
      selectedItem.simulate('keydown', { keyCode: keyboardKey.Delete, key: 'Delete' })

      expect(document.activeElement).toEqual(searchInput.getDOMNode())
    })

    it('moves focus back to the last selected item after input focus and left arrow', () => {
      const wrapper = mountWithProvider(<Dropdown multiple search items={items} value={items} />)
      const searchInput = getSearchInputWrapper(wrapper)
      const selectedItem = getSelectedItemAtIndexWrapper(wrapper, items.length - 1)
      const selectedItemHeader = getSelectedItemHeaderAtIndexWrapper(wrapper, items.length - 1)

      selectedItemHeader.simulate('click')
      searchInput.simulate('click')
      searchInput.simulate('keydown', { keyCode: keyboardKey.ArrowLeft, key: 'ArrowLeft' })

      expect(document.activeElement).toEqual(selectedItem.getDOMNode())
    })
  })

  describe('focused', () => {
    it('is "true" when focus is on trigger button', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      const dropdown = wrapper.find(Dropdown)

      triggerButton.simulate('focus')

      expect(dropdown.state('focused')).toBe(true)
    })

    it('is "true" when focus is on search input', () => {
      const wrapper = mountWithProvider(<Dropdown search items={items} />)
      const searchInput = getSearchInputWrapper(wrapper)
      const dropdown = wrapper.find(Dropdown)

      searchInput.simulate('focus')

      expect(dropdown.state('focused')).toBe(true)
    })

    it('is "true" when focus is on the list', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} open />)
      const dropdown = wrapper.find(Dropdown)
      const itemsList = getItemsListWrapper(wrapper)

      itemsList.simulate('focus')

      expect(dropdown.state('focused')).toBe(true)
    })
  })

  describe('toggleIndicator', () => {
    it('closes the open menu on click', () => {
      const onOpenChange = jest.fn()
      const wrapper = mountWithProvider(<Dropdown onOpenChange={onOpenChange} items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      triggerButton.simulate('click')
      toggleIndicator.simulate('click')

      expect(onOpenChange).toBeCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(
        null,
        expect.objectContaining({
          open: false,
        }),
      )
    })

    it('moves focus to list in selection mode', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')

      expect(document.activeElement).toEqual(getItemsListWrapper(wrapper).getDOMNode())
    })

    it('moves focus to input in search mode', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} search />)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')

      expect(document.activeElement).toEqual(getSearchInputWrapper(wrapper).getDOMNode())
    })
  })

  describe('moveFocusOnTab', () => {
    const preventDefault = jest.fn()

    afterEach(() => {
      preventDefault.mockReset()
    })

    it('keeps focus on trigger button when not passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('keeps focus on input when not passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple search items={items} />)
      const toggleIndicator = getToggleIndicatorWrapper(wrapper)

      toggleIndicator.simulate('click')
      const searchInput = getSearchInputWrapper(wrapper)
      searchInput
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).toBeCalled()
    })

    it('allows focus to move to next item when passed', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} moveFocusOnTab />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const itemsList = getItemsListWrapper(wrapper)
      itemsList
        .simulate('keydown', { keyCode: keyboardKey.ArrowDown, key: 'ArrowDown' })
        .simulate('keydown', { keyCode: keyboardKey.Tab, key: 'Tab', preventDefault })

      expect(preventDefault).not.toBeCalled()
    })
  })

  describe('multiple', () => {
    it('can be switched to "multiple"', () => {
      const wrapper = mountWithProvider(<Dropdown items={items} value={items[0]} />)

      expect(
        findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`),
      ).toHaveLength(0)

      wrapper.setProps({ multiple: true } as any)
      expect(
        findIntrinsicElement(wrapper, `.${Dropdown.slotClassNames.selectedItem}`),
      ).toHaveLength(1)
    })

    it('does not contain duplicities after an item is selected', () => {
      const wrapper = mountWithProvider(<Dropdown multiple items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: _.noop } })

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(false)
    })

    it('does not contain duplicities when value is set', () => {
      const items = ['James Smith']
      const value = ['James Smith']
      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={value} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(false)
    })

    it('contains "duplicates" by default', () => {
      const items = [{ key: '1', header: 'James Smith' }]
      const value = [{ key: '1', header: 'John Locke' }]

      const wrapper = mountWithProvider(<Dropdown multiple items={items} value={value} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)
      triggerButton.simulate('click')

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(true)
    })

    it('does not contain duplicates when proper itemToValue prop is used', () => {
      const items = [{ id: '1', header: 'James Smith' }]
      const value = [{ id: '1', header: 'John Locke' }]
      const itemToValue = (item: ShorthandValue<DropdownItemProps>): string => {
        if (!item || !React.isValidElement(item)) {
          return ''
        }
        return (item as any).id
      }

      const wrapper = mountWithProvider(
        <Dropdown multiple items={items} value={value} itemToValue={itemToValue} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)
      triggerButton.simulate('click')

      expect(getSelectedItemAtIndexWrapper(wrapper, 0).exists()).toBe(true)
      expect(getItemAtIndexWrapper(wrapper, items.length - 1).exists()).toBe(false)
    })
  })

  describe('items', () => {
    it('have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn()
      const stopPropagation = jest.fn()
      const stopImmediatePropagation = jest.fn()
      const mockedEvent = { stopPropagation, nativeEvent: { stopImmediatePropagation } }
      const items = [{ header: 'Venom', onClick }]
      const wrapper = mountWithProvider(<Dropdown items={items} />)
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', mockedEvent)

      expect(onClick).toBeCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining(mockedEvent),
        expect.objectContaining({
          header: 'Venom',
        }),
      )
      expect(stopPropagation).toBeCalledTimes(1)
      expect(stopImmediatePropagation).toBeCalledTimes(1)
    })

    it('when selected have onClick called when passed stop event from being propagated', () => {
      const onClick = jest.fn()
      const stopPropagation = jest.fn()
      const stopImmediatePropagation = jest.fn()
      const mockedEvent = { stopPropagation, nativeEvent: { stopImmediatePropagation } }
      const items = [{ header: 'Venom', onClick }]
      const wrapper = mountWithProvider(<Dropdown items={items} value={items} multiple />)
      const selectedItemHeaderAtIndex0 = getSelectedItemHeaderAtIndexWrapper(wrapper, 0)

      selectedItemHeaderAtIndex0.simulate('click', mockedEvent)

      expect(onClick).toBeCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining(mockedEvent),
        expect.objectContaining({
          header: 'Venom',
        }),
      )
      expect(stopPropagation).toBeCalledTimes(1)
    })
  })

  describe('renderSelectedItem', () => {
    it('calls renderSelectedItem in multiple selection', () => {
      const renderSelectedItem = jest.fn((selectedItem, props) => null)
      const wrapper = mountWithProvider(
        <Dropdown multiple items={items} renderSelectedItem={renderSelectedItem} />,
      )
      const triggerButton = getTriggerButtonWrapper(wrapper)

      triggerButton.simulate('click')
      const firstItem = getItemAtIndexWrapper(wrapper)
      firstItem.simulate('click', { nativeEvent: { stopImmediatePropagation: _.noop } })
      triggerButton.simulate('click')
      const secondItem = getItemAtIndexWrapper(wrapper, 1)
      secondItem.simulate('click', { nativeEvent: { stopImmediatePropagation: _.noop } })

      expect(renderSelectedItem).toBeCalled()
    })
  })
})
