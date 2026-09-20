import * as React from 'react';

import { makeStyles, tokens } from '@fluentui/react-components';
import { Spinner } from '@fluentui/react-modern-components-preview/spinner';

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

export const Appearance = (): React.ReactNode => {
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
