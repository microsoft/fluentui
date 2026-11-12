import { slot } from '@fluentui/react-utilities';
import type { ToastState } from './Toast.types';
import { toastClassNames, useToastStyles_unstable } from './useToastStyles.styles.css';

jest.mock('./Toast.module.css', () => ({
  root: 'css-root',
  inverted: 'css-inverted',
}));

const createState = (): ToastState => ({
  components: { root: 'div' },
  root: slot.always({ className: 'caller-root' }, { elementType: 'div' }),
  backgroundAppearance: undefined,
});

describe('useToastStyles_unstable (CSS Modules)', () => {
  it('preserves the default styling and caller class last', () => {
    const state = createState();
    expect(useToastStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${toastClassNames.root} css-root caller-root`);
  });

  it('applies inverted appearance to each rendered sibling slot', () => {
    const state = createState();
    state.backgroundAppearance = 'inverted';
    useToastStyles_unstable(state);
    expect(state.root.className).toBe(`${toastClassNames.root} css-root css-inverted caller-root`);
  });
});
