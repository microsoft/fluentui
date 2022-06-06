import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

import { Portal } from '../Portal';

const useStyles = makeStyles({
  container: {
    ...shorthands.border('3px', 'solid', tokens.colorPaletteRedBackground3),
    ...shorthands.padding('10px'),
  },

  portalContent: {
    backgroundColor: tokens.colorPaletteYellowBackground3,
    ...shorthands.border('3px', 'dashed'),
    marginTop: '10px',
  },
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
