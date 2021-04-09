// http://localhost:8080/maximize/provider-example-target/false
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Provider, teamsTheme } from '@fluentui/react-northstar';

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
    externalWindow.current.document.title = 'New chat window';

    setMounted(true);
    setTimeout(() => {
      externalWindow.current.document.title = 'Chat - Robin Hood';
      const btn = externalWindow.current.document.getElementById('start-chat-btn');
      btn.focus()
            // externalWindow.current.alert(btn);;
    }, 3000);

    return () => {
      externalWindow.current.close();
    };
  }, [onClose]);

  return mounted && ReactDOM.createPortal(children(externalContainer.current.ownerDocument), externalContainer.current);
};

const ProviderExampleTarget = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = React.useCallback(() => setOpen(false), []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open window!</Button>
      {open && (
        <PortalWindow onClose={handleClose}>
          {externalDocument => (
            <Provider theme={teamsTheme} target={externalDocument}>
            <p>Some text before the buttton</p>
              <Button content="Start chat" id="start-chat-btn" />
                          <p>Another text after the buttton</p>
            </Provider>
          )}
        </PortalWindow>
      )}
    </>
  );
};

export default ProviderExampleTarget;
