import type { ImageSwatchState } from './ImageSwatch.types';
import { imageSwatchClassNames, useImageSwatchStyles_unstable } from './useImageSwatchStyles.styles.css';

jest.mock('./ImageSwatch.module.css', () => ({
  circular: 'css-circular',
  'extra-small': 'css-extra-small',
  large: 'css-large',
  medium: 'css-medium',
  root: 'css-root',
  rounded: 'css-rounded',
  selected: 'css-selected',
  small: 'css-small',
  square: 'css-square',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    size: 'medium',
    shape: 'rounded',
    selected: false,
    root: { className: 'caller-root' },
  } as ImageSwatchState);

describe('useImageSwatchStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useImageSwatchStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(imageSwatchClassNames.root);
  });
  it('places selected state on its owner', () => {
    const state = createState();
    state.selected = true;
    useImageSwatchStyles_unstable(state);
    expect(state.root.className).toContain('css-selected');
  });
  it('places shape state on its owner', () => {
    const state = createState();
    state.shape = 'square';
    useImageSwatchStyles_unstable(state);
    expect(state.root.className).toContain('css-square');
  });
});
