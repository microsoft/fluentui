import { act, TestRendererOptions, ReactTestRenderer, create as defaultCreate } from 'react-test-renderer';
import { ReactElement } from 'react';

/**
 * Wrapping `create` from `react-test-renderer' with `act`.
 */
export function create(nextElement: ReactElement, options?: TestRendererOptions): ReactTestRenderer {
  let component: ReactTestRenderer;
  act(() => {
    component = defaultCreate(nextElement, options);
  });

  return component!;
}
