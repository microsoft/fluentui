import { renderHook, act } from '@testing-library/react-hooks';
import { useControllableState } from './useControllableState';

type RenderProps<T> = {
  state: boolean | undefined;
  defaultState?: boolean;
  initialState: boolean;
};

describe('useControllableState', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    /** noop */
  });
  afterEach(jest.resetAllMocks);

  it('respects controlled state', () => {
    const { result, rerender } = renderHook((props: RenderProps<boolean>) => useControllableState({ ...props }), {
      initialProps: { state: true, initialState: false },
    });

    expect(result.current[0]).toBe(true);

    rerender({ state: false, initialState: false });
    expect(result.current[0]).toBe(false);

    // this will cause console.error to be called
    rerender({ defaultState: true, state: false, initialState: false });
    expect(result.current[0]).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    rerender({ state: true, initialState: false });
    expect(result.current[0]).toBe(true);
  });

  it('uses initial state if state and default state are undefined', () => {
    const state = undefined;
    const defaultState = undefined;
    const initialState = true;
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));
    expect(result.current[0]).toBe(initialState);
  });

  it('should call setState() with a value when is controlled', () => {
    const spy = jest.fn();
    const { result } = renderHook(() =>
      useControllableState({ state: 'foo', defaultState: undefined, initialState: '' }),
    );

    const [, setState] = result.current;

    act(() => {
      setState(prevState => {
        spy(prevState);
        return prevState;
      });
    });

    expect(result.current[0]).toEqual('foo');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('foo');
  });

  it.each([
    ['', true],
    ['factory', () => true],
  ])('uses the default state %s if no controlled state is provided', (_, defaultState) => {
    const state = undefined;
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState: false }));
    expect(result.current[0]).toBe(true);
  });

  it('does not change state when the default state changes', () => {
    let defaultState = true;
    const state = undefined;
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
    // both state and defaultState are defined.
    // This will cause console.error to be called
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
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
    // both state and defaultState are defined.
    // This will cause console.error to be called
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
  });

  it('should update state with dispatch', () => {
    const state = undefined;
    const defaultState = 'world';
    const initialState = '';
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));

    act(() => {
      result.current[1]('foo');
    });

    expect(result.current[0]).toEqual('foo');
  });

  it('should use factory dispatch', () => {
    const state = undefined;
    const defaultState = 'foo';
    const initialState = '';
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));

    act(() => {
      result.current[1](prevState => prevState + 'bar');
    });

    expect(result.current[0]).toEqual('foobar');
  });

  it('should ignore dispatch when controlled', () => {
    const state = 'foo';
    const defaultState = 'world';
    const initialState = '';
    const { result } = renderHook(() => useControllableState({ state, defaultState, initialState }));

    act(() => {
      result.current[1]('bar');
    });

    expect(result.current[0]).toEqual('foo');
    // both state and defaultState are defined.
    // This will cause console.error to be called
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('warns when providing both controlled and uncontrolled state', () => {
    renderHook(() => useControllableState({ state: '', defaultState: '', initialState: '' }));

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['a controlled value to be uncontrolled', 'defined to an undefined', 'hello', undefined],
    ['an uncontrolled value to be controlled', 'undefined to a defined', undefined, 'hello'],
  ])('warns when switching from %s', (controlWarning, undefinedWarning, first, second) => {
    let state = first;
    const defaultState = undefined;
    const { rerender } = renderHook(() => useControllableState({ state, defaultState, initialState: '' }));

    state = second;
    rerender();

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});
