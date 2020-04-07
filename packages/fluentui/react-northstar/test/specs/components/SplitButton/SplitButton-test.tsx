import * as React from 'react';
import * as keyboardKey from 'keyboard-key';

import SplitButton from 'src/components/SplitButton/SplitButton';
import SplitButtonToggle from 'src/components/SplitButton/SplitButtonToggle';
import { isConformant } from 'test/specs/commonTests';
import { ReactWrapper, CommonWrapper } from 'enzyme';
import { mountWithProvider, findIntrinsicElement } from '../../../utils';
import Menu from 'src/components/Menu/Menu';
import MenuButton from 'src/components/MenuButton/MenuButton';
import Button from 'src/components/Button/Button';

const mockMenu = { items: ['1', '2', '3'] };

const getToggleButton = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${SplitButtonToggle.className}`);
const getMainButton = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${MenuButton.className} .${Button.className}`);
const getMenuItems = (wrapper: ReactWrapper): CommonWrapper =>
  findIntrinsicElement(wrapper, `.${Menu.slotClassNames.item}`);
const getMenu = (wrapper: ReactWrapper): CommonWrapper => findIntrinsicElement(wrapper, `.${Menu.className}`);

describe('SplitButton', () => {
  isConformant(SplitButton, { autoControlledProps: ['open'] });

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

      getMenuItems(wrapper)
        .at(0)
        .simulate('click');
      expect(getMenuItems(wrapper)).toHaveLength(0);
    });

    test('is true when Alt+ArrowDown is sent to the main button', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" />);

      getMainButton(wrapper).simulate('keydown', { keyCode: keyboardKey.ArrowDown, altKey: true });

      expect(getMenuItems(wrapper)).toHaveLength(mockMenu.items.length);
    });

    test('is false when Alt+ArrowUp is sent to the menu', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.ArrowUp, altKey: true });

      expect(getMenuItems(wrapper)).toHaveLength(0);
      expect(document.activeElement).toBe(getMainButton(wrapper).getDOMNode());
    });

    test('is false when Escape is sent to the menu', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.Escape });

      expect(getMenuItems(wrapper)).toHaveLength(0);
      expect(document.activeElement).toBe(getMainButton(wrapper).getDOMNode());
    });

    test('is false when Tab is sent to the menu', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.Tab, shiftKey: false });

      expect(getMenuItems(wrapper)).toHaveLength(0);
    });

    test('is false when Enter is sent to the menu', () => {
      const wrapper = mountWithProvider(<SplitButton menu={mockMenu} button="test" defaultOpen />);

      getMenu(wrapper).simulate('keydown', { keyCode: keyboardKey.Enter });
      getMenuItems(wrapper)
        .at(0)
        .simulate('click');

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

    getMenuItems(wrapper)
      .at(0)
      .simulate('click');
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
