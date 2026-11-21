import { renderHook } from '@testing-library/react-hooks';
import type { TableCellLayoutState } from './TableCellLayout.types';
import { useTableCellLayoutStyles_unstable } from './useTableCellLayoutStyles.styles.css';

jest.mock('./TableCellLayout.module.css', () => ({
  content: 'css-TableCellLayout-content',
  description: 'css-TableCellLayout-description',
  'extra-small': 'css-TableCellLayout-extra-small',
  main: 'css-TableCellLayout-main',
  media: 'css-TableCellLayout-media',
  medium: 'css-TableCellLayout-medium',
  primary: 'css-TableCellLayout-primary',
  root: 'css-TableCellLayout-root',
  small: 'css-TableCellLayout-small',
  truncate: 'css-TableCellLayout-truncate',
}));

const createState = (): TableCellLayoutState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    truncate: false,
    media: { className: 'caller-media' },
    main: { className: 'caller-main' },
    description: { className: 'caller-description' },
    content: { className: 'caller-content' },
  } as TableCellLayoutState);

describe('useTableCellLayoutStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { size: 'medium', appearance: null, truncate: false },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-medium'],
    },
    {
      props: { size: 'medium', appearance: null, truncate: true },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-medium', 'css-TableCellLayout-truncate'],
    },
    {
      props: { size: 'medium', appearance: 'primary', truncate: false },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-medium', 'css-TableCellLayout-primary'],
    },
    {
      props: { size: 'medium', appearance: 'primary', truncate: true },
      expected: [
        'css-TableCellLayout-root',
        'css-TableCellLayout-medium',
        'css-TableCellLayout-primary',
        'css-TableCellLayout-truncate',
      ],
    },
    {
      props: { size: 'small', appearance: null, truncate: false },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-small'],
    },
    {
      props: { size: 'small', appearance: null, truncate: true },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-small', 'css-TableCellLayout-truncate'],
    },
    {
      props: { size: 'small', appearance: 'primary', truncate: false },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-small', 'css-TableCellLayout-primary'],
    },
    {
      props: { size: 'small', appearance: 'primary', truncate: true },
      expected: [
        'css-TableCellLayout-root',
        'css-TableCellLayout-small',
        'css-TableCellLayout-primary',
        'css-TableCellLayout-truncate',
      ],
    },
    {
      props: { size: 'extra-small', appearance: null, truncate: false },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-extra-small'],
    },
    {
      props: { size: 'extra-small', appearance: null, truncate: true },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-extra-small', 'css-TableCellLayout-truncate'],
    },
    {
      props: { size: 'extra-small', appearance: 'primary', truncate: false },
      expected: ['css-TableCellLayout-root', 'css-TableCellLayout-extra-small', 'css-TableCellLayout-primary'],
    },
    {
      props: { size: 'extra-small', appearance: 'primary', truncate: true },
      expected: [
        'css-TableCellLayout-root',
        'css-TableCellLayout-extra-small',
        'css-TableCellLayout-primary',
        'css-TableCellLayout-truncate',
      ],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as TableCellLayoutState;
    const { result } = renderHook(() => useTableCellLayoutStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-TableCellLayout', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-TableCellLayout-extra-small',
      'css-TableCellLayout-medium',
      'css-TableCellLayout-primary',
      'css-TableCellLayout-root',
      'css-TableCellLayout-small',
      'css-TableCellLayout-truncate',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useTableCellLayoutStyles_unstable(state));
    expect(state.media?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-TableCellLayout__media', 'css-TableCellLayout-media', 'caller-media']),
    );
    expect(state.media?.className?.endsWith('caller-media')).toBe(true);
    expect(state.media?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.main?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-TableCellLayout__main', 'css-TableCellLayout-main', 'caller-main']),
    );
    expect(state.main?.className?.endsWith('caller-main')).toBe(true);
    expect(state.main?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.description?.className?.split(' ')).toEqual(
      expect.arrayContaining([
        'fui-TableCellLayout__description',
        'css-TableCellLayout-description',
        'caller-description',
      ]),
    );
    expect(state.description?.className?.endsWith('caller-description')).toBe(true);
    expect(state.description?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.content?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-TableCellLayout__content', 'css-TableCellLayout-content', 'caller-content']),
    );
    expect(state.content?.className?.endsWith('caller-content')).toBe(true);
    expect(state.content?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.media = undefined;
    state.main = undefined;
    state.description = undefined;
    state.content = undefined;
    expect(() => renderHook(() => useTableCellLayoutStyles_unstable(state))).not.toThrow();
  });
});
