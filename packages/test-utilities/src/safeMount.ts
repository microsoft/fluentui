import * as React from 'react';
import { mount, MountRendererProps, ReactWrapper } from 'enzyme';

/**
 * Calls `mount` from enzyme, calls the callback, and unmounts. This prevents mounted components
 * from sitting around doing unfathomable things in the background while other tests execute.
 *
 * @param content - JSX content to test.
 * @param callback - Function callback which receives the component to use.
 * @param mountOptions - Options for enzyme mount function. If `attachTo` is provided, the element
 * will be removed during the cleanup.
 */
export function safeMount<
  TComponent extends React.Component,
  TProps = TComponent['props'],
  TState = TComponent['state']
>(
  content: React.ReactElement<TProps>,
  callback?: (wrapper: ReactWrapper<TProps, TState, TComponent>) => void,
  mountOptions?: MountRendererProps,
): void {
  const wrapper = mount<TComponent, TProps, TState>(content, mountOptions);

  try {
    callback?.(wrapper);
  } finally {
    if (wrapper.exists()) {
      wrapper.unmount();
    }
    if (mountOptions?.attachTo) {
      mountOptions.attachTo.remove();
    }
  }
}
