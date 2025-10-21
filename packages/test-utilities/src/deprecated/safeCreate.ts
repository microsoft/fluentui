import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { assertReactVersion } from './assertReactVersion';

/**
 * Calls renderer.create from react-test-renderer, then calls the callback,
 * then unmounts. This prevents mounted components from sitting around doing
 * unfathomable things in the background while other tests start executing.
 *
 * @deprecated Use `@testing-library/react` directly instead. This function uses `react-test-renderer` which doesn't work with react >= v19
 *
 * @param content - JSX content to test.
 * @param callback - Function callback which receives the component to use.
 */
export function safeCreate<TProps>(
  content: React.ReactElement<TProps>,
  callback: (wrapper: renderer.ReactTestRenderer) => void,
  options?: renderer.TestRendererOptions,
): void {
  assertReactVersion(19);
  let wrapper: renderer.ReactTestRenderer;
  /* eslint-disable @typescript-eslint/no-deprecated */
  renderer.act(() => {
    wrapper = renderer.create(content, options);
  });
  /* eslint-enable @typescript-eslint/no-deprecated */

  try {
    callback(wrapper!);
  } finally {
    wrapper!.unmount();
  }
}
