import * as React from 'react';
import { Portal, PortalProvider } from '@fluentui/react-portal';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  container: theme => ({
    border: `3px solid ${theme.alias.color.red.background3}`,
    padding: '10px',
  }),

  portalContent: theme => ({
    backgroundColor: theme.alias.color.yellow.background3,
    border: '3px dashed',
    marginTop: '10px',
  }),
});

const Container: React.FC = ({ children }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      Portal nested within
      {children}
    </div>
  );
};

const ExamplePortalContent: React.FC = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.portalContent}>{children}</div>;
};

export const WithPortalProvider = () => {
  return (
    <Container>
      <Container>
        <PortalProvider>
          <Portal>
            <ExamplePortalContent>Portal content</ExamplePortalContent>
          </Portal>
          <Portal>
            <ExamplePortalContent>Portal content</ExamplePortalContent>
          </Portal>
        </PortalProvider>
      </Container>
    </Container>
  );
};

export const WithoutPortalProvider = () => {
  return (
    <Container>
      <Container>
        <Portal>
          <ExamplePortalContent>Portal content</ExamplePortalContent>
        </Portal>
        <Portal>
          <ExamplePortalContent>Portal content</ExamplePortalContent>
        </Portal>
      </Container>
    </Container>
  );
};

export const LifecycleMethods = () => {
  const [mounted, setMounted] = React.useState(true);
  const [text, setText] = React.useState('');

  const onMount = () => setText('mounted');
  const onUnmount = () => setText('unmounted');

  return (
    <Container>
      <Container>
        <div>
          Portal is currently: <strong>{text}</strong>
        </div>
        <button onClick={() => setMounted(s => !s)}>Toggle portal mount</button>
        {mounted && (
          <Portal onUnmount={onUnmount} onMount={onMount}>
            <ExamplePortalContent>Portal content</ExamplePortalContent>
          </Portal>
        )}
      </Container>
    </Container>
  );
};
