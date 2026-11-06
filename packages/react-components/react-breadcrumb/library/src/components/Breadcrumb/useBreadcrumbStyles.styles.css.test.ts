import type { BreadcrumbState } from './Breadcrumb.types';
import { breadcrumbClassNames, useBreadcrumbStyles_unstable } from './useBreadcrumbStyles.styles.css';

jest.mock('./Breadcrumb.module.css', () => ({
  list: 'css-list',
}));

const createState = () =>
  ({
    components: { root: 'div', list: 'div' },
    root: { className: 'caller-root' },
    list: { className: 'caller-list' },
  } as BreadcrumbState);

describe('useBreadcrumbStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useBreadcrumbStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(breadcrumbClassNames.root);
    expect(state.list?.className?.split(' ').slice(-1)[0]).toBe('caller-list');
    expect(state.list?.className).toContain(breadcrumbClassNames.list);
  });
  it('guards absent optional slots', () => {
    const state = createState();
    state.list = undefined;
    useBreadcrumbStyles_unstable(state);
    expect(state.list).toBeUndefined();
  });
});
