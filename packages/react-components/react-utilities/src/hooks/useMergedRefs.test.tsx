import * as React from 'react';
import { useMergedRefs } from './useMergedRefs';
import { renderHook } from '@testing-library/react-hooks';

describe('useMergedRefs', () => {
  it('always returns the same ref (refs should be immutable)', () => {
    const refFunc = () => null;
    const { result, rerender } = renderHook(() => useMergedRefs(refFunc));
    const firstRefValue = result.current;

    rerender();
    expect(firstRefValue).toBe(result.current);
  });

  it('always mutates the ref when 1 or more merged refs mutate', () => {
    const { result, rerender } = renderHook(() => useMergedRefs<boolean>(() => ({})));
    const firstRefValue = result.current;

    rerender();

    expect(result.current).not.toBe(firstRefValue);
  });

  it('updates all provided refs', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();
    let refValue: boolean | null = null;

    const { result } = renderHook(() => useMergedRefs<boolean>(refObject, val => (refValue = val)));
    result.current(true);

    expect(refObject.current).toBe(true);
    expect(refValue).toBe(true);
  });

  it('updates the current property', () => {
    const { result } = renderHook(() => useMergedRefs(React.useRef<string>(''), React.useRef<string>('')));
    result.current('123');

    expect(result.current.current).toEqual('123');
  });

  it('reuses the same ref callback if refs remain stable', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const refValueFunc = (val: boolean) => {};
    const { result, rerender } = renderHook(() => useMergedRefs<boolean>(refObject, refValueFunc));
    const firstRefCallback = result.current;

    rerender();

    expect(result.current).toEqual(firstRefCallback);
  });

  it('handles changing ref callbacks', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();
    let firstRefValue: boolean | null = null;
    let refValueFunc = (val: boolean) => (firstRefValue = val);
    const { result, rerender } = renderHook(() => useMergedRefs<boolean>(refObject, refValueFunc));
    result.current(true);

    let secondRefValue: boolean | null = null;
    refValueFunc = (val: boolean) => (secondRefValue = val);
    rerender();
    result.current(true);

    expect(firstRefValue).toBe(true);
    expect(secondRefValue).toBe(true);
  });
});
