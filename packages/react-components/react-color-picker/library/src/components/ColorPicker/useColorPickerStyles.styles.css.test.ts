import type { ColorPickerState } from './ColorPicker.types';
import { colorPickerClassNames, useColorPickerStyles_unstable } from './useColorPickerStyles.styles.css';

jest.mock('./ColorPicker.module.css', () => ({
  root: 'css-root',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
  } as ColorPickerState);

describe('useColorPickerStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useColorPickerStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(colorPickerClassNames.root);
  });
});
