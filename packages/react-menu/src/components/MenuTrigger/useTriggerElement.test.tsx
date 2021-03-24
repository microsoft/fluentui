import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';
import { useTriggerElement } from './useTriggerElement';
import { MenuContextValue, useMenuContext } from '../../contexts/menuContext';

jest.mock('../../contexts/menuContext');

describe('useTriggerElement', () => {
  const mockUseMenuContext = (options: Partial<MenuContextValue> = {}) => {
    const contextValue: Partial<MenuContextValue> = {
      triggerRef: React.createRef() as React.MutableRefObject<HTMLElement>,
      menuPopupRef: React.createRef() as React.MutableRefObject<HTMLElement>,
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

  describe('on click', () => {
    it('should use original click handler', () => testOriginalEventHandlerExists('onClick', fireEvent.click));

    it('should open menu on click', () => {
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
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('on hover', () => {
    it('should use original on mouse enter handler', () =>
      testOriginalEventHandlerExists('onMouseEnter', fireEvent.mouseEnter));

    it('should use original on blur handler', () => testOriginalEventHandlerExists('onBlur', fireEvent.blur));

    it.each([
      ['click', true, fireEvent.click],
      ['mouseenter', true, fireEvent.mouseEnter],
      ['blur', false, fireEvent.blur],
    ])('should on %s event call setOpen with %s when onHover is set', (_, expectedValue, triggerEvent) => {
      // Arrange
      const spy = jest.fn();
      mockUseMenuContext({ setOpen: spy, onHover: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'));

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(expectedValue);
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
      mockUseMenuContext({ setOpen: spy, onContext: true });
      const triggerButton = <button>Trigger button</button>;
      const { result } = renderHook(() => useTriggerElement({ children: triggerButton }));

      // Act
      const { getByRole } = render(result.current.children);
      triggerEvent(getByRole('button'));

      // Assert
      expect(spy).not.toHaveBeenCalled();
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
});
