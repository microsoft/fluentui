import type { TagPickerListState } from './TagPickerList.types';
import { useTagPickerListStyles_unstable } from './useTagPickerListStyles.styles.css';

jest.mock('./TagPickerList.module.css', () => ({
  root: 'css-root',
  collapsed: 'css-collapsed',
}));

const createState = (overrides: Partial<TagPickerListState> = {}): TagPickerListState =>
  ({
    root: { className: 'caller-root' },
    open: true,
    ...overrides,
  } as unknown as TagPickerListState);

describe('useTagPickerListStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useTagPickerListStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-TagPickerList');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.root.className).toContain('css-root');
  });
  it.each([false, true])('maps open %s', open => {
    const state = createState({ open });
    useTagPickerListStyles_unstable(state);
    expect(state.root.className!.includes('css-collapsed')).toBe(!open);
  });
});
