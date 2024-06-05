import * as React from 'react';
import { makeStyles, tokens, Portal } from '@fluentui/react-components';

const useStyles = makeStyles({
  content: {
    backgroundColor: tokens.colorPaletteYellowBackground3,
    border: '3px dashed',
    padding: '5px',
  },
  container: {
    border: '3px dashed',
    padding: '5px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);

  return (
    <>
      <div className={styles.container} style={{ overflow: 'hidden' }}>
        Clipping parent container
        <Portal mountNode={rootElement}>
          <div className={styles.content}>Portal content</div>
        </Portal>
      </div>

      <div ref={setRootElement} />
    </>
  );
};
