import { act, create as defaultCreate } from 'react-test-renderer';

/**
 * Wrapping `create` from `react-test-renderer' with `act`.
 */
export function create(...args: Parameters<typeof defaultCreate>): ReturnType<typeof defaultCreate> {
  let component: ReturnType<typeof defaultCreate>;
  act(() => {
    component = defaultCreate(...args);
  });

  return component!;
}
