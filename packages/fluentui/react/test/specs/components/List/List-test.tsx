import * as React from 'react'

import { isConformant, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import List from 'src/components/List/List'
import implementsCollectionShorthandProp from '../../commonTests/implementsCollectionShorthandProp'
import ListItem, { ListItemProps } from 'src/components/List/ListItem'

const listImplementsCollectionShorthandProp = implementsCollectionShorthandProp(List)

describe('List', () => {
  isConformant(List, {
    constructorName: 'List',
  })
  handlesAccessibility(List, { defaultRootRole: 'list' })
  listImplementsCollectionShorthandProp('items', ListItem, { mapsValueToProp: 'content' })

  const getItems = (onClick?: Function): (ListItemProps & { key: string })[] => [
    { key: 'irving', content: 'Irving', onClick } as any,
    { key: 'skyler', content: 'Skyler' },
    { key: 'dante', content: 'Dante' },
  ]

  describe('items', () => {
    it('renders children', () => {
      const listItems = mountWithProvider(<List items={getItems()} />).find('ListItem')
      expect(listItems.length).toBe(3)
      expect(listItems.first().props().content).toBe('Irving')
      expect(listItems.last().props().content).toBe('Dante')
    })

    it('calls onClick handler for item', () => {
      const onClick = jest.fn()
      const listItems = mountWithProvider(<List items={getItems(onClick)} />).find('ListItem')

      listItems
        .first()
        .find('li')
        .first()
        .simulate('click')
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('selectedIndex', () => {
    it('should not be set by default', () => {
      const listItems = mountWithProvider(<List selectable items={getItems()} />).find('ListItem')
      expect(listItems.everyWhere(item => !item.props().selected)).toBe(true)
    })

    it('can be set a default value', () => {
      const listItems = mountWithProvider(
        <List selectable defaultSelectedIndex={0} items={getItems()} />,
      ).find('ListItem')
      expect(listItems.first().props().selected).toBe(true)
    })

    it('should be set when item is clicked', () => {
      const wrapper = mountWithProvider(
        <List selectable defaultSelectedIndex={0} items={getItems()} />,
      )
      const listItems = wrapper.find('ListItem')
      expect(listItems.at(0).props().selected).toBe(true)

      listItems
        .at(1)
        .find('li')
        .first()
        .simulate('click')

      const updatedItems = wrapper.find('ListItem')

      expect(updatedItems.at(0).props().selected).toBe(false)
      expect(updatedItems.at(1).props().selected).toBe(true)
    })

    it('calls onClick handler for item if `selectable`', () => {
      const onClick = jest.fn()
      const onSelectedIndexChange = jest.fn()
      const listItems = mountWithProvider(
        <List items={getItems(onClick)} onSelectedIndexChange={onSelectedIndexChange} selectable />,
      ).find('ListItem')

      listItems
        .first()
        .find('li')
        .first()
        .simulate('click')

      expect(onClick).toHaveBeenCalled()
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ index: 0 }),
      )
      expect(onSelectedIndexChange).toHaveBeenCalled()
      expect(onSelectedIndexChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ selectedIndex: 0 }),
      )
    })
  })
})
