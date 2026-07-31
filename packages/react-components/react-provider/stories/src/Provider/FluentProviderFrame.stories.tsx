import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import * as ReactDOM from 'react-dom';
import { Button, FluentProvider } from '@fluentui/react-components';

import styles from './FluentProviderFrame.module.css';

// S-F batch 6: the legacy runtime-styling renderer plumbing was removed from this story
// (renderer-free rewrite per D21). Component styles are now static stylesheets and do not
// cross document boundaries — iframe style injection is an accepted, deferred loss (D11);
// this story is known-changed: theme tokens still reach the iframe via FluentProvider's
// `targetDocument`, but statically-built classes only style the outer document.
type FrameRendererProps = {
  children: (externalDocument: Document) => React.ReactElement;
};

const FrameRenderer: React.FunctionComponent<FrameRendererProps> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);

  const contentDocument = frameRef ? (frameRef.contentDocument as Document) : undefined;

  return (
    <>
      <iframe
        ref={setFrameRef}
        style={{ height: 100, width: 500, border: '3px dashed salmon', padding: 10 }}
        title="An example of Provider in iframe"
      />
      {contentDocument && ReactDOM.createPortal(children(contentDocument), contentDocument.body)}
    </>
  );
};

const Example: React.FC<{ children?: React.ReactNode }> = props => {
  return (
    <>
      <div className={styles.text}>{props.children}</div>
      <Button className={styles.button}>A button</Button>
    </>
  );
};

export const Frame = (): JSXElement => {
  return (
    <>
      <FluentProvider className={styles.provider}>
        <Example>Content rendered outside iframe</Example>
      </FluentProvider>

      <FrameRenderer>
        {externalDocument => (
          <FluentProvider className={styles.provider} targetDocument={externalDocument}>
            <Example>
              Content rendered <b>within</b> iframe
            </Example>
          </FluentProvider>
        )}
      </FrameRenderer>
    </>
  );
};

Frame.parameters = {
  docs: {
    description: {
      story: [
        'A FluentProvider does not cross an iframe boundary.',
        'To render into iframes pass a proper `Document` instance to the `targetDocument` prop on',
        'FluentProvider.',
      ].join(' '),
    },
  },
};
