import type { ListState } from './List.types';
import { listClassNames, useListStyles_unstable } from './useListStyles.styles.css';

jest.mock('./List.module.css', () => ({
  root: 'css-root',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
  } as ListState);

describe('useListStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useListStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(listClassNames.root);
  });
});
