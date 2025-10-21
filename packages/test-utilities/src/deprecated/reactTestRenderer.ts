/* eslint-disable @typescript-eslint/no-deprecated */
import { act, create as defaultCreate } from 'react-test-renderer';
import { assertReactVersion } from './assertReactVersion';

/**
 * Wrapping `create` from `react-test-renderer' with `act`.
 *
 * @deprecated Use `@testing-library/react` directly instead. This function uses `react-test-renderer` which doesn't work with react >= v19
 */
export function create(...args: Parameters<typeof defaultCreate>): ReturnType<typeof defaultCreate> {
  assertReactVersion(19);
  let component: ReturnType<typeof defaultCreate>;
  act(() => {
    component = defaultCreate(...args);
  });

  return component!;
}
