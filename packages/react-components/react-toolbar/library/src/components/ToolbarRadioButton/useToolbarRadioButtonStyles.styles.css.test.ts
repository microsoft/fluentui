import { useToolbarRadioButtonStyles_unstable } from './useToolbarRadioButtonStyles.styles.css';
import type { ToolbarRadioButtonState } from './ToolbarRadioButton.types';

jest.mock('./ToolbarRadioButton.module.css', () => ({ checked: 'checked', checkedIcon: 'checked-icon' }));
jest.mock('@fluentui/react-button', () => ({
  ['useToggleButtonStyles_unstable']: (state: { root: { className?: string }; icon?: { className?: string } }) => {
    state.root.className = `toggle-root ${state.root.className ?? ''}`;
    if (state.icon) {
      state.icon.className = `toggle-icon ${state.icon.className ?? ''}`;
    }
    return state;
  },
}));

describe('useToolbarRadioButtonStyles_unstable (CSS Modules)', () => {
  it('applies checked classes to the root and icon, preserving caller classes last', () => {
    const state = {
      checked: true,
      root: { className: 'caller-root' },
      icon: { className: 'caller-icon' },
    } as ToolbarRadioButtonState;
    useToolbarRadioButtonStyles_unstable(state);
    expect(state.root.className).toBe('checked toggle-root caller-root');
    expect(state.icon?.className).toBe('checked-icon toggle-icon caller-icon');
  });

  it('does not apply checked styles by default', () => {
    const state = { checked: false, root: {} } as ToolbarRadioButtonState;
    useToolbarRadioButtonStyles_unstable(state);
    expect(state.root.className).toBe('toggle-root ');
    expect(state.icon).toBeUndefined();
  });
});
