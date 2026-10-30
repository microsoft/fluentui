import { slot } from '@fluentui/react-utilities';
import type { ToastFooterState } from './ToastFooter.types';
import { toastFooterClassNames, useToastFooterStyles_unstable } from './useToastFooterStyles.styles.css';

jest.mock('./ToastFooter.module.css', () => ({
  root: 'css-root',
}));

const createState = (): ToastFooterState => ({
  components: { root: 'div' },
  root: slot.always({ className: 'caller-root' }, { elementType: 'div' }),
});

describe('useToastFooterStyles_unstable (CSS Modules)', () => {
  it('preserves the default styling and caller class last', () => {
    const state = createState();
    expect(useToastFooterStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${toastFooterClassNames.root} css-root caller-root`);
  });
});
