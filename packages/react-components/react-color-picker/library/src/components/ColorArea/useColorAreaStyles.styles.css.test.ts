import type { ColorAreaState } from './ColorArea.types';
import { colorAreaClassNames, useColorAreaStyles_unstable } from './useColorAreaStyles.styles.css';

jest.mock('./ColorArea.module.css', () => ({
  input: 'css-input',
  root: 'css-root',
  rounded: 'css-rounded',
  square: 'css-square',
  thumb: 'css-thumb',
}));

const createState = () =>
  ({
    components: { root: 'div', thumb: 'div', inputX: 'input', inputY: 'input' },
    shape: 'rounded',
    root: { className: 'caller-root' },
    thumb: { className: 'caller-thumb' },
    inputX: { className: 'caller-inputX' },
    inputY: { className: 'caller-inputY' },
  } as ColorAreaState);

describe('useColorAreaStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useColorAreaStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(colorAreaClassNames.root);
    expect(state.thumb?.className?.split(' ').slice(-1)[0]).toBe('caller-thumb');
    expect(state.thumb?.className).toContain(colorAreaClassNames.thumb);
    expect(state.inputX?.className?.split(' ').slice(-1)[0]).toBe('caller-inputX');
    expect(state.inputX?.className).toContain(colorAreaClassNames.inputX);
    expect(state.inputY?.className?.split(' ').slice(-1)[0]).toBe('caller-inputY');
    expect(state.inputY?.className).toContain(colorAreaClassNames.inputY);
  });
  it('places shape state on its owner', () => {
    const state = createState();
    state.shape = 'square';
    useColorAreaStyles_unstable(state);
    expect(state.root.className).toContain('css-square');
    expect(state.thumb?.className?.split(' ')).not.toContain('css-square');
    expect(state.inputX?.className?.split(' ')).not.toContain('css-square');
    expect(state.inputY?.className?.split(' ')).not.toContain('css-square');
  });
});
