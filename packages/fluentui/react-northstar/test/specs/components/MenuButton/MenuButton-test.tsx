import * as React from 'react';

import { MenuButton } from 'src/components/MenuButton/MenuButton';
import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProvider } from '../../../utils';

const mockMenu = { items: ['1', '2', '3'] };

describe('MenuButton', () => {
  isConformant(MenuButton, { constructorName: 'MenuButton', autoControlledProps: ['open'] });

  describe('accessibility', () => {
    handlesAccessibility(MenuButton);

    describe('onOpenChange', () => {
      test('is called on click', () => {
        const onOpenChange = jest.fn();

        mountWithProvider(<MenuButton trigger={<button />} menu={mockMenu} onOpenChange={onOpenChange} />)
          .find('button')
          .simulate('click');

        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange.mock.calls[0][1]).toMatchObject({ open: true });
      });

      test('is called on click when controlled', () => {
        const onOpenChange = jest.fn();

        mountWithProvider(<MenuButton open={false} trigger={<button />} menu={mockMenu} onOpenChange={onOpenChange} />)
          .find('button')
          .simulate('click');

        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange.mock.calls[0][1]).toMatchObject({ open: true });
      });
    });

    describe('ID handling', () => {
      test('trigger id is used', () => {
        const menuButton = mountWithProvider(<MenuButton trigger={<button id="test-id" />} menu={mockMenu} />);
        const button = menuButton.find('button');
        button.simulate('click');
        const menu = menuButton.find('ul');
        const triggerId = button.prop('id');

        expect(triggerId).toEqual('test-id');
        expect(menu.prop('aria-labelledby')).toEqual(triggerId);
      });

      test('trigger id is generated if not provided', () => {
        const menuButton = mountWithProvider(<MenuButton trigger={<button />} menu={mockMenu} />);
        const button = menuButton.find('button');
        button.simulate('click');
        const menu = menuButton.find('ul');
        const triggerId = button.prop('id');

        expect(triggerId).toMatch(/menubutton-trigger-\d+/);
        expect(menu.prop('aria-labelledby')).toEqual(triggerId);
      });

      test('menu id is used', () => {
        const menuId = 'test-id';
        const menuButton = mountWithProvider(<MenuButton trigger={<button />} menu={{ ...mockMenu, id: menuId }} />);
        menuButton.find('button').simulate('click');

        expect(menuButton.find('ul').prop('id')).toEqual(menuId);
        expect(menuButton.find('button').prop('aria-controls')).toEqual(menuId);
      });

      test('menu id is generated if not provided', () => {
        const menuButton = mountWithProvider(<MenuButton trigger={<button />} menu={mockMenu} />);
        menuButton.find('button').simulate('click');
        const menuId = menuButton.find('ul').prop('id');

        expect(menuId).toMatch(/menubutton-menu-\d+/);
        expect(menuButton.find('button').prop('aria-controls')).toEqual(menuId);
      });
    });
  });
});
