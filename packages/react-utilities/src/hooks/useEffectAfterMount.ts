import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

/**
 * Similar to React.useEffect, only difference is that the callback is not invoked on mount.
 *
 * A common use case is the invocation of external callbacks to ensure controlled component.
 * @example
 *  useEffectAfterMount(() => {
 *    props.onChange?.(value)
 *  }, [value, props.onChange])
 * @param callback effect to be invoked when dependencies change
 * @param dependencies dependency list to determine when the effect should run
 */
export function useEffectAfterMount(callback: EffectCallback, dependencies: DependencyList = []) {
  const justMounted = useRef(true);
  useEffect(() => {
    if (!justMounted.current) {
      return callback();
    }
    justMounted.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
