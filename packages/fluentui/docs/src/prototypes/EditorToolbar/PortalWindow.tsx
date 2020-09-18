import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

    // Doc site hack, as we set special fontSize
    externalWindow.current.document.documentElement.style.fontSize = getComputedStyle(
      document.documentElement,
    ).fontSize;
    externalWindow.current.document.documentElement.style.height = '100%';
    externalWindow.current.document.documentElement.style.width = '100%';
    externalWindow.current.document.body.style.height = '100%';
    externalWindow.current.document.body.style.width = '100%';

    externalContainer.current = externalWindow.current.document.createElement('div');
    externalContainer.current.style.height = 'inherit';
    externalContainer.current.style.width = 'inherit';

    externalWindow.current.document.body.appendChild(externalContainer.current);
    if (onClose) externalWindow.current.onbeforeunload = onClose;

    setMounted(true);

    return () => {
      externalWindow.current.close();
    };
  }, [onClose]);

  return mounted && ReactDOM.createPortal(children(externalContainer.current.ownerDocument), externalContainer.current);
};

export default PortalWindow;
