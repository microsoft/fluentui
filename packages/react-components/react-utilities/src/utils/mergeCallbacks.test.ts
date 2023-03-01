import { mergeCallbacks } from './mergeCallbacks';

describe('mergeCallbacks', () => {
  it('calls each callback in order', () => {
    const calls: [string, string][] = [];

    const callbackA = (arg: string) => calls.push(['callbackA', arg]);
    const callbackB = (arg: string) => calls.push(['callbackB', arg]);

    const result = mergeCallbacks(callbackA, callbackB);

    const testArgument = 'testArgument';
    result(testArgument);

    expect(calls).toEqual([
      ['callbackA', testArgument],
      ['callbackB', testArgument],
    ]);
  });

  it('handles undefined callbacks', () => {
    const calls: [string, string][] = [];

    const callbackA = undefined;
    const callbackB = (arg: string) => calls.push(['callbackB', arg]);

    const result = mergeCallbacks(callbackA, callbackB);

    const testArgument = 'testArgument';
    result(testArgument);

    expect(calls).toEqual([['callbackB', testArgument]]);
  });

  it('allows overriding a callback on an object', () => {
    const calls: [string, string][] = [];

    const state = {
      onEvent: (arg: string) => {
        calls.push(['original callback', arg]);
      },
    };

    state.onEvent = mergeCallbacks(state.onEvent, (arg: string) => {
      calls.push(['additional callback', arg]);
    });

    const testArgument = 'testArgument';
    state.onEvent(testArgument);

    expect(calls).toEqual([
      ['original callback', testArgument],
      ['additional callback', testArgument],
    ]);
  });
});
