import { renderHook } from '@testing-library/react-hooks';
import { useOnClickOutside } from './useOnClickOutside';

describe('useOnClickOutside', () => {
  const supportedEvents = ['click', 'touchstart'];

  it.each(supportedEvents)('should add %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    renderHook(() => useOnClickOutside({ element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(2);
    expect(element.addEventListener).toHaveBeenCalledWith(event, expect.anything(), true);
  });

  it.each(supportedEvents)('should cleanup %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    const { unmount } = renderHook(() => useOnClickOutside({ element, callback: jest.fn(), refs: [] }));
    unmount();

    // Assert
    expect(element.removeEventListener).toHaveBeenCalledTimes(2);
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
});
