import * as React from 'react';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

import { Portal } from '@fluentui/react-portal';

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

export const Nested = () => {
  return (
    <Container>
      <Container>
        <Portal>
          <ExamplePortalContent>Outer portal</ExamplePortalContent>
          <Portal>
            <ExamplePortalContent>Inner portal</ExamplePortalContent>
          </Portal>
        </Portal>
      </Container>
    </Container>
  );
};
