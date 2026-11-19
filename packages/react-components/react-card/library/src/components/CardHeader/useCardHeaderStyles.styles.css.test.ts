import { renderHook } from '@testing-library/react-hooks';
import { useCardHeaderStyles_unstable } from './useCardHeaderStyles.styles.css';

type State = Parameters<typeof useCardHeaderStyles_unstable>[0];

jest.mock('./CardHeader.module.css', () => ({
  action: 'css-action',
  description: 'css-description',
  flex: 'css-flex',
  grid: 'css-grid',
  header: 'css-header',
  image: 'css-image',
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    image: { className: 'caller-image' },
    header: { className: 'caller-header' },
    description: { className: 'caller-description' },
    action: { className: 'caller-action' },
    ...overrides,
  } as State);

describe('useCardHeaderStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useCardHeaderStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-CardHeader');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.image?.className).toContain('fui-CardHeader__image');
    expect(state.image?.className?.endsWith('caller-image')).toBe(true);
    expect(state.header?.className).toContain('fui-CardHeader__header');
    expect(state.header?.className?.endsWith('caller-header')).toBe(true);
    expect(state.description?.className).toContain('fui-CardHeader__description');
    expect(state.description?.className?.endsWith('caller-description')).toBe(true);
    expect(state.action?.className).toContain('fui-CardHeader__action');
    expect(state.action?.className?.endsWith('caller-action')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({ image: undefined, header: undefined, description: undefined, action: undefined });
    expect(() => renderHook(() => useCardHeaderStyles_unstable(state))).not.toThrow();
  });

  it('chooses flex layout without a description', () => {
    const state = createState({ description: undefined });
    renderHook(() => useCardHeaderStyles_unstable(state));
    expect(state.root.className).toContain('css-flex');
    expect(state.root.className).not.toContain('css-grid');
    expect(state.header?.className).not.toContain('css-flex');
  });

  it('owns grid layout on the root when a description exists', () => {
    const state = createState();
    renderHook(() => useCardHeaderStyles_unstable(state));
    expect(state.root.className).toContain('css-grid');
    expect(state.header?.className).not.toContain('css-grid');
  });
});
