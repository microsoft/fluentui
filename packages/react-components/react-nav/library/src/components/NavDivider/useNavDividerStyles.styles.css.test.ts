import { renderHook } from '@testing-library/react-hooks';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import type { NavDividerState } from './NavDivider.types';
import { useNavDividerStyles_unstable } from './useNavDividerStyles.styles.css';

jest.mock('./NavDivider.module.css', () => ({ root: 'css-NavDivider-root' }));
jest.mock('@fluentui/react-divider', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useDividerStyles_unstable: jest.fn(),
}));

const createState = (): NavDividerState => ({
  components: { root: 'div', wrapper: 'div' },
  root: { className: 'caller-root' },
  wrapper: { className: 'caller-wrapper' },
  appearance: 'default',
  alignContent: 'center',
  vertical: false,
  inset: false,
});

describe('useNavDividerStyles_unstable (CSS Modules)', () => {
  it('preserves root and wrapper caller classes while composing Divider', () => {
    const state = createState();
    const { result } = renderHook(() => useNavDividerStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root.className).toBe('fui-NavDivider css-NavDivider-root caller-root');
    expect(state.wrapper?.className).toBe('fui-NavDivider__wrapper caller-wrapper');
    expect(useDividerStyles_unstable).toHaveBeenCalledWith(state);
  });
});
