import * as React from 'react';

import { Menu } from 'src/components/Menu/Menu';
import { isConformant, handlesAccessibility, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProvider, mountWithProviderAndGetComponent } from 'test/utils';
import { implementsCollectionShorthandProp } from '../../commonTests/implementsCollectionShorthandProp';
import { MenuItem, MenuItemProps } from 'src/components/Menu/MenuItem';
import {
  menuBehavior,
  menuAsToolbarBehavior,
  tabListBehavior,
  tabBehavior,
  SpacebarKey,
} from '@fluentui/accessibility';
import { ReactWrapper } from 'enzyme';

const menuImplementsCollectionShorthandProp = implementsCollectionShorthandProp(Menu);

describe('Menu', () => {
  isConformant(Menu, {
    testPath: __filename,
    constructorName: 'Menu',
    autoControlledProps: ['activeIndex'],
    skipAsPropTests: 'as-component',
  });
  menuImplementsCollectionShorthandProp('items', MenuItem);

  const getItems = () => [
    { key: 'home', content: 'home', onClick: jest.fn(), 'data-foo': 'something' },
    { key: 'users', content: 'users', 'data-foo': 'something' },
  ];

  const getNestedItems = () => [
    { key: 'home', content: 'home', onClick: jest.fn(), 'data-foo': 'something' },
    {
      key: 'users',
      content: 'users',
      'data-foo': 'something',
      menu: [
        { key: '1', content: 'Alice' },
        { key: '2', content: 'Bob' },
      ],
    },
  ];

  describe('items', () => {
    it('renders children', () => {
      const menuItems = mountWithProvider(<Menu items={getItems()} />).find('MenuItem');

      expect(menuItems.length).toBe(2);
      expect(menuItems.first().props().content).toBe('home');
      expect(menuItems.last().props().content).toBe('users');
    });

    it('calls onClick handler for item', () => {
      const items = getItems();
      const menuItems = mountWithProvider(<Menu items={items} />).find('MenuItem');

      menuItems.first().find('a').first().simulate('click');
      expect(items[0].onClick).toHaveBeenCalled();
    });

    it('should open on hover and keep open on click', () => {
      const items: MenuItemProps[] = getNestedItems();
      items[1].on = 'hover';
      const menu = mountWithProvider(<Menu items={items} />);

      expect(menu.find('li').at(1).getDOMNode().getAttribute('on')).toBeNull();

      expect(menu.find('MenuItem').length).toBe(2);

      menu.find('MenuItem').find('a').at(1).simulate('click');

      expect(menu.find('MenuItem').length).toBe(4);

      menu.find('MenuItem').find('a').at(1).simulate('mouseenter').simulate('click');

      expect(menu.find('MenuItem').length).toBe(4);
    });

    it('does not call onClick handler for disabled item', () => {
      const items = getItems();
      items[0]['disabled'] = true; // mark the first item as disabled

      const menuItems = mountWithProvider(<Menu items={items} />).find('MenuItem');

      menuItems.first().find('a').first().simulate('click');
      expect(items[0].onClick).not.toHaveBeenCalled();
    });

    it('passes arbitrary props', () => {
      const menuItems = mountWithProvider(<Menu items={getItems()} />).find('MenuItem');

      expect(menuItems.everyWhere(item => item.prop('data-foo') === 'something')).toBe(true);
    });

    it('closes menu when item is clicked using spacebar', () => {
      const menu = mountWithProvider(<Menu items={getNestedItems()} />);
      const menuItems = menu.find('MenuItem');

      menuItems.at(1).find('a').first().simulate('keydown', { keyCode: SpacebarKey });

      expect(menuItems.at(1).at(0).find('a').first().getDOMNode().getAttribute('aria-expanded')).toBe('true');

      menuItems.at(1).at(0).find('a').first().simulate('keydown', { keyCode: SpacebarKey });

      expect(menuItems.at(1).at(0).find('a').first().getDOMNode().getAttribute('aria-expanded')).toBe('false');
    });

    describe('itemsCount and itemPosition', () => {
      it('should be set by default', () => {
        const menuItems = mountWithProvider(<Menu items={getItems()} />).find('MenuItem');

        expect(menuItems.at(0).prop('itemPosition')).toBe(1);
        expect(menuItems.at(0).prop('itemsCount')).toBe(2);

        expect(menuItems.at(1).prop('itemPosition')).toBe(2);
        expect(menuItems.at(1).prop('itemsCount')).toBe(2);
      });

      it('should not be set on the divider', () => {
        const wrapper = mountWithProvider(<Menu items={[...getItems(), { kind: 'divider', key: 'divider' }]} />);
        const menuItems = wrapper.find('MenuItem');
        const menuDividers = wrapper.find('MenuDivider');

        expect(menuItems.at(0).prop('itemPosition')).toBe(1);
        expect(menuItems.at(0).prop('itemsCount')).toBe(2);

        expect(menuItems.at(1).prop('itemsCount')).toBe(2);
        expect(menuItems.at(1).prop('itemPosition')).toBe(2);

        expect(menuDividers.at(0).prop('itemsCount')).toBeUndefined();
        expect(menuDividers.at(0).prop('itemPosition')).toBeUndefined();
      });
    });

    describe('variables', () => {
      function checkMergedVariables(menu: ReactWrapper, isFunction = false): void {
        const menuVariables = menu.find('MenuItem').first().prop('variables');
        const dividerVariables = menu.find('MenuDivider').first().prop('variables');

        expect(isFunction ? (menuVariables as Function)() : menuVariables).toEqual(
          expect.objectContaining({ a: 'menu', b: 'overwritten', c: 'item' }),
        );

        expect(isFunction ? (dividerVariables as Function)() : dividerVariables).toEqual(
          expect.objectContaining({ a: 'menu', b: 'overwrittenInDivider', c: 'divider' }),
        );
      }

      it('are passed from Menu to MenuItem and MenuDivider and correctly merged', () => {
        const menu = mountWithProvider(
          <Menu
            variables={{ a: 'menu', b: 'menu' }}
            items={[
              { key: 1, content: 'menu item', variables: { b: 'overwritten', c: 'item' } },
              {
                key: 'd1',
                kind: 'divider',
                variables: { b: 'overwrittenInDivider', c: 'divider' },
              },
            ]}
          />,
        );

        checkMergedVariables(menu);
      });

      it('as functions are passed from Menu to MenuItem and MenuDivider and correctly merged', () => {
        const menu = mountWithProvider(
          <Menu
            variables={() => ({ a: 'menu', b: 'menu' })}
            items={[
              { key: 1, content: 'menu item', variables: () => ({ b: 'overwritten', c: 'item' }) },
              {
                key: 'd1',
                kind: 'divider',
                variables: () => ({ b: 'overwrittenInDivider', c: 'divider' }),
              },
            ]}
          />,
        );

        checkMergedVariables(menu, true);
      });
    });

    describe('accessibility', () => {
      handlesAccessibility(Menu, {
        defaultRootRole: 'menu',
      });

      test('aria-label should be added to the menu', () => {
        const ariaLabel = 'A Nice Toolbar';
        const menuComponent = mountWithProviderAndGetComponent(Menu, <Menu aria-label={ariaLabel} />);

        expect(getRenderedAttribute(menuComponent, 'aria-label', '')).toBe(ariaLabel);
      });

      test('aria-labelledby should be added to the menu', () => {
        const ariaLabelledByID = 'element-that-labels';
        const menuComponent = mountWithProviderAndGetComponent(Menu, <Menu aria-labelledby={ariaLabelledByID} />);

        expect(getRenderedAttribute(menuComponent, 'aria-labelledby', '')).toBe(ariaLabelledByID);
      });

      test('attributes should override the default ones from child behavior', () => {
        const items = getItems();
        items[0]['accessibility'] = tabBehavior;
        const menuItemComponent = mountWithProviderAndGetComponent(
          Menu,
          <Menu items={items} accessibility={menuBehavior} />, // enforce behavior that has child behavior.
        ).find('MenuItem');
        expect(getRenderedAttribute(menuItemComponent.at(0), 'role', 'a')).toBe('tab');
      });

      describe('as a Toolbar', () => {
        test('root role should be menuAsToolbar', () => {
          const menuComponent = mountWithProviderAndGetComponent(Menu, <Menu accessibility={menuAsToolbarBehavior} />);
          expect(getRenderedAttribute(menuComponent, 'role', '')).toBe('toolbar');
        });

        test('children role should be menuAsToolbarButton', () => {
          const menuItemComponents = mountWithProviderAndGetComponent(
            Menu,
            <Menu accessibility={menuAsToolbarBehavior} items={getItems()} />,
          ).find('MenuItem');
          expect(getRenderedAttribute(menuItemComponents.at(0), 'role', 'a')).toBe('button');
          expect(getRenderedAttribute(menuItemComponents.at(1), 'role', 'a')).toBe('button');
        });
      });

      describe('as a TabList', () => {
        test('root role should be tablist', () => {
          const menuComponent = mountWithProviderAndGetComponent(Menu, <Menu accessibility={tabListBehavior} />);
          expect(getRenderedAttribute(menuComponent, 'role', '')).toBe('tablist');
        });

        test('children role should be tab', () => {
          const menuItemComponents = mountWithProviderAndGetComponent(
            Menu,
            <Menu accessibility={tabListBehavior} items={getItems()} />,
          ).find('MenuItem');
          expect(getRenderedAttribute(menuItemComponents.at(0), 'role', 'a')).toBe('tab');
          expect(getRenderedAttribute(menuItemComponents.at(1), 'role', 'a')).toBe('tab');
        });
      });
    });

    describe('children', () => {
      it('should should select items', () => {
        const onActiveIndexChange = jest.fn();
        const wrapper = mountWithProvider(
          <Menu defaultActiveIndex={0} onActiveIndexChange={onActiveIndexChange}>
            <Menu.Item index={0}>
              <Menu.ItemContent>Editorials</Menu.ItemContent>
            </Menu.Item>
            <Menu.Item index={1}>
              <Menu.ItemContent>Reviews</Menu.ItemContent>
            </Menu.Item>
            <Menu.Item index={2}>
              <Menu.ItemContent>Upcoming Events</Menu.ItemContent>
            </Menu.Item>
          </Menu>,
        );

        wrapper.find('MenuItem').at(1).find('a').simulate('click');

        expect(onActiveIndexChange).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'click' }),
          expect.objectContaining({ activeIndex: 1 }),
        );
      });
    });
  });
});
