import { useARIAButtonShorthand } from './useARIAButtonShorthand';
import { renderHook } from '@testing-library/react-hooks';

describe('useARIAButtonShorthands', () => {
  it('should return shorthands', () => {
    const {
      result: { current: buttonShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'button' }));
    expect(buttonShorthand.as).toBe('button');
    const {
      result: { current: buttonShorthand2 },
    } = renderHook(() => useARIAButtonShorthand({ as: undefined }));
    expect(buttonShorthand2.as).toBe(undefined);
    const {
      result: { current: anchorShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'a' }));
    expect(anchorShorthand.as).toBe('a');
    const {
      result: { current: divShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'div' }));
    expect(divShorthand.as).toBe('div');
  });
});
