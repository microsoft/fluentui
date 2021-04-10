import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

/**
 * Calls `mount` from enzyme, calls the callback, and unmounts. This prevents mounted components
 * from sitting around doing unfathomable things in the background while other tests execute.
 *
 * If `attach` is true, the helper will mount the element attached to a child of document.body
 * (and clean up the element at the end). This is primarily for tests involving event handlers,
 * which don't work right unless the element is attached.
 *
 * @param content - JSX content to test.
 * @param callback - Function callback which receives the component to use.
 * @param attach - Whether to attach the element to the document (sometimes needed for event handlers)
 */
export function safeMount<
  TComponent extends React.Component,
  TProps = TComponent['props'],
  TState = TComponent['state']
>(
  content: React.ReactElement<TProps>,
  callback?: (wrapper: ReactWrapper<TProps, TState, TComponent>) => void,
  attach?: boolean,
): void {
  let parent: HTMLElement | undefined;
  if (attach) {
    parent = document.createElement('div');
    document.body.appendChild(parent);
  }

  const wrapper = mount<TComponent, TProps, TState>(content, attach ? { attachTo: parent } : {});

  try {
    callback?.(wrapper);
  } finally {
    if (wrapper.exists()) {
      wrapper.unmount();
    }
    if (parent) {
      document.body.removeChild(parent);
    }
  }
}
