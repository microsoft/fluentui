import { useRef } from 'react';

const NO_TIMEOUT_PENDING_ID = -1;

/**
 * Hook returning functions for scheduling and clearing a debounced timeout. If the scheduling function is called
 * while another timeout that was created with the same scheduling function is pending, the pending timeout is
 * automatically cancelled.
 * @param callback The function to be called when the timeout has passed.
 * @param timeoutInMilliseconds Time that needs to pass until the callback is executed.
 * @return A tuple containing the functions for scheduling and clearing the timeout.
 */
export function useDebouncedTimeout(callback: () => void, timeoutInMilliseconds: number): [() => void, () => void] {
  const timeoutIdRef = useRef(NO_TIMEOUT_PENDING_ID);

  function clearTimeoutIfNecessary(): void {
    if (timeoutIdRef.current !== NO_TIMEOUT_PENDING_ID) {
      window.clearTimeout(timeoutIdRef.current);
    }
  }

  function scheduleTimeout(): void {
    clearTimeoutIfNecessary();

    timeoutIdRef.current = window.setTimeout(() => {
      callback();

      timeoutIdRef.current = NO_TIMEOUT_PENDING_ID;
    }, timeoutInMilliseconds);
  }

  return [scheduleTimeout, clearTimeoutIfNecessary];
}
