import type { ColorSliderState } from './ColorSlider.types';
import { colorSliderClassNames, useColorSliderStyles_unstable } from './useColorSliderStyles.styles.css';

jest.mock('./ColorSlider.module.css', () => ({
  'fui-ColorSlider__thumb': 'css-fui-ColorSlider__thumb',
  horizontal: 'css-horizontal',
  hue: 'css-hue',
  input: 'css-input',
  rail: 'css-rail',
  root: 'css-root',
  rounded: 'css-rounded',
  saturation: 'css-saturation',
  square: 'css-square',
  thumb: 'css-thumb',
  value: 'css-value',
  vertical: 'css-vertical',
}));

const createState = () =>
  ({
    components: { root: 'div', rail: 'div', thumb: 'div', input: 'input' },
    shape: 'rounded',
    vertical: false,
    channel: 'hue',
    root: { className: 'caller-root' },
    rail: { className: 'caller-rail' },
    thumb: { className: 'caller-thumb' },
    input: { className: 'caller-input' },
  } as ColorSliderState);

describe('useColorSliderStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useColorSliderStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(colorSliderClassNames.root);
    expect(state.rail?.className?.split(' ').slice(-1)[0]).toBe('caller-rail');
    expect(state.rail?.className).toContain(colorSliderClassNames.rail);
    expect(state.thumb?.className?.split(' ').slice(-1)[0]).toBe('caller-thumb');
    expect(state.thumb?.className).toContain(colorSliderClassNames.thumb);
    expect(state.input?.className?.split(' ').slice(-1)[0]).toBe('caller-input');
    expect(state.input?.className).toContain(colorSliderClassNames.input);
  });
  it('places vertical state on its owner', () => {
    const state = createState();
    state.vertical = true;
    useColorSliderStyles_unstable(state);
    expect(state.root.className).toContain('css-vertical');
    expect(state.rail?.className?.split(' ')).not.toContain('css-vertical');
    expect(state.thumb?.className?.split(' ')).not.toContain('css-vertical');
    expect(state.input?.className?.split(' ')).not.toContain('css-vertical');
  });
  it('places shape state on its owner', () => {
    const state = createState();
    state.shape = 'square';
    useColorSliderStyles_unstable(state);
    expect(state.root.className).toContain('css-square');
    expect(state.rail?.className?.split(' ')).not.toContain('css-square');
    expect(state.thumb?.className?.split(' ')).not.toContain('css-square');
    expect(state.input?.className?.split(' ')).not.toContain('css-square');
  });
});
