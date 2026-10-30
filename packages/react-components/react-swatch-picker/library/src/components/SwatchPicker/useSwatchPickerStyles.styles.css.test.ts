import type { SwatchPickerState } from './SwatchPicker.types';
import { swatchPickerClassNames, useSwatchPickerStyles_unstable } from './useSwatchPickerStyles.styles.css';

jest.mock('./SwatchPicker.module.css', () => ({
  grid: 'css-grid',
  medium: 'css-medium',
  root: 'css-root',
  row: 'css-row',
  small: 'css-small',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    spacing: 'medium',
    isGrid: false,
    root: { className: 'caller-root' },
  } as SwatchPickerState);

describe('useSwatchPickerStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useSwatchPickerStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(swatchPickerClassNames.root);
  });
});
