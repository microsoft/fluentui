import { renderHook, act } from '@testing-library/react-hooks';
import type { TabState } from './Tab.types';
import { useTabAnimatedIndicatorStyles_unstable } from './useTabAnimatedIndicator.styles.css';

jest.mock('./TabAnimatedIndicator.module.css', () => ({
  base: 'css-base',
  animated: 'css-animated',
  horizontal: 'css-horizontal',
  vertical: 'css-vertical',
}));

const getRegisteredTabs = jest.fn();
const requestAnimationFrame = jest.fn();
jest.mock('../TabList/TabListContext', () => ({
  ['useTabListContext_unstable']: (selector: (value: unknown) => unknown) => selector({ getRegisteredTabs }),
}));
jest.mock('@fluentui/react-utilities', () => ({
  ...jest.requireActual('@fluentui/react-utilities'),
  useAnimationFrame: () => [requestAnimationFrame],
}));

const createState = (overrides: Partial<TabState> = {}): TabState =>
  ({
    root: { className: 'caller', style: { color: 'inherit' } },
    selected: true,
    disabled: false,
    vertical: false,
    ...overrides,
  } as TabState);

const rect = (x: number, y: number, width: number, height: number) => ({
  ref: { current: { getBoundingClientRect: () => ({ x, y, width, height }) } },
});

describe('useTabAnimatedIndicatorStyles_unstable (CSS Modules)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getRegisteredTabs.mockReturnValue({ registeredTabs: {}, selectedValue: 'current' });
  });

  it.each([false, true])('maps vertical=%s and preserves caller classes and styles', vertical => {
    const state = createState({ vertical });
    const { result } = renderHook(() => useTabAnimatedIndicatorStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root.className).toBe(`css-base css-animated css-${vertical ? 'vertical' : 'horizontal'} caller`);
    expect(state.root.style).toEqual({
      '--fui-Tab__indicator--offset': '0px',
      '--fui-Tab__indicator--scale': '1',
      color: 'inherit',
    });
  });

  it('does not style a disabled tab', () => {
    const state = createState({ disabled: true });
    renderHook(() => useTabAnimatedIndicatorStyles_unstable(state));
    expect(state.root.className).toBe('caller');
    expect(state.root.style).toEqual({ color: 'inherit' });
  });

  it('does not apply indicator classes to an unselected tab', () => {
    const state = createState({ selected: false });
    renderHook(() => useTabAnimatedIndicatorStyles_unstable(state));
    expect(state.root.className).toBe('caller');
  });

  it.each([false, true])('calculates and resets the indicator geometry (vertical=%s)', vertical => {
    getRegisteredTabs.mockReturnValue({
      previousSelectedValue: 'previous',
      selectedValue: 'current',
      registeredTabs: { '"previous"': rect(10, 20, 40, 60), '"current"': rect(30, 50, 20, 30) },
    });
    const { result } = renderHook(() => useTabAnimatedIndicatorStyles_unstable(createState({ vertical })));
    expect(result.current.root.className).not.toContain('css-animated');
    expect(result.current.root.style).toMatchObject({
      '--fui-Tab__indicator--offset': vertical ? '-30px' : '-20px',
      '--fui-Tab__indicator--scale': '2',
    });
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    act(() => requestAnimationFrame.mock.calls[0][0]());
    expect(result.current.root.className).toContain('css-animated');
    expect(result.current.root.style).toMatchObject({
      '--fui-Tab__indicator--offset': '0px',
      '--fui-Tab__indicator--scale': '1',
    });
  });

  it('keeps caller custom properties last', () => {
    const state = createState({
      root: {
        className: 'caller',
        style: { color: 'inherit', '--fui-Tab__indicator--offset': '3px' },
      } as TabState['root'],
    });
    renderHook(() => useTabAnimatedIndicatorStyles_unstable(state));
    expect(state.root.style).toHaveProperty('--fui-Tab__indicator--offset', '3px');
  });
});
