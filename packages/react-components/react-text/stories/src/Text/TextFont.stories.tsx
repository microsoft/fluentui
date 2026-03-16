import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    gap: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const Font = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text font="base">This is the default font</Text>
      <Text font="numeric">This is numeric font</Text>
      <Text font="monospace">This is monospace font</Text>
    </div>
  );
};
