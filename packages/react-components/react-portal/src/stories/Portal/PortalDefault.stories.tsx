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

export const Default = () => {
  const styles = useStyles();
  const [rootElement, setRootElement] = React.useState<HTMLElement | null>(null);
  return (
    <div ref={setRootElement}>
      <div style={{ overflow: 'hidden' }} className={styles.container}>
        Overflow hidden parent
        <Portal mountNode={rootElement}>
          <div className={styles.portalContent}>Portal content</div>
          <Portal mountNode={rootElement}>
            <div className={styles.portalContent}>Portal within a Portal content</div>
          </Portal>
        </Portal>
      </div>
    </div>
  );
};
