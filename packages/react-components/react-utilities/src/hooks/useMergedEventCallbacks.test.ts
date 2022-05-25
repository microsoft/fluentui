import { renderHook } from '@testing-library/react-hooks';
import { useMergedEventCallbacks } from './useMergedEventCallbacks';

describe('useMergedEventCallbacks', () => {
  it('calls each callback in order', () => {
    const calls: [string, string][] = [];

    const { result } = renderHook(() => {
      const callbackA = (arg: string) => calls.push(['callbackA', arg]);
      const callbackB = (arg: string) => calls.push(['callbackB', arg]);

      return useMergedEventCallbacks(callbackA, callbackB);
    });

    const testArgument = 'testArgument';
    result.current(testArgument);

    expect(calls).toEqual([
      ['callbackA', testArgument],
      ['callbackB', testArgument],
    ]);
  });

  it('handles undefined callbacks', () => {
    const calls: [string, string][] = [];

    const { result } = renderHook(() => {
      const callbackA = undefined;
      const callbackB = (arg: string) => calls.push(['callbackB', arg]);

      return useMergedEventCallbacks(callbackA, callbackB);
    });

    const testArgument = 'testArgument';
    result.current(testArgument);

    expect(calls).toEqual([['callbackB', testArgument]]);
  });

  it('allows overriding a callback on an object', () => {
    const calls: [string, string][] = [];

    const state = {
      onEvent: (arg: string) => {
        calls.push(['original callback', arg]);
      },
    };

    const { result } = renderHook(() => {
      state.onEvent = useMergedEventCallbacks(state.onEvent, (arg: string) => {
        calls.push(['additional callback', arg]);
      });

      return state.onEvent;
    });

    const testArgument = 'testArgument';
    result.current(testArgument);

    expect(calls).toEqual([
      ['original callback', testArgument],
      ['additional callback', testArgument],
    ]);
  });
});
