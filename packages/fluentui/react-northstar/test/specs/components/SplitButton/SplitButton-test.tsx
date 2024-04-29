import * as React from 'react';
import { keyboardKey } from '@fluentui/accessibility';

import { SplitButton, SplitButtonProps } from 'src/components/SplitButton/SplitButton';
import { splitButtonToggleClassName } from 'src/components/SplitButton/SplitButtonToggle';
import { isConformant } from 'test/specs/commonTests';
import { ReactWrapper, CommonWrapper } from 'enzyme';
import { mountWithProvider, findIntrinsicElement, createTestContainer } from '../../../utils';
import { menuClassName } from 'src/components/Menu/Menu';
import { menuItemClassName } from 'src/components/Menu/MenuItem';
import { menuButtonClassName } from 'src/components/MenuButton/MenuButton';
import { buttonClassName } from 'src/components/Button/Button';
import { implementsPopperProps } from 'test/specs/commonTests/implementsPopperProps';

const mockMenu = { items: ['1', '2', '3'] };

const getToggleButton = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${splitButtonToggleClassName}`);
const getMainButton = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${menuButtonClassName} .${buttonClassName}`);
const getMenuItems = (wrapper: ReactWrapper): CommonWrapper => findIntrinsicElement(wrapper, `.${menuItemClassName}`);
const getMenu = (wrapper: ReactWrapper): CommonWrapper => findIntrinsicElement(wrapper, `.${menuClassName}`);

describe('SplitButton', () => {
  isConformant(SplitButton, { testPath: __filename, constructorName: 'SplitButton', autoControlledProps: ['open'] });
  implementsPopperProps<SplitButtonProps>(SplitButton, { requiredProps: { open: true } });

  describe('open', () => {
    test('is toggled between true and false on toggle button click', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" />);
      const toggleButton = getToggleButton(wrapper);

      toggleButton.simulate('click');
      expect(getMenuItems(wrapper)).toHaveLength(mockMenu.items.length);

      toggleButton.simulate('click');
      expect(getMenuItems(wrapper)).toHaveLength(0);
    });

    test('is false when clicking menu item', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenuItems(wrapper).at(0).simulate('click');
      expect(getMenuItems(wrapper)).toHaveLength(0);
    });

    test('is true when Alt+ArrowDown is sent to the main button', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" />);

      getMainButton(wrapper).simulate('keydown', { keyCode: keyboardKey.ArrowDown, altKey: true });

      expect(getMenuItems(wrapper)).toHaveLength(mockMenu.items.length);
    });

    test('is false when Alt+ArrowUp is sent to the menu', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />, {
        attachTo: testContainer,
      });

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.ArrowUp, altKey: true });

      expect(getMenuItems(wrapper)).toHaveLength(0);
      expect(document.activeElement).toBe(getMainButton(wrapper).getDOMNode());
      removeTestContainer();
    });

    test('is false when Escape is sent to the menu', () => {
      const { testContainer, removeTestContainer } = createTestContainer();
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />, {
        attachTo: testContainer,
      });

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.Escape });

      expect(getMenuItems(wrapper)).toHaveLength(0);
      expect(document.activeElement).toBe(getMainButton(wrapper).getDOMNode());
      removeTestContainer();
    });

    test('is false when Tab is sent to the menu', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.Tab, shiftKey: false });

      expect(getMenuItems(wrapper)).toHaveLength(0);
    });

    test('is false when Enter is sent to the menu', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.Enter });
      getMenuItems(wrapper).at(0).simulate('click');

      expect(getMenuItems(wrapper)).toHaveLength(0);
    });

    test('is false when Shift+Tab is sent to the menu', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.Tab, shiftKey: true });

      expect(getMenuItems(wrapper)).toHaveLength(0);
    });
  });

  test('onMenuItemClick', () => {
    const onMenuItemClick = jest.fn();
    const wrapper = mountWithProvider(
      <SplitButton menu={mockMenu} button="test" onMenuItemClick={onMenuItemClick} defaultOpen />,
    );

    getMenuItems(wrapper).at(0).simulate('click');
    expect(onMenuItemClick).toHaveBeenCalledTimes(1);
  });

  test('onMainButtonClick', () => {
    const onMainButtonClick = jest.fn();
    const wrapper = mountWithProvider(
      <SplitButton menu={mockMenu} button="test" onMainButtonClick={onMainButtonClick} />,
    );

    getMainButton(wrapper).simulate('click');
    expect(onMainButtonClick).toHaveBeenCalledTimes(1);
    expect(onMainButtonClick).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ content: 'test' }));
  });
});
