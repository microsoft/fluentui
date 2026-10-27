import { renderHook } from '@testing-library/react-hooks';
import { useMenuItemStyles_unstable } from './useMenuItemStyles.styles.css';

type State = Parameters<typeof useMenuItemStyles_unstable>[0];

jest.mock('./MenuItem.module.css', () => ({
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

jest.mock('../../selectable/Checkmark.module.css', () => ({
  checked: 'css-checked',
  checkmark: 'css-checkmark',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    disabled: false,
    submenuOpen: false,
    checked: false,
    hasSubmenu: false,
    persistOnClick: false,
    components: { root: 'div' },
    root: { className: 'caller-root' },
    icon: { className: 'caller-icon' },
    checkmark: { className: 'caller-checkmark' },
    submenuIndicator: { className: 'caller-submenuIndicator' },
    content: { className: 'caller-content' },
    secondaryContent: { className: 'caller-secondaryContent' },
    subText: { className: 'caller-subText' },
    ...overrides,
  } as State);

describe('useMenuItemStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuItemStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuItem');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.icon?.className).toContain('fui-MenuItem__icon');
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.checkmark?.className).toContain('fui-MenuItem__checkmark');
    expect(state.checkmark?.className?.endsWith('caller-checkmark')).toBe(true);
    expect(state.submenuIndicator?.className).toContain('fui-MenuItem__submenuIndicator');
    expect(state.submenuIndicator?.className?.endsWith('caller-submenuIndicator')).toBe(true);
    expect(state.content?.className).toContain('fui-MenuItem__content');
    expect(state.content?.className?.endsWith('caller-content')).toBe(true);
    expect(state.secondaryContent?.className).toContain('fui-MenuItem__secondaryContent');
    expect(state.secondaryContent?.className?.endsWith('caller-secondaryContent')).toBe(true);
    expect(state.subText?.className).toContain('fui-MenuItem__subText');
    expect(state.subText?.className?.endsWith('caller-subText')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({
      icon: undefined,
      checkmark: undefined,
      submenuIndicator: undefined,
      content: undefined,
      secondaryContent: undefined,
      subText: undefined,
    });
    expect(() => renderHook(() => useMenuItemStyles_unstable(state))).not.toThrow();
  });

  it.each([false, true])('maps disabled=%s through the base CSS hook', disabled => {
    const state = createState({ disabled });
    renderHook(() => useMenuItemStyles_unstable(state));
    expect(state.root.className?.includes('css-disabled')).toBe(disabled);
    expect(state.secondaryContent?.className).not.toContain('css-disabled');
    expect(state.subText?.className).not.toContain('css-disabled');
  });
  it.each([false, true])('owns submenuOpen=%s on the item root', submenuOpen => {
    const state = createState({ submenuOpen });
    renderHook(() => useMenuItemStyles_unstable(state));
    expect(state.root.className?.includes('css-submenuOpen')).toBe(submenuOpen);
    expect(state.icon?.className).not.toContain('css-submenuOpen');
  });

  it('owns multiline layout on the item root', () => {
    const state = createState();
    renderHook(() => useMenuItemStyles_unstable(state));
    expect(state.root.className).toContain('css-multiline');
    expect(state.content?.className).not.toContain('css-multiline');
    expect(state.secondaryContent?.className).not.toContain('css-multiline');
  });
});
