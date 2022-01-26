import { renderHook } from '@testing-library/react-hooks';
import { useOnClickOutside } from './useOnClickOutside';

describe('useOnClickOutside', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  const supportedEvents = ['click', 'touchstart', 'contextmenu', 'fuiframefocus'];

  it.each(supportedEvents)('should add %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    renderHook(() => useOnClickOutside({ element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(4);
    expect(element.addEventListener).toHaveBeenCalledWith(event, expect.anything(), true);
  });

  it.each(supportedEvents)('should cleanup %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    const { unmount } = renderHook(() => useOnClickOutside({ element, callback: jest.fn(), refs: [] }));
    unmount();

    // Assert
    expect(element.removeEventListener).toHaveBeenCalledTimes(4);
    expect(element.removeEventListener).toHaveBeenCalledWith(event, expect.anything(), true);
  });

  it('should not add event listeners when disabled', () => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    renderHook(() => useOnClickOutside({ disabled: true, element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(0);
  });

  it('should invoke callback when active element is an iframe', () => {
    // Arrange
    jest.useFakeTimers();
    const iframe = document.createElement('iframe');
    const callback = jest.fn();
    document.body.appendChild(iframe);
    renderHook(() => useOnClickOutside({ element: document, callback, refs: [] }));

    // Act
    iframe.focus();
    jest.runOnlyPendingTimers();

    // Assert
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
