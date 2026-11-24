import { renderHook } from '@testing-library/react-hooks';
import type { AppItemState } from './AppItem.types';
import { useAppItemStyles, useAppItemStyles_unstable } from './useAppItemStyles.styles.css';

jest.mock('./AppItem.module.css', () => ({
  absentIconRootAdjustment: 'css-AppItem-absentIconRootAdjustment',
  root: 'css-AppItem-root',
  small: 'css-AppItem-small',
}));
jest.mock('../sharedNavStyles.module.css', () => ({
  contentSelected: 'css-sharedNavStyles-contentSelected',
  icon: 'css-sharedNavStyles-icon',
  indicator: 'css-sharedNavStyles-indicator',
  root: 'css-sharedNavStyles-root',
  selected: 'css-sharedNavStyles-selected',
  small: 'css-sharedNavStyles-small',
}));

const createState = (): AppItemState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'a', icon: 'span' },
    density: 'medium',
    icon: { className: 'caller-icon' },
  } as AppItemState);

describe('useAppItemStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { density: 'small' }, expected: ['css-sharedNavStyles-root', 'css-AppItem-root', 'css-AppItem-small'] },
    { props: { density: 'medium' }, expected: ['css-sharedNavStyles-root', 'css-AppItem-root'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as AppItemState;
    const { result } = renderHook(() => useAppItemStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-AppItem', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-AppItem-root', 'css-AppItem-small', 'css-sharedNavStyles-root']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useAppItemStyles_unstable(state));
    expect(state.icon?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-AppItem__icon', 'css-sharedNavStyles-icon', 'caller-icon']),
    );
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.icon?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.icon = undefined;
    expect(() => renderHook(() => useAppItemStyles_unstable(state))).not.toThrow();
  });
  it('adjusts the root when the icon is absent', () => {
    const state = createState();
    state.icon = undefined;
    renderHook(() => useAppItemStyles_unstable(state));
    expect(state.root.className).toContain('css-AppItem-absentIconRootAdjustment');
  });
});

describe('useAppItemStyles helper', () => {
  it('preserves the independent class-map contract', () => {
    expect(renderHook(() => useAppItemStyles()).result.current).toEqual({
      root: 'css-AppItem-root',
      small: 'css-AppItem-small',
      absentIconRootAdjustment: 'css-AppItem-absentIconRootAdjustment',
    });
  });
});
