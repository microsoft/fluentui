import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';
import { useTriggerElement } from './useTriggerElement';
import { MenuContextValue, useMenuContext } from '../../menuContext';

jest.mock('../../menuContext');

describe('useTriggerElement', () => {
  const mockUseMenuContext = (options: Partial<MenuContextValue> = {}) => {
    const contextValue: Partial<MenuContextValue> = {
      on: [],
      triggerRef: React.createRef() as React.MutableRefObject<HTMLElement>,
      menuPopupRef: React.createRef() as React.MutableRefObject<HTMLElement>,
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
  });

  describe('on hover', () => {
    it('should use original mouse enter handler', () =>
      testOriginalEventHandlerExists('onMouseEnter', fireEvent.mouseEnter));

    it('should use original mouse leave handler', () =>
      testOriginalEventHandlerExists('onMouseLeave', fireEvent.mouseLeave));
  });

  describe('on focus', () => {
    it('should use original focus handler', () => testOriginalEventHandlerExists('onFocus', fireEvent.focus));
  });

  describe('on context', () => {
    it('should use original on context menu handler', () =>
      testOriginalEventHandlerExists('onContextMenu', fireEvent.contextMenu));
  });
});
