import { slot } from '@fluentui/react-utilities';
import type { ToastBodyState } from './ToastBody.types';
import { toastBodyClassNames, useToastBodyStyles_unstable } from './useToastBodyStyles.styles.css';

jest.mock('./ToastBody.module.css', () => ({
  root: 'css-root',
  subtitle: 'css-subtitle',
  inverted: 'css-inverted',
}));

const createState = (): ToastBodyState => ({
  components: { root: 'div', subtitle: 'div' },
  root: slot.always({ className: 'caller-root' }, { elementType: 'div' }),
  backgroundAppearance: undefined,
});

describe('useToastBodyStyles_unstable (CSS Modules)', () => {
  it('preserves the default styling and caller class last', () => {
    const state = createState();
    expect(useToastBodyStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${toastBodyClassNames.root} css-root caller-root`);
    expect(state.subtitle).toBeUndefined();
  });

  it('applies inverted appearance to each rendered sibling slot', () => {
    const state = createState();
    state.backgroundAppearance = 'inverted';
    state.subtitle = slot.optional({ className: 'caller-subtitle' }, { elementType: 'div' });
    useToastBodyStyles_unstable(state);
    expect(state.root.className).toBe(`${toastBodyClassNames.root} css-root css-inverted caller-root`);
    expect(state.subtitle?.className).toBe(`${toastBodyClassNames.subtitle} css-subtitle css-inverted caller-subtitle`);
  });

  it('styles a standard subtitle without an appearance class', () => {
    const state = createState();
    state.subtitle = slot.optional({ className: 'caller-subtitle' }, { elementType: 'div' });
    useToastBodyStyles_unstable(state);
    expect(state.subtitle?.className).toBe(`${toastBodyClassNames.subtitle} css-subtitle caller-subtitle`);
  });
});
