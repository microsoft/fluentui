import { renderHook, act } from '@testing-library/react-hooks';
import { useControllableState } from './useControllableState';

type RenderProps<T> = {
  state: boolean | undefined;
  defaultState?: boolean;
  initialState: boolean;
};

describe('useControllableState', () => {
  afterEach(jest.resetAllMocks);

  it('respects controlled state', () => {
    const { result, rerender } = renderHook((props: RenderProps<boolean>) => useControllableState({ ...props }), {
      initialProps: { state: true, initialState: false },
    });

    expect(result.current[0]).toBe(true);

    rerender({ state: false, initialState: false });
    expect(result.current[0]).toBe(false);

    rerender({ defaultState: true, state: false, initialState: false });
    expect(result.current[0]).toBe(false);

    rerender({ state: true, initialState: false });
    expect(result.current[0]).toBe(true);
  });

  it('uses initial state if state and default state are undefined', () => {
    const state = undefined as boolean | undefined;
    const defaultState = undefined as boolean | undefined;
    const initialState = true;
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));
    expect(result.current[0]).toBe(initialState);
  });

  it.each([
    ['', true],
    ['factory', () => true],
  ])('uses the default state %s if no controlled state is provided', (_, defaultState) => {
    const state = undefined as boolean | undefined;
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState: false }));
    expect(result.current[0]).toBe(true);
  });

  it('does not change state when the default state changes', () => {
    let defaultState = true;
    const state = undefined as boolean | undefined;
    const { result, rerender } = renderHook(() => useControllableState({ state, defaultState, initialState: false }));

    defaultState = false;
    rerender();

    expect(result.current[0]).toBe(true);
  });

  it('returns the same referential setter callback', () => {
    const state = 'hello';
    const defaultState = 'world';
    const initialState = '';
    const { result, rerender } = renderHook(() => useControllableState({ state, defaultState, initialState }));
    const firstResult = result.current;

    rerender();

    expect(result.current[1]).toBe(firstResult[1]);
  });

  it('returns the same setter callback even if param states change', () => {
    let state = 'hello';
    let defaultState = 'world';
    const initialState = '';
    const { result, rerender } = renderHook(() => useControllableState({ state, defaultState, initialState }));
    const firstResult = result.current;

    state = 'foo';
    defaultState = 'bar';
    rerender();

    expect(result.current[1]).toBe(firstResult[1]);
  });

  it('should update state with dispatch', () => {
    const state = undefined as string | undefined;
    const defaultState = 'world';
    const initialState = '';
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));

    act(() => {
      result.current[1]('foo');
    });

    expect(result.current[0]).toEqual('foo');
  });

  it('should use factory dispatch', () => {
    const state = undefined as string | undefined;
    const defaultState = 'foo';
    const initialState = '';
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));

    act(() => {
      result.current[1](prevState => prevState + 'bar');
    });

    expect(result.current[0]).toEqual('foobar');
  });

  it('should ignore dispatch when controlled', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const state = 'foo';
    const defaultState = 'world';
    const initialState = '';
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));

    act(() => {
      result.current[1]('bar');
    });

    expect(result.current[0]).toEqual('foo');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it.each([
    ['a controlled value to be uncontrolled', 'defined to an undefined', 'hello', undefined],
    ['an uncontrolled value to be controlled', 'undefined to a defined', undefined, 'hello'],
  ])('warns when switching from %s', (controlWarning, undefinedWarning, first, second) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    let state: string | undefined = first;
    const defaultState = undefined as string | undefined;
    const { rerender } = renderHook(() => useControllableState({ state, defaultState, initialState: '' }));

    state = second;
    rerender();

    expect(spy).toHaveBeenCalledTimes(1);
    const expectedWarning = `A component is changing ${controlWarning}. This is likely caused by the value changing from ${undefinedWarning} value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components`;
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(expectedWarning));
  });
});
