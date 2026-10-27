import { renderHook } from '@testing-library/react-hooks';
import { useMenuItemLinkStyles_unstable } from './useMenuItemLinkStyles.styles.css';

type State = Parameters<typeof useMenuItemLinkStyles_unstable>[0];

jest.mock('./MenuItemLink.module.css', () => ({
  resetLink: 'css-resetLink',
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
    disabled: false,
    submenuOpen: false,
    components: { root: 'div' },
    root: { className: 'caller-root' },
    icon: { className: 'caller-icon' },
    checkmark: { className: 'caller-checkmark' },
    content: { className: 'caller-content' },
    secondaryContent: { className: 'caller-secondaryContent' },
    ...overrides,
  } as State);

describe('useMenuItemLinkStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuItemLinkStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuItemLink');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.icon?.className).toContain('fui-MenuItemLink__icon');
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.checkmark?.className).toContain('fui-MenuItemLink__checkmark');
    expect(state.checkmark?.className?.endsWith('caller-checkmark')).toBe(true);
    expect(state.content?.className).toContain('fui-MenuItemLink__content');
    expect(state.content?.className?.endsWith('caller-content')).toBe(true);
    expect(state.secondaryContent?.className).toContain('fui-MenuItemLink__secondaryContent');
    expect(state.secondaryContent?.className?.endsWith('caller-secondaryContent')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({
      icon: undefined,
      checkmark: undefined,
      content: undefined,
      secondaryContent: undefined,
    });
    expect(() => renderHook(() => useMenuItemLinkStyles_unstable(state))).not.toThrow();
  });
});
