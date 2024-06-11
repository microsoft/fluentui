import {
  createDOMRenderer,
  makeStyles,
  tokens,
  FluentProvider,
  Portal,
  RendererProvider,
} from '@fluentui/react-components';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const useStyles = makeStyles({
  provider: {
    border: `3px solid ${tokens.colorBrandForeground2}`,
    borderRadius: '5px',
    padding: '5px',

    backgroundColor: tokens.colorBrandBackground2,
    marginBottom: '20px',
  },
  portal: { border: `3x dotted ${tokens.colorPaletteDarkOrangeBorder2}`, padding: '5px' },
});

type FrameRendererProps = {
  children: (externalDocument: Document, renderer: ReturnType<typeof createDOMRenderer>) => React.ReactElement;
};

const FrameRenderer: React.FunctionComponent<FrameRendererProps> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const contentDocument = frameRef ? (frameRef.contentDocument as Document) : undefined;
  const renderer = React.useMemo(() => createDOMRenderer(contentDocument), [contentDocument]);

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
      {contentDocument && container && ReactDOM.createPortal(children(contentDocument, renderer), container)}
    </>
  );
};

const ApplyStylesToPortalsExample: React.FC<{ targetDocument?: Document }> = ({ targetDocument }) => {
  const styles = useStyles();

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

export const ApplyStylesToPortals = () => (
  // FrameRenderer is redundant this example, it's used only to render portals inside an iframe
  // to make them visible in Storybook
  <FrameRenderer>
    {(externalDocument, renderer) => (
      <RendererProvider renderer={renderer} targetDocument={externalDocument}>
        <ApplyStylesToPortalsExample targetDocument={externalDocument} />
      </RendererProvider>
    )}
  </FrameRenderer>
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
