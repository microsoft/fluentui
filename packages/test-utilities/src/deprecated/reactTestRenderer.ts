/* eslint-disable @typescript-eslint/no-deprecated */
import { act, create as defaultCreate } from 'react-test-renderer';

/**
 * Wrapping `create` from `react-test-renderer' with `act`.
 *
 * @deprecated Use `@testing-library/react` directly instead. This function uses `react-test-renderer` which may not work with react >= v19
 */
export function create(...args: Parameters<typeof defaultCreate>): ReturnType<typeof defaultCreate> {
  let component: ReturnType<typeof defaultCreate>;
  act(() => {
    component = defaultCreate(...args);
  });

  return component!;
}
