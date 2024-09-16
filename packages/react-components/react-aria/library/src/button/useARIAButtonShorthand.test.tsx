import { useARIAButtonShorthand } from './useARIAButtonShorthand';
import { renderHook } from '@testing-library/react-hooks';

describe('useARIAButtonShorthands', () => {
  it('should return shorthands', () => {
    const {
      result: { current: buttonShorthand },
      // eslint-disable-next-line deprecation/deprecation
    } = renderHook(() => useARIAButtonShorthand({ as: 'button' }, { required: true }));
    expect(buttonShorthand.as).toBe('button');
    const {
      result: { current: buttonShorthand2 },
      // eslint-disable-next-line deprecation/deprecation
    } = renderHook(() => useARIAButtonShorthand({ as: undefined }, { required: true }));
    expect(buttonShorthand2.as).toBe(undefined);
    const {
      result: { current: anchorShorthand },
      // eslint-disable-next-line deprecation/deprecation
    } = renderHook(() => useARIAButtonShorthand({ as: 'a' }, { required: true }));
    expect(anchorShorthand.as).toBe('a');
    const {
      result: { current: divShorthand },
      // eslint-disable-next-line deprecation/deprecation
    } = renderHook(() => useARIAButtonShorthand({ as: 'div' }, { required: true }));
    expect(divShorthand.as).toBe('div');
  });
});
