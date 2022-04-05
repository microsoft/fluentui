import { renderHook } from '@testing-library/react-hooks';
import { useOnScrollOutside } from './useOnScrollOutside';

describe('useOnScrollOutside', () => {
  const supportedEvents = ['wheel', 'touchmove'];

  it.each(supportedEvents)('should add %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    renderHook(() => useOnScrollOutside({ element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(2);
    expect(element.addEventListener).toHaveBeenCalledWith(event, expect.anything());
  });

  it.each(supportedEvents)('should cleanup %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    const { unmount } = renderHook(() => useOnScrollOutside({ element, callback: jest.fn(), refs: [] }));
    unmount();

    // Assert
    expect(element.removeEventListener).toHaveBeenCalledTimes(2);
    expect(element.removeEventListener).toHaveBeenCalledWith(event, expect.anything());
  });

  it('should not add event listeners when disabled', () => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    renderHook(() => useOnScrollOutside({ disabled: true, element, callback: jest.fn(), refs: [] }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(0);
  });
});
