import type { BreadcrumbDividerState } from './BreadcrumbDivider.types';
import {
  breadcrumbDividerClassNames,
  useBreadcrumbDividerStyles_unstable,
} from './useBreadcrumbDividerStyles.styles.css';

jest.mock('./BreadcrumbDivider.module.css', () => ({
  large: 'css-large',
  medium: 'css-medium',
  root: 'css-root',
  small: 'css-small',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    size: 'medium',
    root: { className: 'caller-root' },
  } as BreadcrumbDividerState);

describe('useBreadcrumbDividerStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useBreadcrumbDividerStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(breadcrumbDividerClassNames.root);
  });
});
