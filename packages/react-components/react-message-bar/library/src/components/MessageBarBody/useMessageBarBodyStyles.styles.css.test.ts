import { renderHook } from '@testing-library/react-hooks';
import type { MessageBarBodyState } from './MessageBarBody.types';
import { useMessageBarBodyStyles_unstable } from './useMessageBarBodyStyles.styles.css';

jest.mock('./MessageBarBody.module.css', () => ({
  root: 'css-message-bar-body-root',
}));

describe('useMessageBarBodyStyles_unstable (CSS Modules)', () => {
  it('applies the root class and preserves the caller class name', () => {
    const state: MessageBarBodyState = {
      components: { root: 'div' },
      root: { className: 'consumer-class' },
    };
    const { result } = renderHook(() => useMessageBarBodyStyles_unstable(state));

    expect(result.current.root.className).toBe('fui-MessageBarBody css-message-bar-body-root consumer-class');
    expect(result.current).toBe(state);
  });
});
