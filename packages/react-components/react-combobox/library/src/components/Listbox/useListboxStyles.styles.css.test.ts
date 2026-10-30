import type { ListboxState } from './Listbox.types';
import { useListboxStyles_unstable } from './useListboxStyles.styles.css';

jest.mock('./Listbox.module.css', () => ({
  root: 'css-root',
}));

const createState = (overrides: Partial<ListboxState> = {}): ListboxState =>
  ({
    root: { className: 'caller-root' },
    ...overrides,
  } as unknown as ListboxState);

describe('useListboxStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useListboxStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-Listbox');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.root.className).toContain('css-root');
  });
});
