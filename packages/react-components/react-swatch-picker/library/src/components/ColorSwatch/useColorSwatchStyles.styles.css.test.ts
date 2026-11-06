import type { ColorSwatchState } from './ColorSwatch.types';
import { colorSwatchClassNames, useColorSwatchStyles_unstable } from './useColorSwatchStyles.styles.css';

jest.mock('./ColorSwatch.module.css', () => ({
  circular: 'css-circular',
  disabled: 'css-disabled',
  disabledIcon: 'css-disabledIcon',
  'extra-small': 'css-extra-small',
  icon: 'css-icon',
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
    components: { root: 'div', icon: 'div', disabledIcon: 'div' },
    size: 'medium',
    shape: 'rounded',
    disabled: false,
    selected: false,
    root: { className: 'caller-root' },
    icon: { className: 'caller-icon' },
    disabledIcon: { className: 'caller-disabledIcon' },
  } as ColorSwatchState);

describe('useColorSwatchStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useColorSwatchStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(colorSwatchClassNames.root);
  });
  it('guards absent optional slots', () => {
    const state = createState();
    state.icon = undefined;
    state.disabledIcon = undefined;
    useColorSwatchStyles_unstable(state);
    expect(state.icon).toBeUndefined();
    expect(state.disabledIcon).toBeUndefined();
  });
  it('places disabled state on its owner', () => {
    const state = createState();
    state.disabled = true;
    useColorSwatchStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
    expect(state.icon?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.disabledIcon?.className?.split(' ')).not.toContain('css-disabled');
  });
  it('places selected state on its owner', () => {
    const state = createState();
    state.selected = true;
    useColorSwatchStyles_unstable(state);
    expect(state.root.className).toContain('css-selected');
    expect(state.icon?.className?.split(' ')).not.toContain('css-selected');
    expect(state.disabledIcon?.className?.split(' ')).not.toContain('css-selected');
  });
  it('places shape state on its owner', () => {
    const state = createState();
    state.shape = 'square';
    useColorSwatchStyles_unstable(state);
    expect(state.root.className).toContain('css-square');
    expect(state.icon?.className?.split(' ')).not.toContain('css-square');
    expect(state.disabledIcon?.className?.split(' ')).not.toContain('css-square');
  });
});
