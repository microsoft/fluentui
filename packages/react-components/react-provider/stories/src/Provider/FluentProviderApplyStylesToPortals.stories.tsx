import { FluentProvider, Portal } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import * as ReactDOM from 'react-dom';

import styles from './FluentProviderApplyStylesToPortals.module.css';

// S-F batch 6: the legacy runtime-styling renderer plumbing was removed from this story
// (renderer-free rewrite per D21). Component styles are now static stylesheets and do not
// cross document boundaries — iframe style injection is an accepted, deferred loss (D11);
// this story is known-changed: `applyStylesToPortals` behavior (provider classes + theme on
// portal nodes) is unchanged, but statically-built story classes only style the outer document.
type FrameRendererProps = {
  children: (externalDocument: Document) => React.ReactElement;
};

const FrameRenderer: React.FunctionComponent<FrameRendererProps> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const contentDocument = frameRef ? (frameRef.contentDocument as Document) : undefined;

  React.useEffect(() => {
    if (contentDocument) {
      const el = contentDocument.createElement('div');
      contentDocument.body.appendChild(el);

      setContainer(el);
    }
  }, [contentDocument]);

  return (
    <>
      <iframe ref={setFrameRef} style={{ height: 300, width: 700, border: 'none' }} />
      {contentDocument && container && ReactDOM.createPortal(children(contentDocument), container)}
    </>
  );
};

const ApplyStylesToPortalsExample: React.FC<{ targetDocument?: Document }> = ({ targetDocument }) => {
  return (
    <>
      <FluentProvider className={styles.provider} targetDocument={targetDocument}>
        <div>An element inside a provider</div>
        <Portal>
          <div className={styles.portal}>
            A portal created by FluentProvider with <code>applyStylesToPortals={`{true}`}</code>. Styles from
            FluentProvider are applied
          </div>
        </Portal>
      </FluentProvider>

      <FluentProvider className={styles.provider} applyStylesToPortals={false} targetDocument={targetDocument}>
        <div>An element inside a provider</div>
        <Portal>
          <div className={styles.portal}>
            A portal created by FluentProvider with <code>applyStylesToPortals={`{false}`}</code>. Styles from
            FluentProvider are not applied
          </div>
        </Portal>
      </FluentProvider>
    </>
  );
};

export const ApplyStylesToPortals = (): JSXElement => (
  // FrameRenderer is redundant this example, it's used only to render portals inside an iframe
  // to make them visible in Storybook
  <FrameRenderer>{externalDocument => <ApplyStylesToPortalsExample targetDocument={externalDocument} />}</FrameRenderer>
);

ApplyStylesToPortals.parameters = {
  docs: {
    description: {
      story: [
        '`applyStylesToPortals` controls if styles from FluentProvider should be applied to components that use ',
        'Portal component.',
      ].join(''),
    },
  },
};
