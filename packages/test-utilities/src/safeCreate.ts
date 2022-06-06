import * as React from 'react';
import * as renderer from 'react-test-renderer';

/**
 * Calls renderer.create from react-test-renderer, then calls the callback,
 * then unmounts. This prevents mounted components from sitting around doing
 * unfathomable things in the background while other tests start executing.
 *
 * @param content - JSX content to test.
 * @param callback - Function callback which receives the component to use.
 */
export function safeCreate<TProps>(
  content: React.ReactElement<TProps>,
  callback: (wrapper: renderer.ReactTestRenderer) => void,
  options?: renderer.TestRendererOptions,
): void {
  let wrapper: renderer.ReactTestRenderer;
  renderer.act(() => {
    wrapper = renderer.create(content, options);
  });

  try {
    callback(wrapper!);
  } finally {
    wrapper!.unmount();
  }
}
