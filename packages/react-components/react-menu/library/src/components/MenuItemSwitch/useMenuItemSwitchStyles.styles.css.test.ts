import { renderHook } from '@testing-library/react-hooks';
import { useMenuItemSwitchStyles_unstable } from './useMenuItemSwitchStyles.styles.css';

type State = Parameters<typeof useMenuItemSwitchStyles_unstable>[0];

jest.mock('./MenuItemSwitch.module.css', () => ({
  checked: 'css-checked',
  multiline: 'css-multiline',
  switchIndicator: 'css-switchIndicator',
}));

jest.mock('../../selectable/Checkmark.module.css', () => ({
  checked: 'css-checked',
  checkmark: 'css-checkmark',
}));

jest.mock('../MenuItem/MenuItem.module.css', () => ({
  checkmark: 'css-checkmark',
  content: 'css-content',
  disabled: 'css-disabled',
  icon: 'css-icon',
  multiline: 'css-multiline',
  root: 'css-root',
  secondaryContent: 'css-secondaryContent',
  subText: 'css-subText',
  submenuIndicator: 'css-submenuIndicator',
  submenuOpen: 'css-submenuOpen',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    checked: false,
    disabled: false,
    components: { root: 'div' },
    root: { className: 'caller-root' },
    icon: { className: 'caller-icon' },
    content: { className: 'caller-content' },
    secondaryContent: { className: 'caller-secondaryContent' },
    switchIndicator: { className: 'caller-switchIndicator' },
    subText: { className: 'caller-subText' },
    ...overrides,
  } as State);

describe('useMenuItemSwitchStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuItemSwitchStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuItemSwitch');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.icon?.className).toContain('fui-MenuItemSwitch__icon');
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.content?.className).toContain('fui-MenuItemSwitch__content');
    expect(state.content?.className?.endsWith('caller-content')).toBe(true);
    expect(state.secondaryContent?.className).toContain('fui-MenuItemSwitch__secondaryContent');
    expect(state.secondaryContent?.className?.endsWith('caller-secondaryContent')).toBe(true);
    expect(state.switchIndicator?.className).toContain('fui-MenuItemSwitch__switchIndicator');
    expect(state.switchIndicator?.className?.endsWith('caller-switchIndicator')).toBe(true);
    expect(state.subText?.className).toContain('fui-MenuItemSwitch__subText');
    expect(state.subText?.className?.endsWith('caller-subText')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({
      icon: undefined,
      content: undefined,
      secondaryContent: undefined,
      switchIndicator: undefined,
      subText: undefined,
    });
    expect(() => renderHook(() => useMenuItemSwitchStyles_unstable(state))).not.toThrow();
  });

  it.each([false, true])('owns checked=%s on the item, not the switch slot', checked => {
    const state = createState({ checked });
    renderHook(() => useMenuItemSwitchStyles_unstable(state));
    expect(state.root.className?.includes('css-checked')).toBe(checked);
    expect(state.switchIndicator?.className).not.toContain('css-checked');
  });
});
