import type { RatingDisplayState } from './RatingDisplay.types';
import { ratingDisplayClassNames, useRatingDisplayStyles_unstable } from './useRatingDisplayStyles.styles.css';

jest.mock('./RatingDisplay.module.css', () => ({
  divider: 'css-divider',
  'extra-large': 'css-extra-large',
  label: 'css-label',
  large: 'css-large',
  root: 'css-root',
  valueText: 'css-valueText',
}));

const createState = () =>
  ({
    components: { root: 'div', valueText: 'div', countText: 'div' },
    size: 'medium',
    root: { className: 'caller-root' },
    valueText: { className: 'caller-valueText' },
    countText: { className: 'caller-countText' },
  } as RatingDisplayState);

describe('useRatingDisplayStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useRatingDisplayStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(ratingDisplayClassNames.root);
    expect(state.valueText?.className?.split(' ').slice(-1)[0]).toBe('caller-valueText');
    expect(state.valueText?.className).toContain(ratingDisplayClassNames.valueText);
    expect(state.countText?.className?.split(' ').slice(-1)[0]).toBe('caller-countText');
    expect(state.countText?.className).toContain(ratingDisplayClassNames.countText);
  });
  it('guards absent optional slots', () => {
    const state = createState();
    state.valueText = undefined;
    state.countText = undefined;
    useRatingDisplayStyles_unstable(state);
    expect(state.valueText).toBeUndefined();
    expect(state.countText).toBeUndefined();
  });
});
