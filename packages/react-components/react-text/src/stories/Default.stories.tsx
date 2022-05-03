import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { Text } from '../Text';
import type { TextProps } from '../Text';

const useStyles = makeStyles({
  container: {
    width: '100px',
  },
});

export const Default = (props: TextProps) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Text {...props}>This is an example of the Text component's usage.</Text>
    </div>
  );
};
