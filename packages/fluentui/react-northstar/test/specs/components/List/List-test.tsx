import * as React from 'react';

import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';

import { List } from 'src/components/List/List';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { ListItem, ListItemProps } from 'src/components/List/ListItem';

const listImplementsCollectionShorthandProp = implementsCollectionShorthandProp(List);

describe('List', () => {
  isConformant(List, {
    testPath: __filename,
    constructorName: 'List',
  });
  handlesAccessibility(List, { defaultRootRole: 'list' });
  listImplementsCollectionShorthandProp('items', ListItem, { mapsValueToProp: 'content' });

  const getItems = (onClick?: Function): (ListItemProps & { key: string })[] => [
    { key: 'robert', content: 'Robert', onClick } as any,
    { key: 'celeste', content: 'Celeste' },
    { key: 'cecil', content: 'Cecil' },
  ];

  describe('items', () => {
    it('renders children', () => {
      const listItems = mountWithProvider(<List items={getItems()} />).find('ListItem');
      expect(listItems.length).toBe(3);
      expect(listItems.first().props().content).toBe('Robert');
      expect(listItems.last().props().content).toBe('Cecil');
    });

    it('calls onClick handler for item', () => {
      const onClick = jest.fn();
      const listItems = mountWithProvider(<List items={getItems(onClick)} />).find('ListItem');

      listItems.first().find('li').first().simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('selectedIndex', () => {
    it('should not be set by default', () => {
      const wrapper = mountWithProvider(<List selectable items={getItems()} />);

      expect(wrapper.find('li').filterWhere(item => Boolean(item.prop('aria-selected')))).toHaveLength(0);
    });

    it('can be set a default value', () => {
      const wrapper = mountWithProvider(<List selectable defaultSelectedIndex={0} items={getItems()} />);
      expect(wrapper.find('li').at(0).prop('aria-selected')).toBe(true);
    });

    it('should be set when item is clicked', () => {
      const wrapper = mountWithProvider(<List selectable defaultSelectedIndex={0} items={getItems()} />);

      expect(wrapper.find('li').at(0).prop('aria-selected')).toBe(true);

      wrapper.find('li').at(1).simulate('click');

      expect(wrapper.find('li').at(0).prop('aria-selected')).toBe(false);
      expect(wrapper.find('li').at(1).prop('aria-selected')).toBe(true);
    });

    it('calls onClick handler for item if `selectable`', () => {
      const onClick = jest.fn();
      const onSelectedIndexChange = jest.fn();
      const listItems = mountWithProvider(
        <List items={getItems(onClick)} onSelectedIndexChange={onSelectedIndexChange} selectable />,
      ).find('ListItem');

      listItems.first().find('li').first().simulate('click');

      expect(onClick).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ index: 0 }),
      );
      expect(onSelectedIndexChange).toHaveBeenCalled();
      expect(onSelectedIndexChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ selectedIndex: 0 }),
      );
    });
  });
});
