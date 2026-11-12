import type { RatingState } from './Rating.types';
import { ratingClassNames, useRatingStyles_unstable } from './useRatingStyles.styles.css';

jest.mock('./Rating.module.css', () => ({
  root: 'css-root',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
  } as RatingState);

describe('useRatingStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useRatingStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(ratingClassNames.root);
  });
});
