import * as React from 'react';
import { Portal } from '../Portal'; // codesandbox-dependency: @fluentui/react-portal ^9.0.0-beta
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  container: theme => ({
    border: `3px solid ${theme.colorPaletteRedBackground3}`,
    padding: '10px',
  }),

  portalContent: theme => ({
    backgroundColor: theme.colorPaletteYellowBackground3,
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

export const Default = () => {
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
