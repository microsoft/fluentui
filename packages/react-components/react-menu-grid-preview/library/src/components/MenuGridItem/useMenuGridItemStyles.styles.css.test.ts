import { renderHook } from '@testing-library/react-hooks';
import { useMenuGridItemStyles_unstable } from './useMenuGridItemStyles.styles.css';

type State = Parameters<typeof useMenuGridItemStyles_unstable>[0];

jest.mock('./MenuGridItem.module.css', () => ({
  content: 'css-content',
  firstSubAction: 'css-firstSubAction',
  icon: 'css-icon',
  secondSubAction: 'css-secondSubAction',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    icon: { className: 'caller-icon' },
    content: { className: 'caller-content' },
    subText: { className: 'caller-subText' },
    firstSubAction: { className: 'caller-firstSubAction' },
    secondSubAction: { className: 'caller-secondSubAction' },
    ...overrides,
  } as State);

describe('useMenuGridItemStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuGridItemStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuGridItem');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.icon?.className).toContain('fui-MenuGridItem__icon');
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.content?.className).toContain('fui-MenuGridItem__content');
    expect(state.content?.className?.endsWith('caller-content')).toBe(true);
    expect(state.subText?.className).toContain('fui-MenuGridItem__subText');
    expect(state.subText?.className?.endsWith('caller-subText')).toBe(true);
    expect(state.firstSubAction?.className).toContain('fui-MenuGridItem__firstSubAction');
    expect(state.firstSubAction?.className?.endsWith('caller-firstSubAction')).toBe(true);
    expect(state.secondSubAction?.className).toContain('fui-MenuGridItem__secondSubAction');
    expect(state.secondSubAction?.className?.endsWith('caller-secondSubAction')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({
      icon: undefined,
      content: undefined,
      subText: undefined,
      firstSubAction: undefined,
      secondSubAction: undefined,
    });
    expect(() => renderHook(() => useMenuGridItemStyles_unstable(state))).not.toThrow();
  });
});
