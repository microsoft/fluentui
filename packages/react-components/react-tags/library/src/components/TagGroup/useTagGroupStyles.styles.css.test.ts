import type { TagGroupState } from './TagGroup.types';
import { tagGroupClassNames, useTagGroupStyles_unstable } from './useTagGroupStyles.styles.css';

jest.mock('./TagGroup.module.css', () => ({
  'extra-small': 'css-extra-small',
  medium: 'css-medium',
  root: 'css-root',
  small: 'css-small',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    size: 'medium',
    root: { className: 'caller-root' },
  } as TagGroupState);

describe('useTagGroupStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useTagGroupStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(tagGroupClassNames.root);
  });
  it('places size state on its owner', () => {
    const state = createState();
    state.size = 'small';
    useTagGroupStyles_unstable(state);
    expect(state.root.className).toContain('css-small');
  });
});
