import { renderHook } from '@testing-library/react-hooks';
import { useOnEventOutside } from './useOnEventOutside';

describe('useOnEventOutside', () => {
  const events: (keyof DocumentEventMap)[] = ['click', 'touchstart', 'touchmove', 'wheel'];

  it.each(events)('should add %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    renderHook(() => useOnEventOutside({ element, callback: jest.fn(), refs: [], event }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(1);
    expect(element.addEventListener).toHaveBeenCalledWith(event, expect.anything());
  });

  it.each(events)('should cleanup %s listener', event => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    const { unmount } = renderHook(() => useOnEventOutside({ element, callback: jest.fn(), refs: [], event }));
    unmount();

    // Assert
    expect(element.removeEventListener).toHaveBeenCalledTimes(1);
    expect(element.removeEventListener).toHaveBeenCalledWith(event, expect.anything());
  });

  it('should not add event listener when disabled', () => {
    // Arrange
    const element = ({ addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown) as Document;

    // Act
    renderHook(() => useOnEventOutside({ disabled: true, element, callback: jest.fn(), refs: [], event: 'click' }));

    // Assert
    expect(element.addEventListener).toHaveBeenCalledTimes(0);
  });
});
