import { useToolbarButtonStyles_unstable } from './useToolbarButtonStyles.styles.css';
import type { ToolbarButtonState } from './ToolbarButton.types';

jest.mock('./ToolbarButton.module.css', () => ({ vertical: 'vertical', verticalIcon: 'vertical-icon' }));
jest.mock('@fluentui/react-button', () => ({
  ['useButtonStyles_unstable']: (state: { root: { className?: string }; icon?: { className?: string } }) => {
    state.root.className = `button-root ${state.root.className ?? ''}`;
    if (state.icon) {
      state.icon.className = `button-icon ${state.icon.className ?? ''}`;
    }
    return state;
  },
}));

describe('useToolbarButtonStyles_unstable (CSS Modules)', () => {
  it('composes the public Button hook and preserves caller classes last', () => {
    const state = {
      vertical: true,
      root: { className: 'caller-root' },
      icon: { className: 'caller-icon' },
    } as ToolbarButtonState;

    useToolbarButtonStyles_unstable(state);

    expect(state.root.className).toBe('vertical button-root caller-root');
    expect(state.icon?.className).toBe('vertical-icon button-icon caller-icon');
  });

  it('does not style an absent icon or non-vertical root', () => {
    const state = { vertical: false, root: {} } as ToolbarButtonState;
    useToolbarButtonStyles_unstable(state);
    expect(state.root.className).toBe('button-root ');
    expect(state.icon).toBeUndefined();
  });
});
