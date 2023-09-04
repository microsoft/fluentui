import { renderHook } from '@testing-library/react-hooks';
import { useOnClickOutside } from './useOnClickOutside';

describe('useOnClickOutside', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  const supportedEvents = ['mouseup', 'touchstart', 'fuiframefocus'];
  const supportedEventsWhenDisabled = ['mousedown'];

  it.each(supportedEvents)('should add %s listener', event => {
    // Arrange
    const element = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as Document;

    // Act
    renderHook(() => useOnClickOutside({ element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(supportedEvents.length);
    expect(element.addEventListener).toHaveBeenCalledWith(event, expect.anything(), true);
  });

  it.each(supportedEvents)('should cleanup %s listener', event => {
    // Arrange
    const element = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as Document;

    // Act
    const { unmount } = renderHook(() => useOnClickOutside({ element, callback: jest.fn(), refs: [] }));
    unmount();

    // Assert
    expect(element.removeEventListener).toHaveBeenCalledTimes(supportedEvents.length);
    expect(element.removeEventListener).toHaveBeenCalledWith(event, expect.anything(), true);
  });

  it.each(supportedEventsWhenDisabled)('should add and cleanup %s listener when disabled', event => {
    // Arrange
    const element = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as Document;
    const refs = [
      { current: { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as HTMLElement },
      { current: { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as HTMLElement },
    ];

    // Act
    const { unmount } = renderHook(() => useOnClickOutside({ disabled: true, element, callback: jest.fn(), refs }));
    unmount();

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(0);
    refs.forEach(ref => {
      expect(ref.current.addEventListener).toHaveBeenCalledWith(event, expect.anything(), true);
      expect(ref.current.removeEventListener).toHaveBeenCalledWith(event, expect.anything(), true);
    });
  });

  it('should not add or remove event listeners when disabled', () => {
    // Arrange
    const element = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as Document;

    // Act
    renderHook(() => useOnClickOutside({ disabled: true, element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(0);
    expect(element.removeEventListener).toHaveBeenCalledTimes(0);
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

  it('should not invoke callback when active element is an iframe and focus events for iframes are disabled', () => {
    // Arrange
    jest.useFakeTimers();
    const iframe = document.createElement('iframe');
    const callback = jest.fn();
    document.body.appendChild(iframe);
    renderHook(() => useOnClickOutside({ element: document, disabledFocusOnIframe: true, callback, refs: [] }));

    // Act
    iframe.focus();
    jest.runOnlyPendingTimers();

    // Assert
    expect(callback).not.toBeCalled();
  });

  it('should invoke callback when active element is a webview', () => {
    // Arrange
    jest.useFakeTimers();
    const iframe = document.createElement('webview');
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
