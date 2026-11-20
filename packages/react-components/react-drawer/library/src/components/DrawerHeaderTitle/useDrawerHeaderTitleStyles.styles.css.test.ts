import { useDrawerHeaderTitleStyles_unstable } from './useDrawerHeaderTitleStyles.styles.css';
import type { DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

jest.mock('./DrawerHeaderTitle.module.css', () => ({ root: 'css-root', action: 'css-action' }));
jest.mock('@fluentui/react-dialog', () => ({
  ['useDialogTitleStyles_unstable']: (state: { root: { className?: string }; action?: { className?: string } }) => {
    state.root.className = `dialog-title ${state.root.className ?? ''}`;
    if (state.action) {
      state.action.className = `dialog-action ${state.action.className ?? ''}`;
    }
    return state;
  },
}));

describe('useDrawerHeaderTitleStyles_unstable (CSS Modules)', () => {
  it('composes the public DialogTitle hook and preserves caller classes last', () => {
    const state = {
      components: { heading: 'h2', action: 'div' },
      root: { className: 'root-caller' },
      heading: { className: 'heading-caller' },
      action: { className: 'action-caller' },
    } as DrawerHeaderTitleState;

    useDrawerHeaderTitleStyles_unstable(state);

    expect(state.root.className).toBe('fui-DrawerHeaderTitle css-root root-caller');
    expect(state.heading?.className).toBe('fui-DrawerHeaderTitle__heading dialog-title heading-caller');
    expect(state.action?.className).toBe('fui-DrawerHeaderTitle__action css-action dialog-action action-caller');
  });

  it('accepts absent optional slots', () => {
    const state = { components: { heading: 'h2', action: 'div' }, root: {} } as DrawerHeaderTitleState;
    expect(useDrawerHeaderTitleStyles_unstable(state)).toBe(state);
    expect(state.heading).toBeUndefined();
    expect(state.action).toBeUndefined();
  });
});
