import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from '@fluentui/react-button';
import { createDOMRenderer, makeStyles, RendererProvider, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

import { FluentProvider } from '../FluentProvider';

const useExampleStyles = makeStyles({
  button: {
    marginTop: '5px',
  },
  text: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontSize: '20px',
    ...shorthands.border('1px'),
    ...shorthands.borderRadius('5px'),
    ...shorthands.padding('5px'),
  },
});

const useProviderStyles = makeStyles({
  provider: {
    ...shorthands.border('1px'),
    ...shorthands.borderRadius('5px'),
    ...shorthands.padding('5px'),
  },
});

type FrameRendererProps = {
  children: (externalDocument: Document, renderer: ReturnType<typeof createDOMRenderer>) => React.ReactElement;
};

const FrameRenderer: React.FunctionComponent<FrameRendererProps> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);

  const contentDocument = frameRef ? (frameRef.contentDocument as Document) : undefined;
  const renderer = React.useMemo(() => createDOMRenderer(contentDocument), [contentDocument]);

  return (
    <>
      <iframe
        ref={setFrameRef}
        style={{ height: 100, width: 500, border: '3px dashed salmon', padding: 10 }}
        title="An example of Provider in iframe"
      />
      {contentDocument && ReactDOM.createPortal(children(contentDocument, renderer), contentDocument.body)}
    </>
  );
};

const Example: React.FC = props => {
  const styles = useExampleStyles();

  return (
    <>
      <div className={styles.text}>{props.children}</div>
      <Button className={styles.button}>A button</Button>
    </>
  );
};

export const Frame = () => {
  const styles = useProviderStyles();

  return (
    <>
      <FluentProvider className={styles.provider}>
        <Example>Content rendered outside iframe</Example>
      </FluentProvider>

      <FrameRenderer>
        {(externalDocument, renderer) => (
          <RendererProvider renderer={renderer} targetDocument={externalDocument}>
            <FluentProvider className={styles.provider} targetDocument={externalDocument}>
              <Example>
                Content rendered <b>within</b> iframe
              </Example>
            </FluentProvider>
          </RendererProvider>
        )}
      </FrameRenderer>
    </>
  );
};

Frame.parameters = {
  docs: {
    description: {
      story:
        'A Fluent provider does not cross an iframee boundary.' +
        'Renderer provider supports Fluent provider within the iframe.',
    },
  },
};
