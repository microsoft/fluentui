import * as React from 'react';
import { makeStyles, Spinner, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    '> div': { padding: '20px' },
  },

  // Inverted Spinners are meant as overlays (e.g., over an image or similar)
  // so give it a solid, dark background so it is visible in all themes.
  invertedWrapper: {
    backgroundColor: tokens.colorBrandBackgroundStatic,
  },
});

export const Appearance = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner appearance="primary" label="Primary Spinner" />

      <div className={styles.invertedWrapper}>
        <Spinner appearance="inverted" label="Inverted Spinner" />
      </div>
    </div>
  );
};
