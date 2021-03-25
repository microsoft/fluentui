import * as React from 'react';
import { SpacebarKey, EnterKey } from '@fluentui/keyboard-key';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';
import { useOverrideNativeKeyboardClick } from './useOverrideNativeKeyboardClick';

describe('useOverrideNativeKeyboardClick', () => {
  it.each([
    ['button', EnterKey, true],
    ['button', SpacebarKey, true],
    ['a', EnterKey, false],
    ['a', SpacebarKey, true],
    ['textarea', SpacebarKey, false],
    ['textarea', EnterKey, false],
    ['input', SpacebarKey, false],
    ['input', EnterKey, false],
  ])('should handle native clicks with for <%s> with %s keycode', (Tag, keyCode, expected) => {
    // Arrange
    const { result } = renderHook(() => useOverrideNativeKeyboardClick());
    const onClick = jest.fn();
    const TestComponent = (
      <Tag
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick={onClick}
        onKeyDown={result.current.onOverrideClickKeyDown}
        onKeyUp={result.current.onOverrideClickKeyUp}
      />
    );
    const { container } = render(TestComponent);

    // Act
    const element = container.querySelector(Tag) as HTMLElement;
    fireEvent.keyDown(element, { keyCode });
    fireEvent.keyUp(element, { keyCode });

    // Assert
    expect(onClick).toHaveBeenCalledTimes(expected ? 1 : 0);
  });

  it('should invoke callbacks in correct order', () => {
    // Arrange
    const options = { beforeClick: jest.fn(), afterClick: jest.fn() };
    const { result } = renderHook(() => useOverrideNativeKeyboardClick(options));
    const TestComponent = (
      <button onKeyDown={result.current.onOverrideClickKeyDown} onKeyUp={result.current.onOverrideClickKeyUp} />
    );
    const { container } = render(TestComponent);

    // Act
    const element = container.querySelector('button') as HTMLElement;
    fireEvent.keyDown(element, { keyCode: EnterKey });
    fireEvent.keyUp(element, { keyCode: EnterKey });

    // Assert
    expect(options.beforeClick).toHaveBeenCalledTimes(1);
    expect(options.afterClick).toHaveBeenCalledTimes(1);
    const beforeClickOrder = options.beforeClick.mock.invocationCallOrder[0];
    const afterClickOrder = options.afterClick.mock.invocationCallOrder[0];
    expect(beforeClickOrder).toBeLessThan(afterClickOrder);
  });
});
