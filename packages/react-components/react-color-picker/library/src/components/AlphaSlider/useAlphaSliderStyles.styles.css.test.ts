import type { AlphaSliderState } from './AlphaSlider.types';
import { alphaSliderClassNames, useAlphaSliderStyles_unstable } from './useAlphaSliderStyles.styles.css';

jest.mock('./AlphaSlider.module.css', () => ({
  azureedge: 'css-azureedge',
  horizontal: 'css-horizontal',
  net: 'css-net',
  png: 'css-png',
  rail: 'css-rail',
  thumb: 'css-thumb',
  vertical: 'css-vertical',
}));

const createState = () =>
  ({
    components: { root: 'div', rail: 'div', thumb: 'div', input: 'input' },
    vertical: false,
    root: { className: 'caller-root' },
    rail: { className: 'caller-rail' },
    thumb: { className: 'caller-thumb' },
    input: { className: 'caller-input' },
  } as AlphaSliderState);

describe('useAlphaSliderStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useAlphaSliderStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(alphaSliderClassNames.root);
    expect(state.rail?.className?.split(' ').slice(-1)[0]).toBe('caller-rail');
    expect(state.rail?.className).toContain(alphaSliderClassNames.rail);
    expect(state.thumb?.className?.split(' ').slice(-1)[0]).toBe('caller-thumb');
    expect(state.thumb?.className).toContain(alphaSliderClassNames.thumb);
    expect(state.input?.className?.split(' ').slice(-1)[0]).toBe('caller-input');
    expect(state.input?.className).toContain(alphaSliderClassNames.input);
  });
  it('places vertical state on its owner', () => {
    const state = createState();
    state.vertical = true;
    useAlphaSliderStyles_unstable(state);
    expect(state.root.className).toContain('css-vertical');
    expect(state.rail?.className?.split(' ')).not.toContain('css-vertical');
    expect(state.thumb?.className?.split(' ')).not.toContain('css-vertical');
    expect(state.input?.className?.split(' ')).not.toContain('css-vertical');
  });
});

jest.mock('../ColorSlider/ColorSlider.module.css', () => ({
  'fui-ColorSlider__thumb': 'base-fui-ColorSlider__thumb',
  horizontal: 'base-horizontal',
  hue: 'base-hue',
  input: 'base-input',
  rail: 'base-rail',
  root: 'base-root',
  rounded: 'base-rounded',
  saturation: 'base-saturation',
  square: 'base-square',
  thumb: 'base-thumb',
  value: 'base-value',
  vertical: 'base-vertical',
}));
