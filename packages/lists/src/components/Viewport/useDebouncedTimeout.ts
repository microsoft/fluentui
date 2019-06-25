import { useRef } from 'react';

const NO_PENDING_TIMEOUT_ID = -1;

export function useDebouncedTimeout(callback: () => void, timeoutInMilliseconds: number): [() => void, () => void] {
  const timeoutIdRef = useRef(NO_PENDING_TIMEOUT_ID);

  function clearTimeoutIfNecessary(): void {
    if (timeoutIdRef.current !== NO_PENDING_TIMEOUT_ID) {
      window.clearTimeout(timeoutIdRef.current);
    }
  }

  function scheduleTimeout(): void {
    clearTimeoutIfNecessary();

    timeoutIdRef.current = window.setTimeout(() => {
      callback();

      timeoutIdRef.current = NO_PENDING_TIMEOUT_ID;
    }, timeoutInMilliseconds);
  }

  return [scheduleTimeout, clearTimeoutIfNecessary];
}
