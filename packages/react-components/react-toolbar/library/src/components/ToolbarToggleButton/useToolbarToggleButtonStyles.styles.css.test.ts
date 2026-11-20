import { useToolbarToggleButtonStyles_unstable } from './useToolbarToggleButtonStyles.styles.css';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

jest.mock('./ToolbarToggleButton.module.css', () => ({ checked: 'checked', checkedIcon: 'checked-icon' }));
jest.mock('@fluentui/react-button', () => ({
  ['useToggleButtonStyles_unstable']: (state: { root: { className?: string }; icon?: { className?: string } }) => {
    state.root.className = `toggle-root ${state.root.className ?? ''}`;
    if (state.icon) {
      state.icon.className = `toggle-icon ${state.icon.className ?? ''}`;
    }
    return state;
  },
}));

describe('useToolbarToggleButtonStyles_unstable (CSS Modules)', () => {
  it('applies checked classes to the root and icon, preserving caller classes last', () => {
    const state = {
      checked: true,
      root: { className: 'caller-root' },
      icon: { className: 'caller-icon' },
    } as ToolbarToggleButtonState;
    useToolbarToggleButtonStyles_unstable(state);
    expect(state.root.className).toBe('checked toggle-root caller-root');
    expect(state.icon?.className).toBe('checked-icon toggle-icon caller-icon');
  });

  it('does not apply checked styles by default', () => {
    const state = { checked: false, root: {} } as ToolbarToggleButtonState;
    useToolbarToggleButtonStyles_unstable(state);
    expect(state.root.className).toBe('toggle-root ');
    expect(state.icon).toBeUndefined();
  });
});
