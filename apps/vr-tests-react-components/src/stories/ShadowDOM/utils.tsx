'use client';

import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import { RendererProvider } from '@griffel/react';
import { PortalMountNodeProvider } from '@fluentui/react-shared-contexts';
import { createProxy, type Root } from 'react-shadow';
import * as React from 'react';
const ShadowRootProvider: React.FC<{
  children: React.ReactNode;
  root: ShadowRoot;
}> = ({ children, root }) => {
  const renderer = React.useMemo(() => createShadowDOMRenderer(root), [root]);

  React.useEffect(() => {
    const targetDocument = root.ownerDocument;
    const targetWindow = targetDocument.defaultView;
    if (!targetWindow) {
      return;
    }

    // Static CSS, unlike Griffel's renderer, must be explicitly installed inside each shadow root.
    const styleElement = targetDocument.createElement('style');
    root.prepend(styleElement);
    const updateStyles = () => {
      styleElement.textContent = Array.from(targetDocument.head.querySelectorAll('style'))
        .map(style => style.textContent ?? '')
        .filter(css => css.includes('@layer fluentui'))
        .join('\n');
    };
    updateStyles();

    const observer = new targetWindow.MutationObserver(updateStyles);
    observer.observe(targetDocument.head, { childList: true, subtree: true, characterData: true });

    return () => {
      observer.disconnect();
      styleElement.remove();
    };
  }, [root]);

  return (
    <RendererProvider renderer={renderer}>
      <PortalMountNodeProvider value={root}>{children}</PortalMountNodeProvider>
    </RendererProvider>
  );
};

const shadowRoot: Root = createProxy({}, '@fluentui/react-components', ({ children, root }) => (
  <ShadowRootProvider root={root}>{children}</ShadowRootProvider>
));

export const ShadowRoot: React.FC<{ children?: React.ReactNode }> = props => (
  <div
    style={{
      border: '3px dotted orange',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <h1 style={{ marginBottom: 0 }}>Shadow DOM</h1>
    <p>Elements in a gray box below are rendered inside a shadow root</p>

    <shadowRoot.div>
      <div style={{ border: '3px dotted grey', padding: 10 }}>{props.children}</div>
    </shadowRoot.div>
  </div>
);
