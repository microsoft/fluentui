import { renderHook } from '@testing-library/react-hooks';
import type { AppItemStaticState } from './AppItemStatic.types';
import { useAppItemStaticStyles_unstable } from './useAppItemStaticStyles.styles.css';

jest.mock('./AppItemStatic.module.css', () => ({ root: 'css-AppItemStatic-root' }));
jest.mock('../sharedNavStyles.module.css', () => ({
  contentSelected: 'css-sharedNavStyles-contentSelected',
  icon: 'css-sharedNavStyles-icon',
  indicator: 'css-sharedNavStyles-indicator',
  root: 'css-sharedNavStyles-root',
  selected: 'css-sharedNavStyles-selected',
  small: 'css-sharedNavStyles-small',
}));
jest.mock('../AppItem/AppItem.module.css', () => ({
  absentIconRootAdjustment: 'css-AppItem-absentIconRootAdjustment',
  root: 'css-AppItem-root',
  small: 'css-AppItem-small',
}));

const createState = (): AppItemStaticState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'div', icon: 'span' },
    density: 'medium',
    icon: { className: 'caller-icon' },
  } as AppItemStaticState);

describe('useAppItemStaticStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { density: 'small' },
      expected: ['css-sharedNavStyles-root', 'css-AppItemStatic-root', 'css-AppItem-root', 'css-AppItem-small'],
    },
    {
      props: { density: 'medium' },
      expected: ['css-sharedNavStyles-root', 'css-AppItemStatic-root', 'css-AppItem-root'],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as AppItemStaticState;
    const { result } = renderHook(() => useAppItemStaticStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-AppItemStatic', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-AppItem-root',
      'css-AppItem-small',
      'css-AppItemStatic-root',
      'css-sharedNavStyles-root',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useAppItemStaticStyles_unstable(state));
    expect(state.icon?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-AppItemStatic__icon', 'css-sharedNavStyles-icon', 'caller-icon']),
    );
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.icon?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.icon = undefined;
    expect(() => renderHook(() => useAppItemStaticStyles_unstable(state))).not.toThrow();
  });
  it('adjusts the root when the icon is absent', () => {
    const state = createState();
    state.icon = undefined;
    renderHook(() => useAppItemStaticStyles_unstable(state));
    expect(state.root.className).toContain('css-AppItem-absentIconRootAdjustment');
  });
});
