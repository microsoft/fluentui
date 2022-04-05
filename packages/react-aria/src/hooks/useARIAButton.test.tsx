import { useARIAButton } from './useARIAButton';
import { renderHook } from '@testing-library/react-hooks';
import type { ARIAButtonSlotProps } from './useARIAButton';

describe('useARIAButton', () => {
  it('should return by default shorthand props for a button', () => {
    const shorthand: ARIAButtonSlotProps = { as: 'button' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('button');
    expect(shorthand.disabled).toBeUndefined();
    expect(shorthand['aria-disabled']).toBeUndefined();
    expect(shorthand.role).toBeUndefined();
    expect(shorthand.onClick).toBeUndefined();
    expect(shorthand.tabIndex).toBeUndefined();
    expect(shorthand.onKeyDown).toBeUndefined();
    expect(shorthand.onKeyUp).toBeUndefined();
  });

  it('should return handlers for anchor when anchor element is declared', () => {
    const shorthand: ARIAButtonSlotProps = { as: 'a' };
    renderHook(() => useARIAButton(shorthand));
    expect(shorthand.as).toBe('a');
    expect(shorthand['aria-disabled']).toBeUndefined();
    expect(shorthand.role).toBe('button');
    expect(shorthand.onClick).toBeInstanceOf(Function);
    expect(shorthand.tabIndex).toBe(0);
    expect(shorthand.onKeyDown).toBeInstanceOf(Function);
    expect(shorthand.onKeyUp).toBeInstanceOf(Function);
  });
});
