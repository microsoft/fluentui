import { Attachment, Button, Provider, teamsTheme } from '@fluentui/react-northstar';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

type PortalFrameProps = {
  children: (externalDocument: Document) => React.ReactElement;
};

const PortalFrame: React.FunctionComponent<PortalFrameProps> = ({ children }) => {
  const frameRef = React.useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <iframe
        ref={frameRef}
        style={{ height: 300, width: 600, border: 0, padding: 20 }}
        title="An example of nested Provider in iframe"
      />
      {mounted &&
        ReactDOM.createPortal(children(frameRef.current.contentDocument), frameRef.current.contentDocument.body)}
    </>
  );
};

const ProviderExampleTargetFrame = () => (
  <PortalFrame>
    {externalDocument => (
      <Provider theme={teamsTheme} target={externalDocument}>
        <Attachment actionable header="Document.docx" />
        <Button content="Hello world!" />
      </Provider>
    )}
  </PortalFrame>
);

export default ProviderExampleTargetFrame;
