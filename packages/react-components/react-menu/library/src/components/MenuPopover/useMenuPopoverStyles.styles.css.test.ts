import { renderHook } from '@testing-library/react-hooks';
import { useMenuPopoverStyles_unstable } from './useMenuPopoverStyles.styles.css';

type State = Parameters<typeof useMenuPopoverStyles_unstable>[0];

jest.mock('./MenuPopover.module.css', () => ({
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuPopoverStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuPopoverStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuPopover');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
