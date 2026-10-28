import { useBreadcrumbButtonStyles_unstable } from './useBreadcrumbButtonStyles.styles.css';
import type { BreadcrumbButtonState } from './BreadcrumbButton.types';

jest.mock('./BreadcrumbButton.module.css', () => ({
  root: 'css-root',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  current: 'css-current',
  icon: 'css-icon',
}));
jest.mock('@fluentui/react-button', () => ({
  ['useButtonStyles_unstable']: (state: { root: { className?: string }; icon?: { className?: string } }) => {
    state.root.className = `button-root ${state.root.className ?? ''}`;
    if (state.icon) {
      state.icon.className = `button-icon ${state.icon.className ?? ''}`;
    }
    return state;
  },
}));

describe('useBreadcrumbButtonStyles_unstable (CSS Modules)', () => {
  it('maps current and size to the root, and size to the icon', () => {
    const state = {
      size: 'large',
      current: true,
      root: { className: 'caller-root' },
      icon: { className: 'caller-icon' },
    } as BreadcrumbButtonState;
    useBreadcrumbButtonStyles_unstable(state);
    expect(state.root.className).toBe('fui-BreadcrumbButton css-large css-root css-current button-root caller-root');
    expect(state.icon?.className).toBe('fui-BreadcrumbButton__icon css-icon css-large button-icon caller-icon');
  });

  it('uses the medium default and supports an absent icon', () => {
    const state = { size: 'medium', current: false, root: {} } as BreadcrumbButtonState;
    useBreadcrumbButtonStyles_unstable(state);
    expect(state.root.className).toBe('fui-BreadcrumbButton css-medium css-root button-root ');
    expect(state.icon).toBeUndefined();
  });
});
