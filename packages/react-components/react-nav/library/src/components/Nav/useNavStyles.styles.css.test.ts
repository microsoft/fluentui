import { renderHook } from '@testing-library/react-hooks';
import type { NavState } from './Nav.types';
import { useNavStyles_unstable } from './useNavStyles.styles.css';

jest.mock('./Nav.module.css', () => ({ root: 'css-Nav-root' }));

const createState = (): NavState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'div' },
    density: 'medium',
    onRegister: jest.fn(),
    onUnregister: jest.fn(),
    onSelect: jest.fn(),
    getRegisteredNavItems: () => ({ registeredNavItems: {} }),
    onRequestNavCategoryItemToggle: jest.fn(),
    openCategories: [],
    multiple: true,
    tabbable: false,
  } as NavState);

describe('useNavStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-Nav-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as NavState;
      const { result } = renderHook(() => useNavStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-Nav', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-Nav-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
    },
  );
});
