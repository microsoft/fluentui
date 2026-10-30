import type { EmptySwatchState } from './EmptySwatch.types';
import { emptySwatchClassNames, useEmptySwatchStyles_unstable } from './useEmptySwatchStyles.styles.css';

jest.mock('./EmptySwatch.module.css', () => ({
  circular: 'css-circular',
  'extra-small': 'css-extra-small',
  large: 'css-large',
  medium: 'css-medium',
  root: 'css-root',
  rounded: 'css-rounded',
  small: 'css-small',
  square: 'css-square',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    size: 'medium',
    shape: 'rounded',
    root: { className: 'caller-root' },
  } as EmptySwatchState);

describe('useEmptySwatchStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useEmptySwatchStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(emptySwatchClassNames.root);
  });
  it('places shape state on its owner', () => {
    const state = createState();
    state.shape = 'square';
    useEmptySwatchStyles_unstable(state);
    expect(state.root.className).toContain('css-square');
  });
});
