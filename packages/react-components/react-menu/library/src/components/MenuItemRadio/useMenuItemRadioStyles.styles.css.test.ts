import { renderHook } from '@testing-library/react-hooks';
import { useMenuItemRadioStyles_unstable } from './useMenuItemRadioStyles.styles.css';

type State = Parameters<typeof useMenuItemRadioStyles_unstable>[0];

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
    submenuOpen: false,
    components: { root: 'div' },
    root: { className: 'caller-root' },
    icon: { className: 'caller-icon' },
    checkmark: { className: 'caller-checkmark' },
    content: { className: 'caller-content' },
    secondaryContent: { className: 'caller-secondaryContent' },
    subText: { className: 'caller-subText' },
    ...overrides,
  } as State);

describe('useMenuItemRadioStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuItemRadioStyles_unstable(state));
    expect(result.current).toBeUndefined();
    expect(state.root?.className).toContain('fui-MenuItemRadio');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.icon?.className).toContain('fui-MenuItemRadio__icon');
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.checkmark?.className).toContain('fui-MenuItemRadio__checkmark');
    expect(state.checkmark?.className?.endsWith('caller-checkmark')).toBe(true);
    expect(state.content?.className).toContain('fui-MenuItemRadio__content');
    expect(state.content?.className?.endsWith('caller-content')).toBe(true);
    expect(state.secondaryContent?.className).toContain('fui-MenuItemRadio__secondaryContent');
    expect(state.secondaryContent?.className?.endsWith('caller-secondaryContent')).toBe(true);
    expect(state.subText?.className).toContain('fui-MenuItemRadio__subText');
    expect(state.subText?.className?.endsWith('caller-subText')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({
      icon: undefined,
      checkmark: undefined,
      content: undefined,
      secondaryContent: undefined,
      subText: undefined,
    });
    expect(() => renderHook(() => useMenuItemRadioStyles_unstable(state))).not.toThrow();
  });

  it.each([false, true])('maps disabled=%s through the base CSS hook', disabled => {
    const state = createState({ disabled });
    renderHook(() => useMenuItemRadioStyles_unstable(state));
    expect(state.root.className?.includes('css-disabled')).toBe(disabled);
    expect(state.secondaryContent?.className).not.toContain('css-disabled');
    expect(state.subText?.className).not.toContain('css-disabled');
  });
  it.each([false, true])('maps checked=%s through the selectable helper', checked => {
    const state = createState({ checked } as Partial<State>);
    renderHook(() => useMenuItemRadioStyles_unstable(state));
    expect(state.checkmark?.className?.includes('css-checked')).toBe(checked);
  });
});
