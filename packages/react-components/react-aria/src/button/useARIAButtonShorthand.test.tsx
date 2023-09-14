import { useARIAButtonShorthand } from './useARIAButtonShorthand';
import { renderHook } from '@testing-library/react-hooks';

describe('useARIAButtonShorthands', () => {
  it('should return shorthands', () => {
    const {
      result: { current: buttonShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'button' }, { required: true }));
    expect(buttonShorthand.as).toBe('button');
    const {
      result: { current: buttonShorthand2 },
    } = renderHook(() => useARIAButtonShorthand({ as: undefined }, { required: true }));
    expect(buttonShorthand2.as).toBe(undefined);
    const {
      result: { current: anchorShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'a' }, { required: true }));
    expect(anchorShorthand.as).toBe('a');
    const {
      result: { current: divShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'div' }, { required: true }));
    expect(divShorthand.as).toBe('div');
  });
});
