import { renderHook } from '@testing-library/react-hooks';
import { useOnScrollOutside } from './useOnScrollOutside';

describe('useOnScrollOutside', () => {
  const supportedEvents = [{ event: 'wheel' }, { event: 'touchmove' }, { event: 'scroll', capture: true }];

  it.each(supportedEvents)('should add %s listener', ({ event, capture }) => {
    // Arrange
    const element = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as Document;

    // Act
    renderHook(() => useOnScrollOutside({ element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(supportedEvents.length);
    expect(element.addEventListener).toHaveBeenCalledWith(
      ...(capture ? [event, expect.anything(), true] : [event, expect.anything()]),
    );
  });

  it.each(supportedEvents)('should cleanup %s listener', ({ event, capture }) => {
    // Arrange
    const element = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as Document;

    // Act
    const { unmount } = renderHook(() => useOnScrollOutside({ element, callback: jest.fn(), refs: [] }));
    unmount();

    // Assert
    expect(element.removeEventListener).toHaveBeenCalledTimes(supportedEvents.length);
    expect(element.removeEventListener).toHaveBeenCalledWith(
      ...(capture ? [event, expect.anything(), true] : [event, expect.anything()]),
    );
  });

  it('should not add or remove event listeners when disabled', () => {
    // Arrange
    const element = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as Document;

    // Act
    const { unmount } = renderHook(() =>
      useOnScrollOutside({ disabled: true, element, callback: jest.fn(), refs: [] }),
    );
    unmount();

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(0);
    expect(element.removeEventListener).toHaveBeenCalledTimes(0);
  });
});
