/* eslint-disable @fluentui/max-len */

import * as React from 'react';
// @ts-expect-error - we don't have types for enzyme in repo on purpose
import { mount, ReactWrapper } from 'enzyme';

import { createTestContainer } from '../createTestContainer';

/**
 * Calls `mount` from enzyme, calls the callback, and unmounts. This prevents mounted components
 * from sitting around doing unfathomable things in the background while other tests execute.
 *
 * @deprecated Use `@testing-library/react` directly instead. This function uses `enzyme` which doesn't work with react > v17
 *
 * @param content - JSX content to test.
 * @param callback - Function callback which receives the component to use.
 * @param attach - Whether to use a container element which is attached to the document (sometimes needed for event handlers)
 */
export function safeMount<
  TComponent extends React.Component,
  TProps = TComponent['props'],
  TState = TComponent['state'],
>(
  content: React.ReactElement<TProps>,
  callback?: (wrapper: ReactWrapper<TProps, TState, TComponent>) => void,
  attach?: boolean,
): void {
  const testContainer = attach ? createTestContainer() : undefined;
  const wrapper = mount<TComponent, TProps, TState>(content, {
    ...(testContainer && { attachTo: testContainer }),
  }) as IReactWrapperInline;

  try {
    callback?.(wrapper);
  } finally {
    if (wrapper.exists()) {
      wrapper.unmount();
    }
    testContainer?.remove();
  }
}

interface IReactWrapperInline {
  exists(): boolean;
  unmount(): this;
}
