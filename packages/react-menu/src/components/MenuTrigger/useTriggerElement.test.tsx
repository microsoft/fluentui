import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';
import { keyboardKey } from '@fluentui/keyboard-key';
import { useTriggerElement } from './useTriggerElement';
import { MenuContextValue, useMenuContext } from '../../contexts/menuContext';
import { MenuItem } from '../MenuItem/index';

jest.mock('../../contexts/menuContext');

describe('useTriggerElement', () => {
  const mockUseMenuContext = (options: Partial<MenuContextValue> = {}) => {
    const contextValue: Partial<MenuContextValue> = {
      triggerRef: React.createRef() as React.MutableRefObject<HTMLElement>,
      menuPopoverRef: React.createRef() as React.MutableRefObject<HTMLElement>,
      setOpen: jest.fn(),
      ...options,
    };

    (useMenuContext as jest.Mock).mockImplementation(selector => selector(contextValue));
  };

  const testOriginalEventHandlerExists = (handlerName: string, triggerEvent: (el: HTMLElement) => void) => {
    // Arrange
    mockUseMenuContext();
    const spy = jest.fn();
    const props = { [handlerName]: spy };
    const triggerButton = <button {...props}>Trigger button</button>;
    const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

    // Act
    const { getByRole } = render(result.current.children);
    triggerEvent(getByRole('button'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  };

  beforeEach(() => {
    mockUseMenuContext();
  });

  describe('on click', () => {
    it('should use original click handler', () => testOriginalEventHandlerExists('onClick', fireEvent.click));

    it('should open menu', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.click(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.anything(), { open: true, keyboard: false });
    });

    it('should not open menu if child is disabled', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy });
      const triggerButton = <button disabled>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.click(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('on hover', () => {
    it('should use original on mouse enter handler', () =>
      testOriginalEventHandlerExists('onMouseEnter', fireEvent.mouseEnter));

    it('should use original on blur handler', () => testOriginalEventHandlerExists('onBlur', fireEvent.blur));

    it.each([
      ['click', true, fireEvent.click, {}],
      ['mouseleave', false, fireEvent.mouseLeave, {}],
    ])('should on %s event call setOpen with %s ', (_, expectedValue, triggerEvent, eventOptions?) => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnHover: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'), eventOptions);

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.anything(), { open: expectedValue, keyboard: false });
    });

    it('should only open the menu on first mousemove event', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnHover: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.mouseMove(getByRole('button'));
      fireEvent.mouseMove(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.anything(), { open: true, keyboard: false });
    });

    it('should open the menu on with mouseenter after mouseover', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnHover: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.mouseMove(getByRole('button'));
      fireEvent.mouseEnter(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, expect.anything(), { open: true, keyboard: false });
      expect(spy).toHaveBeenNthCalledWith(2, expect.anything(), { open: true, keyboard: false });
    });

    it('should not open the menu on with mouseenter before mouseover', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnHover: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.mouseEnter(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it.each([
      ['click', fireEvent.click],
      ['mouseenter', fireEvent.mouseEnter],
    ])('should not call setOpen on %s when element is disabled', (_, triggerEvent) => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnHover: true });
      const triggerButton = <button disabled>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('on context', () => {
    it('should use original on context menu handler', () =>
      testOriginalEventHandlerExists('onContextMenu', fireEvent.contextMenu));

    it.each([
      ['click', fireEvent.click],
      ['mouseenter', fireEvent.mouseEnter],
      ['mouseleave', fireEvent.mouseLeave],
    ])('should not call setOpen on %s', (handler, triggerEvent) => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnContext: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'));

      // Assert
      expect(spy).not.toHaveBeenCalled();
    });

    it('should open menu', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnContext: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.contextMenu(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expect.anything(), { open: true, keyboard: false });
    });

    it('should not open menu if child is disabled', () => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, openOnContext: true });
      const triggerButton = <button disabled>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      fireEvent.contextMenu(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  it('should pass user id prop', () => {
    // Arrange
    mockUseMenuContext();
    const id = 'test';
    const props = { id };
    const triggerButton = <button {...props}>Trigger button</button>;
    const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

    // Act
    const { getByRole } = render(result.current.children);

    // Assert
    expect(getByRole('button').getAttribute('id')).toEqual(id);
  });

  it('should open menu on right arrow for submenu trigger', () => {
    // Arrange
    const spy = jest.fn();
    mockUseMenuContext({ setOpen: spy, isSubmenu: true });
    const menuitem = <MenuItem>Trigger button</MenuItem>;
    const { result } = renderHook(() => useTriggerElement({ children: menuitem }));

    // Act
    const { getByRole } = render(result.current.children);
    fireEvent.keyDown(getByRole('menuitem'), { keyCode: keyboardKey.ArrowRight });

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), { open: true, keyboard: true });
  });

  it('should open menu on down arrow for root trigger', () => {
    // Arrange
    const spy = jest.fn();
    mockUseMenuContext({ setOpen: spy, isSubmenu: false });
    const trigger = <button>Trigger button</button>;
    const { result } = renderHook(() => useTriggerElement({ children: trigger }));

    // Act
    const { getByRole } = render(result.current.children);
    fireEvent.keyDown(getByRole('button'), { keyCode: keyboardKey.ArrowDown });

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), { open: true, keyboard: true });
  });
});
