import * as React from 'react';

import { MenuButton } from 'src/components/MenuButton/MenuButton';
import { Box } from 'src/components/Box/Box';
import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProvider } from '../../../utils';

import {
  validateBehavior,
  ComponentTestFacade,
  menuButtonBehaviorDefinitionTriggerSlotTabbable,
  menuButtonBehaviorDefinitionMenuSlot,
  menuButtonBehaviorDefinitionTriggerSlotNotTabbable,
  menuButtonBehaviorDefinitionTriggerWithTabIndex,
  menuButtonBehaviorDefinitionTriggerSlotWithoutID,
  menuButtonBehaviorDefinitionMenuSlotWithoutID,
} from '@fluentui/a11y-testing';

const mockMenu = { items: ['1', '2', '3'] };

describe('MenuButton', () => {
  isConformant(MenuButton, { testPath: __filename, constructorName: 'MenuButton', autoControlledProps: ['open'] });

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

describe('MenuButtonBehavior', () => {
  const menuToRender = { id: 'menuID', 'data-slotid': 'menu', items: ['1', '2', '3'] };
  const menuToRenderWithoutID = { 'data-slotid': 'menu', items: ['1', '2', '3'] };
  const triggerButton = <button data-slotid="trigger" id="triggerElementID" />;
  const triggerButtonWithoutID = <button data-slotid="trigger" />;

  describe('trigger slot - tabbable - Button', () => {
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerButton, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionTriggerSlotTabbable, testFacade);
    expect(errors).toEqual([]);
  });

  describe('trigger slot - tabbable - Box as button', () => {
    const triggerWithoutTabIndex = <Box data-slotid="trigger" id="triggerElementID" as="button" />;
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerWithoutTabIndex, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionTriggerSlotTabbable, testFacade);
    expect(errors).toEqual([]);
  });

  describe('trigger slot - tabbable - Anchor', () => {
    const triggerWithoutTabIndex = (
      <a href="" data-slotid="trigger" id="triggerElementID">
        triggerLink
      </a>
    );
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerWithoutTabIndex, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionTriggerSlotTabbable, testFacade);
    expect(errors).toEqual([]);
  });

  describe('trigger slot - NO tabbable - Anchor without href', () => {
    const triggerAnchorWtihoutHref = (
      <a data-slotid="trigger" id="triggerElementID">
        triggerLink
      </a>
    );
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerAnchorWtihoutHref, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionTriggerSlotNotTabbable, testFacade);
    expect(errors).toEqual([]);
  });

  describe('trigger slot - NO tabbable - Span', () => {
    const triggerWithoutTabIndex = (
      <span data-slotid="trigger" id="triggerElementID">
        text to trigger popup
      </span>
    );
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerWithoutTabIndex, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionTriggerSlotNotTabbable, testFacade);
    expect(errors).toEqual([]);
  });

  describe('trigger slot - doesnt override tabIndex if exists', () => {
    const triggerWithTabIndex = <button data-slotid="trigger" id="triggerElementID" tabIndex={-1} />;
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerWithTabIndex, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionTriggerWithTabIndex, testFacade);
    expect(errors).toEqual([]);
  });

  describe('trigger slot - autogenerate ID', () => {
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerButtonWithoutID, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionTriggerSlotWithoutID, testFacade);
    expect(errors).toEqual([]);
  });

  describe('menu slot', () => {
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerButton, menu: menuToRender });
    const errors = validateBehavior(menuButtonBehaviorDefinitionMenuSlot, testFacade);
    expect(errors).toEqual([]);
  });

  describe('menu slot - autogenerate ID', () => {
    const testFacade = new ComponentTestFacade(MenuButton, { trigger: triggerButton, menu: menuToRenderWithoutID });
    const errors = validateBehavior(menuButtonBehaviorDefinitionMenuSlotWithoutID, testFacade);
    expect(errors).toEqual([]);
  });
});
