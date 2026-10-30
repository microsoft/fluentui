import type { SwatchPickerRowState } from './SwatchPickerRow.types';
import { swatchPickerRowClassNames, useSwatchPickerRowStyles_unstable } from './useSwatchPickerRowStyles.styles.css';

jest.mock('./SwatchPickerRow.module.css', () => ({
  medium: 'css-medium',
  root: 'css-root',
  small: 'css-small',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    spacing: 'medium',
    root: { className: 'caller-root' },
  } as SwatchPickerRowState);

describe('useSwatchPickerRowStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useSwatchPickerRowStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(swatchPickerRowClassNames.root);
  });
});
