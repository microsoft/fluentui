import type { BreadcrumbItemState } from './BreadcrumbItem.types';
import { breadcrumbItemClassNames, useBreadcrumbItemStyles_unstable } from './useBreadcrumbItemStyles.styles.css';

jest.mock('./BreadcrumbItem.module.css', () => ({
  root: 'css-root',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
  } as BreadcrumbItemState);

describe('useBreadcrumbItemStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useBreadcrumbItemStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(breadcrumbItemClassNames.root);
  });
});
