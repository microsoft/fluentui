import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Attachment, Button, Provider, themes } from '@fluentui/react-northstar';

type PortalWindowProps = {
  children: (externalDocument: Document) => React.ReactElement;
  onClose?: () => void;
};

const PortalWindow: React.FunctionComponent<PortalWindowProps> = ({ children, onClose }) => {
  const externalContainer = React.useRef<HTMLDivElement>(null);
  const externalWindow = React.useRef<Window>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200');

    externalContainer.current = externalWindow.current.document.createElement('div');

    externalWindow.current.document.body.appendChild(externalContainer.current);
    if (onClose) externalWindow.current.onbeforeunload = onClose;

    setMounted(true);

    return () => {
      externalWindow.current.close();
    };
  }, []);

  return mounted && ReactDOM.createPortal(children(externalContainer.current.ownerDocument), externalContainer.current);
};

const ProviderExampleTarget = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open window!</Button>
      {open && (
        <PortalWindow onClose={() => setOpen(false)}>
          {externalDocument => (
            <Provider theme={themes.teams} target={externalDocument}>
              <Attachment header="Document.docx" />
            </Provider>
          )}
        </PortalWindow>
      )}
    </>
  );
};

export default ProviderExampleTarget;
