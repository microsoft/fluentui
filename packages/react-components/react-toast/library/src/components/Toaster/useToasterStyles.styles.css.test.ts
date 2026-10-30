import { slot } from '@fluentui/react-utilities';
import type { ToasterState } from './Toaster.types';
import { toasterClassNames, useToasterStyles_unstable } from './useToasterStyles.styles.css';

jest.mock('./Toaster.module.css', () => ({ root: 'css-root', inline: 'css-inline' }));

const createState = (): ToasterState => ({
  components: {
    root: 'div',
    bottomStart: 'div',
    bottomEnd: 'div',
    topStart: 'div',
    topEnd: 'div',
    top: 'div',
    bottom: 'div',
  },
  root: slot.always({ className: 'caller-root' }, { elementType: 'div' }),
  announceRef: { current: null },
  announce: jest.fn(),
  inline: false,
  renderAriaLive: true,
  dir: 'ltr',
  offset: undefined,
});

describe('useToasterStyles_unstable (CSS Modules)', () => {
  it('does not materialize absent position slots or style the virtual root', () => {
    const state = createState();
    expect(useToasterStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe('caller-root');
    expect(state.top).toBeUndefined();
    expect(state.bottomStart).toBeUndefined();
  });

  it.each(['ltr', 'rtl'] as const)('preserves all position styles in %s', dir => {
    const state = createState();
    state.dir = dir;
    const positions = ['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'top', 'bottom'] as const;
    for (const position of positions) {
      state[position] = slot.optional({ style: { zIndex: 5 } }, { elementType: 'div' });
    }
    useToasterStyles_unstable(state);
    for (const position of positions) {
      expect(state[position]?.className).toBe(`${toasterClassNames.root} css-root caller-root`);
      expect(state[position]?.style?.zIndex).toBe(5);
    }
    const start = dir === 'ltr' ? 'left' : 'right';
    const end = dir === 'ltr' ? 'right' : 'left';
    expect(state.topStart?.style).toEqual({ top: 16, [start]: 20, zIndex: 5 });
    expect(state.topEnd?.style).toEqual({ top: 16, [end]: 20, zIndex: 5 });
    expect(state.bottomStart?.style).toEqual({ bottom: 16, [start]: 20, zIndex: 5 });
    expect(state.bottomEnd?.style).toEqual({ bottom: 16, [end]: 20, zIndex: 5 });
    expect(state.top?.style).toEqual({ top: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)', zIndex: 5 });
    expect(state.bottom?.style).toEqual({
      bottom: 16,
      left: 'calc(50% + 0px)',
      transform: 'translateX(-50%)',
      zIndex: 5,
    });
  });

  it('supports inline positioning, custom offsets, and existing inline styles', () => {
    const state = createState();
    state.inline = true;
    state.offset = { horizontal: 30, vertical: 40 };
    state.topStart = slot.optional({ style: { zIndex: 3 } }, { elementType: 'div' });
    useToasterStyles_unstable(state);
    expect(state.topStart?.className).toBe(`${toasterClassNames.root} css-root css-inline caller-root`);
    expect(state.topStart?.style).toEqual({ top: 40, left: 30, zIndex: 3 });
  });

  it('initializes missing style objects and uses per-position offsets', () => {
    const state = createState();
    state.offset = { 'bottom-end': { horizontal: 8, vertical: 12 } };
    state.bottomEnd = slot.optional({ className: undefined }, { elementType: 'div' });
    useToasterStyles_unstable(state);
    expect(state.bottomEnd?.style).toEqual({ bottom: 12, right: 8 });
  });
});
