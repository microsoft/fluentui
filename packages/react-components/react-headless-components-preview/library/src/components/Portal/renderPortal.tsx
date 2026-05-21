import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { JSXElement } from '@fluentui/react-utilities';

import type { PortalState } from './Portal.types';

/**
 * Render the final JSX of Portal.
 *
 * Renders a stable `<span hidden>` anchor at the original tree location and,
 * when a `mountNode` is available, portals `children` into it.
 *
 * SSR safety: on the server `mountNode` is `undefined`, so only the anchor
 * is rendered. On hydration the anchor still renders identically (the portal
 * content lives at a different DOM location, which React doesn't compare),
 * so no hydration mismatch is possible.
 */
export const renderPortal = (state: PortalState): JSXElement => {
  return (
    <span hidden ref={state.anchorRef}>
      {state.mountNode && ReactDOM.createPortal(state.children, state.mountNode)}
    </span>
  );
};
