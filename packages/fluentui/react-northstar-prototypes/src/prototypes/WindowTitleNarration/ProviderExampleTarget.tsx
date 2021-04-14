// http://localhost:8080/maximize/provider-example-target/false
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Provider, teamsTheme } from '@fluentui/react-northstar';

type PortalWindowProps = {
  children: (externalDocument: Document) => React.ReactElement;
  onClose?: () => void;
  windowLoaded: boolean;
  setWindowLoaded: (state: boolean) => void;
};

const PortalWindow: React.FunctionComponent<PortalWindowProps> = ({ children, onClose, windowLoaded, setWindowLoaded }) => {
  const externalContainer = React.useRef<HTMLDivElement>(null);
  const externalWindow = React.useRef<Window>(null);
  const [mounted, setMounted] = React.useState<boolean>(false);
  
    React.useEffect(() => {
    if (windowLoaded) {
      const btn = externalWindow.current.document.getElementById('start-chat-btn');
      btn.focus();
    // externalWindow.current.alert('Window loaded state changed');
    }
    }, [windowLoaded]);


  React.useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200');

    externalContainer.current = externalWindow.current.document.createElement('div');

    externalWindow.current.document.body.appendChild(externalContainer.current);
    if (onClose) externalWindow.current.onbeforeunload = onClose;
        
        externalWindow.current.onload = () => {
      // const loadingText = externalWindow.current.document.getElementById('loading-text');
            // loadingText.focus();
            // externalWindow.current.alert(loadingText);
        };
    
    externalWindow.current.document.title = 'Loading new chat window';

    setMounted(true);
      setWindowLoaded(false);
    setTimeout(() => {
      externalWindow.current.document.title = 'Chat - Robin Hood';
      setWindowLoaded(true);
    }, 3000);

    return () => {
      externalWindow.current.close();
        setWindowLoaded(false);
    };
  }, [onClose, setWindowLoaded]);

  return mounted && ReactDOM.createPortal(children(externalContainer.current.ownerDocument), externalContainer.current);
};

const ProviderExampleTarget = () => {
  const [open, setOpen] = React.useState(false);
  const [windowLoaded, setWindowLoaded] = React.useState<boolean>(false);
  const handleClose = React.useCallback(() => setOpen(false), []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open window!</Button>
      {open && (
        <PortalWindow
        onClose={handleClose}
        windowLoaded={windowLoaded}
        setWindowLoaded={setWindowLoaded}
        >
          {externalDocument => (
            <Provider theme={teamsTheme} target={externalDocument}>

            {windowLoaded
? (
<>
            <p>Some text before the buttton</p>
              <Button content="Start chat" id="start-chat-btn" />
                          <p>Another text after the buttton</p>
                          </>
                          )
                          : <p id="loading-text" tabIndex={-1} aria-hidden="true">Loading...</p>
                          }
                          
            </Provider>
          )}
        </PortalWindow>
      )}
    </>
  );
};

export default ProviderExampleTarget;
